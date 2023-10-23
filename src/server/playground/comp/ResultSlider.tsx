/** @jsx h */
import { h, useState } from "../reactDeps.ts";
import { TResults } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";

export const ResultSlider = ({ results }: { results: TResults[] }) => {
  const [show, setShow] = useState(0);

  return (
    <div
      style={{ display: "flex", minWidth: "100%" }}
      id={results[show].id}
    >
      {results.map((_re, index) => (
        <span onClick={() => setShow(index)}>{index + 1}</span>
      ))}
      <section className="container-re" // style={{ minWidth: "100%", width: "100%" }}
      >
        <div style={{ display: "flex" }}>
          <span className="container-re-title">
            REQUEST
          </span>
        </div>
        <JSONViewer jsonData={results[show].request} />
      </section>
      <section className="container-re container-response" // style={{ minWidth: "100%", width: "100%" }}
      >
        <span className="container-re-title">
          RESPONSE
        </span>
        <span className="e2e-re-timeNumber-request">
          {results[show].responseTime}ms
        </span>

        <JSONViewer jsonData={results[show].response} />
      </section>
    </div>
  );
};
