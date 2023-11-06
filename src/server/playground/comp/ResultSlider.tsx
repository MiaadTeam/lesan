/** @jsx h */
import { Fragment, StateUpdater, h, useState } from "../reactDeps.ts";
import { TResults } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { Pagination } from "./Pagination.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";

export const ResultSlider = ({
  results,
  setIsShowE2eResponse,
}: {
  results: TResults[];
  setIsShowE2eResponse: StateUpdater<boolean>;
}) => {
  const [activePage, setActivePage] = useState(0);

  const [show, setShow] = useState(0);
  for (let index = 0; index <= results.length; index++) {}

  const s: any = [];
  results.map((e, i) => {
    s.push(i);
  });

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

  // pagination fo under 1024px
  {
    /* <div>
          {" "}
          {results.map((_re, index) => (
            <span
              className="pagination--item"
              style={{ cursor: "pointer", flex: "1" }}
              onClick={() => setShow(index)}
              data-show={show === index}
            >
              {index + 1}
            </span>
          ))}
        </div> */
  }

  return (
    <div className="result-slider-container">
      <div className="result-slider-wrapper" id={results[activePage].id}>
        <section className="container-re">
          <div className="container-re--header">
            <span
              className="container-re--header--icon"
              onClick={() => setIsShowE2eResponse(true)}
            >
              <InfoIcon />
            </span>
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
          {/* <span>{`${activePage + 1} / ${results.length}`}</span> */}
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
      </div>
    </div>
  );
};
