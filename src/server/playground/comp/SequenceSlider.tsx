/** @jsx h */
import { Fragment, h, useState } from "../reactDeps.ts";
import { TReqDetails, TSequenceDetail } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { ResultSlider } from "./ResultSlider.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";

export function SequenceSlider({ sequence }: { sequence: TSequenceDetail }) {
  const [isShowE2eResponse, setIsShowE2eResponse] = useState<boolean>(true);

  return (
    <div key={sequence.id} className="container-detail">
      {isShowE2eResponse ? (
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
                the avrage time for each request is
                <span> {sequence.time / sequence.repeat}ms</span>
              </p>
              <p>
                and whole time is
                <span> {sequence.time}ms</span>
              </p>
              <p>
                this sequence sends
                <span> {sequence.success}</span> success request and{" "}
                <span> {sequence.fails}</span> it be fails
              </p>
              {/* {sequence.captures.length && (
                    <p>
                      you capture theese in this sequence :
                      {sequence.captures.map((capture) => (
                        <div>
                          <span>`{capture.value} as </span>
                          <span>{capture.key} with value of </span>
                        </div>
                      ))}
                    </p>
                  )} */}
            </div>
          </section>
        </Fragment>
      ) : (
        <ResultSlider
          results={sequence.results}
          setIsShowE2eResponse={setIsShowE2eResponse}
        />
      )}
    </div>
  );
}
