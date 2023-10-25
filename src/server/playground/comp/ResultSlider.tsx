/** @jsx h */
import { StateUpdater, h, useState } from "../reactDeps.ts";
import { TResults } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";

export const ResultSlider = ({
  results,
  setIsShowE2eResponse,
}: {
  results: TResults[];
  setIsShowE2eResponse: StateUpdater<boolean>;
}) => {
  const [show, setShow] = useState(0);
  // const slice = () => {
  // const showSlice = results.slice(show, show + 5);
  //  showSlice.map((result, index,arr) => {
  // const showslice = arr.slice(show,show + 5)
  // <span onClick={() => setShow(show)}>{index + 1}</span>
  // })
  // };
  return (
    <div
      style={{ display: "flex", minWidth: "100%", position: "relative" }}
      id={results[show].id}
    >
      {/* <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            setShow(show === results.length - 1 ? 0 : show + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setShow(show === 0 ? results.length - 1 : show - 1);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            setShow(0);
          }}
        >
          first
        </button>
        <button
          onClick={() => {
            setShow(results.length - 1);
          }}
        >
          last
        </button>
      </div> */}
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
        <JSONViewer jsonData={results[show].request} />
        <div
          className="pagination"
          style={{
            position: "absolute",
            bottom: "0px",
            right: "-87.5px",
            zIndex: "1",
            backgroundColor: "#2c2e2c",
            padding: "9px 5px 5px 5px",
            display: "flex",
            gap: "5px",
            // maxWidth: "175px",
            width: "175px",
            justifyContent: "flex-start",
            overflowY: "scroll",
            overflowWrap: "anywhere",
            whiteSpace: "nowrap",
            border: "1px solid bisque",
            borderBottom: "none",
            borderRadius: "7px 7px 0 0",
            color: "gainsboro",
            flexWrap: "wrap",
            height: "42px",
          }}
        >
          {results.map((_re, index) => (
            <span
              className="pagination--item"
              style={{ cursor: "pointer" }}
              onClick={() => setShow(index)}
              data-show={show === index}
            >
              {index + 1}
            </span>
          ))}
          {/* {slice()} */}
        </div>
      </section>
      <section className="container-re container-response">
        <div className="container-re--header">
          <span className="container-re-title">RESPONSE</span>
          <span className="e2e-re-timeNumber-request">
            {results[show].responseTime}ms
          </span>
        </div>

        <JSONViewer jsonData={results[show].response} />
      </section>
    </div>
  );
};
