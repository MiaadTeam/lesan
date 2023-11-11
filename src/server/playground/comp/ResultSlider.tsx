/** @jsx h */
import { StateUpdater, h, useState } from "../reactDeps.ts";
import { TResults } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { Pagination } from "./Pagination.tsx";
import InfoIcon2 from "./icon/InfoIcon2.tsx";
import SortFromTopToBottomIcon from "./icon/SortFromTopToBottomIcon.tsx";

export const ResultSlider = ({
  results,
  setIsShowE2eResponse,
  index,
}: {
  results: TResults[];
  setIsShowE2eResponse: StateUpdater<boolean>;
  index: number;
}) => {
  const [activePage, setActivePage] = useState(0);

  // const [show, setShow] = useState(0);

  // const s: any = [];
  // results.map((e, i) => {
  //   s.push(i);
  // });

  // pure pagination!
  // let e: [] = [];
  // if (s.length > 6) {
  //   e = s.slice(
  //     show === 2 ? show + 2 : show === 3 ? show + 2 : show,

  //     show === 2
  //       ? show + 4
  //       : show < s.length - 3
  //       ? show + 2
  //       : show === s.length - 3
  //       ? show + 1
  //       : show
  //   );
  // } else {
  //   e = s;
  // }

  {
    /* <div>
            <span onClick={() => setShow(0)}>{show === 0 ? show + 1 : 1}</span>
            <span onClick={() => setShow(1)}>{show === 1 ? show + 1 : 2}</span>
            <span onClick={() => setShow(2)}>{show === 2 ? show + 1 : 3}</span>
          </div>

          {show >= 2 && show <= results.length - 3 ? (
            <Fragment>
              <span>...</span>{" "}
              {e.map((e: any) => (
                <span
                  onClick={() => {
                    setShow(e - 1);
                    console.log(e);
                  }}
                >
                  {e}
                </span>
              ))}
              {!(show === s.length - 3) && <span>...</span>}
            </Fragment>
          ) : (
            <span>...</span>
          )}
          <div>
            <span onClick={() => setShow(results.length - 3)}>
              {results.length - 2}
            </span>
            <span onClick={() => setShow(results.length - 2)}>
              {results.length - 1}
            </span>
            <span onClick={() => setShow(results.length - 1)}>
              {results.length}
            </span>
          </div> */
  }

  // end pure pagination

  return (
    <div className="result-slider-container">
      <div className="result-slider-wrapper" id={results[activePage].id}>
        <section className="container-re">
          <div className="container-re--header">
            <span
              className="container-re--header--icon"
              onClick={() => setIsShowE2eResponse(true)}
            >
              <InfoIcon2 />
            </span>
            <div className="container--re--header--icon-number">
              {" "}
              <SortFromTopToBottomIcon />
              <span>{index + 1}</span>
            </div>
            <span className="container-re-title">REQUEST</span>
          </div>
          <JSONViewer jsonData={results[activePage].request} />
        </section>
        <section className="container-re container-response">
          <div className="container-re--header">
            <span className="container-re-title">RESPONSE</span>
            <span className="e2e-re-timeNumber-request">
              {results[activePage].responseTime}ms
            </span>
          </div>
          <JSONViewer jsonData={results[activePage].response} />
        </section>
      </div>
      <div className="pagination-container">
        {" "}
        <Pagination
          pageCountNumber={results.length}
          activePage={activePage}
          setActivePage={setActivePage}
        />{" "}
        <div className="pagination-u1024">
          {" "}
          {results.map((_re, index) => (
            <span
              className="pagination-u1024--item"
              onClick={() => setActivePage(index)}
              data-show={activePage === index}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
