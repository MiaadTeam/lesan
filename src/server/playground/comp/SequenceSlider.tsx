/** @jsx h */

import { Fragment, h, useState } from "../reactDeps.ts";
import { TSequenceDetail } from "./E2E.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { ResultSlider } from "./ResultSlider.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";
import SortFromTopToBottomIcon from "./icon/SortFromTopToBottomIcon.tsx";

export function SequenceSlider({
  sequence,
  index,
}: {
  sequence: TSequenceDetail;
  index: number;
}) {
  const [isShowE2eResponse, setIsShowE2eResponse] = useState<boolean>(true);

  return (
    <div id={index.toString()} key={sequence.id} className="container-detail">
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
                <div className="container--re--header--icon-number">
                  {" "}
                  <SortFromTopToBottomIcon />
                  <span>{index + 1}</span>
                </div>

                <span className="container-re-title">Body Header</span>
              </div>
              <div style={{ maxHeight: "27rem", overflowY: "scroll" }}>
                <JSONViewer jsonData={JSON.parse(sequence.bodyHeader)} />
              </div>
            </section>
            <section className="sequence-re sequence-response ">
              <div className="container-re--header">
                <span className="container-re-title">Description</span>
              </div>
              <div
                className="detail-sequence"
                style={{ maxHeight: "27rem", overflowY: "scroll" }}
              >
                <div className="detail-sequence--sections">
                  <span className="sequnce-description-label">Requests</span>
                  {" "}
                  <span className="detail-sequence--sections--first-item">
                    All Request Count: <span>{sequence.repeat}</span>
                    {" "}
                  </span>
                  <span className="e2e-success">
                    Success:<span>{sequence.success}</span>
                  </span>
                  <span className="e2e-fail">
                    Fails: <span>{sequence.fails}</span>
                  </span>
                  <span>
                    All Request Time: <span>{sequence.time.toFixed(2)} ms</span>
                  </span>
                  <span>
                    Avrage Time For Each Request:{" "}
                    <span>
                      {(sequence.time / sequence.repeat).toFixed(2)} ms
                    </span>
                  </span>
                </div>
                <div className="detail-sequence--sections">
                  <span className="sequnce-description-label">Best</span>{" "}
                  <span className="detail-sequence--sections--first-item">
                    Best Time:{" "}
                    <span>{sequence.bestTime.time.toFixed(2)} ms</span>
                  </span>
                  <span>
                    Request Number: <span>{sequence.bestTime.resultIdx}</span>
                  </span>
                </div>
                <div className="detail-sequence--sections">
                  <span className="sequnce-description-label">Worst</span>
                  <span className="detail-sequence--sections--first-item">
                    Worst Time:{" "}
                    <span>{sequence.worstTime.time.toFixed(2)} ms</span>
                    {" "}
                  </span>
                  <span>
                    {" "}
                    Request Number: <span>{sequence.worstTime.resultIdx}</span>
                  </span>
                </div>
                {sequence.captures.length > 0 && (
                  <div className="detail-sequence--sections">
                    <span className="sequnce-description-label">
                      Capture Items
                    </span>{" "}
                    {sequence.captures.map((ci) => (
                      <ul className="detail-sequence--sections--capture-items">
                        <li>
                          key:{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.key}
                          </span>
                        </li>
                        <li>
                          value :{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.value}
                          </span>
                        </li>
                        <li>
                          model :{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.model}
                          </span>
                        </li>
                        <li>
                          act :{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.act}
                          </span>
                        </li>
                        <li>
                          sequnce number:{" "}
                          <span className="information-container--request--sections--item--content">
                            {" "}
                            {ci.sequenceIdx}
                          </span>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}

                {sequence.usedCaptures.length > 0 && (
                  <div className="detail-sequence--sections">
                    <span className="sequnce-description-label">
                      Using Capture Items
                    </span>{" "}
                    {sequence.usedCaptures.map((ci) => (
                      <ul className="detail-sequence--sections--capture-items">
                        <li>
                          key:{" "}
                          <span className="information-container--request--sections--item--content">
                            {" "}
                            {ci.key}
                          </span>
                        </li>
                        <li>
                          captured from:{" "}
                          <span className="information-container--request--sections--item--content">
                            {" "}
                            {ci.captured}
                          </span>
                        </li>
                        <li>
                          value:{" "}
                          <span className="information-container--request--sections--item--content">
                            {" "}
                            {ci.value}
                          </span>
                        </li>
                        <li>
                          {" "}
                          model :{" "}
                          <span className="information-container--request--sections--item--content">
                            {" "}
                            {ci.model}
                          </span>
                        </li>
                        <li>
                          {" "}
                          act :{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.act}
                          </span>
                        </li>
                        <li>
                          sequnce number:{" "}
                          <span className="information-container--request--sections--item--content">
                            {ci.sequenceIdx}
                          </span>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </Fragment>
        )
        : (
          <ResultSlider
            results={sequence.results}
            setIsShowE2eResponse={setIsShowE2eResponse}
            index={index}
          />
        )}
    </div>
  );
}
