/** @jsx h */
import { Fragment, h, useState } from "../reactDeps.ts";
import { TSequenceDetail } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { ResultSlider } from "./ResultSlider.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";

export function SequenceSlider({ sequence }: { sequence: TSequenceDetail }) {
  const [isShowE2eResponse, setIsShowE2eResponse] = useState<boolean>(true);

  return (
    <div key={sequence.id} className="container-detail">
      {isShowE2eResponse
        ? (
          <Fragment>
            <section className="sequence-re">
              <div className="container-re--header">
                <span
                  className="container-re--header--icon"
                  onClick={() => setIsShowE2eResponse(false)}
                >
                  <InfoIcon />
                </span>
                <span className="container-re-title">Body Header</span>
              </div>
              <JSONViewer jsonData={JSON.parse(sequence.bodyHeader)} />
            </section>
            <section className="sequence-re sequence-response ">
              <div className="container-re--header">
                <span className="container-re-title">Description</span>
              </div>
              <div className="detail-sequence">
                <p>
                  you send <span>{sequence.repeat}</span> times of this request
                </p>
                <p>
                  The best request performance is{" "}
                  <span>{sequence.bestTime.time} ms</span> in{" "}
                  <span>{sequence.bestTime.resultIdx}</span> index
                </p>

                <p>
                  The worst request performance is{" "}
                  <span>{sequence.worstTime.time} ms</span> in{" "}
                  <span>{sequence.worstTime.resultIdx}</span> index
                </p>

                <p>
                  the avrage time for each request is{" "}
                  <span>{sequence.time / sequence.repeat} ms</span>
                </p>
                <p>
                  and whole time is <span>{sequence.time} ms</span>
                </p>
                <p>
                  this sequence sends <span>{sequence.success}</span>{" "}
                  <b>success</b> request and <span>{sequence.fails}</span> it be
                  {" "}
                  <b>fails</b>
                </p>
                <span>
                  You capture these Items in this sequnece:{" "}
                  {sequence.captures.map((ci) => (
                    <ul>
                      <li>key: {ci.key}</li>
                      <li>captured from: {ci.captured}</li>
                      <li>with value of: {ci.value}</li>
                      <li>inside model : {ci.model}</li>
                      <li>and act : {ci.act}</li>
                      <li>
                        this item captured inside sequnce index:{" "}
                        {ci.sequenceIdx}
                      </li>
                    </ul>
                  ))}
                </span>

                <span>
                  You are using these capture items in this sequence:{" "}
                  {sequence.usedCaptures.map((ci) => (
                    <ul>
                      <li>key: {ci.key}</li>
                      <li>captured from: {ci.captured}</li>
                      <li>with value of: {ci.value}</li>
                      <li>inside model : {ci.model}</li>
                      <li>and act : {ci.act}</li>
                      <li>
                        this item captured inside sequnce index:{" "}
                        {ci.sequenceIdx}
                      </li>
                    </ul>
                  ))}
                </span>

                {
                  /* {sequence.captures.length && (
                    <p>
                      you capture theese in this sequence :
                      {sequence.captures.map((capture) => (
                        <div>
                          <span>`{capture.value} as </span>
                          <span>{capture.key} with value of </span>
                        </div>
                      ))}
                    </p>
                  )} */
                }
              </div>
            </section>
          </Fragment>
        )
        : (
          <ResultSlider
            results={sequence.results}
            setIsShowE2eResponse={setIsShowE2eResponse}
          />
        )}
    </div>
  );
}
