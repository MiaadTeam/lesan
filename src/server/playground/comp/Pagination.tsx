/** @jsx h */
import {
  h,
  useState,
  useCallback,
  useEffect,
  StateUpdater,
} from "../reactDeps.ts";
import ChevronLeftDouble from "./icon/ChevronLeftDouble.tsx";
import ChevronLeftIcon from "./icon/ChevronLeftIcon.tsx";
import ChevronRightDouble from "./icon/ChevronRightDouble.tsx";
import ChevronRightIcon from "./icon/ChevronRightIcon.tsx";

export function Pagination({
  pageCountNumber,
  activePage,
  setActivePage,
}: {
  activePage: number;
  pageCountNumber: number;
  setActivePage: StateUpdater<number>;
}) {
  const [pages, setPages] = useState<number[]>([]);
  const [goTo, setGoTo] = useState(1);

  const handleChange = (event: any) => {
    setGoTo(event.target.value);
    setActivePage(event.target.value - 1);
  };
  const handleClick = () => {
    setActivePage(goTo - 1);
  };
  const pageCount = pageCountNumber;
  const buildPages = useCallback(() => {
    let start = 0,
      end = pageCount > 5 ? 5 : pageCount;

    if (activePage > 3 && activePage < pageCount - 3) {
      start = activePage - 1;
      end = activePage - 1 + 3;
    }

    if (pageCount > 5 && activePage > pageCount - 5) {
      start = pageCount - 5;
      end = pageCount - 1;
    }

    if (pageCount <= 5) {
      start = 0;
      end = pageCount;
    }

    const newPages = [];

    for (let i = start; i < end; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [activePage]);

  const onChange = (page: any) => setActivePage(page);

  const isActive = (page: any) => (activePage === page ? "active" : "");

  useEffect(() => buildPages(), [activePage]);

  return (
    <div className="pagination">
      {pageCount > 1 && (
        <button
          onClick={() => {
            setActivePage(0);
          }}
        >
          {" "}
          <ChevronLeftDouble />
        </button>
      )}
      {pageCount > 1 && (
        <button
          onClick={() => {
            setActivePage(activePage === 0 ? pageCount - 1 : activePage - 1);
          }}
        >
          <ChevronLeftIcon />
        </button>
      )}
      {(activePage >= 4 || activePage > pageCount - 5) && pageCount > 5 && (
        <button onClick={() => onChange(0)}>{1}</button>
      )}
      {(activePage >= 4 || activePage > pageCount - 5) && pageCount > 5 && (
        <span>...</span>
      )}
      {pages.map((page: any) => (
        <button
          key={page}
          className={isActive(page)}
          onClick={() => onChange(page)}
        >
          {page + 1}
        </button>
      ))}
      {activePage < pageCount - 4 && pageCount > 5 && <span>...</span>}
      {pageCount > 5 && (
        <button
          className={isActive(pageCount - 1)}
          onClick={() => onChange(pageCount - 1)}
        >
          {pageCount}
        </button>
      )}

      {pageCount > 1 && (
        <button
          onClick={() =>
            setActivePage(activePage === pageCount - 1 ? 0 : activePage + 1)
          }
        >
          <ChevronRightIcon />
        </button>
      )}
      {pageCount > 1 && (
        <button
          onClick={() => {
            setActivePage(pageCount - 1);
          }}
        >
          {" "}
          <ChevronRightDouble />{" "}
        </button>
      )}
      {pageCount > 1 && (
        <div className="pagination--go-to">
          {" "}
          <input
            className="pagination--go-to--input"
            min={1}
            max={pageCount}
            for="1"
            type="number"
            onChange={handleChange}
            placeholder="number"
            value={activePage + 1}
          />
          <button
            className="pagination--go-to--button"
            id="1"
            onClick={() => {
              handleClick();
            }}
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}
