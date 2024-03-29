/** @jsx h */
import { Fragment, h, useEffect, useState, useRef } from "../reactDeps.ts";
import { ConvertMilliseconds } from "../utils/convertMilliseconds.ts";
import { useNonInitialEffect } from "./hooks/useNonInitialEffect.ts";
import DeleteIcon from "./icon/DeleteIcon.tsx";
import DustbinIcon from "./icon/DustbinIcon.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
export function History({
  setFormFromHistory,
}: // ,localHistory
{
  setFormFromHistory: (form: any) => void;
  // localHistory:any
}) {
  const { history, setHistory, deleteItemHistory } = useLesan();
  const [show, setShow] = useState("");

  useNonInitialEffect(() => {
    localStorage.setItem("localHistory", JSON.stringify(history));
  }, [history]);

  return (
    <Fragment>
      {history && history?.length > 0 ? (
        <div>
          <br />
          {history.map((hi, index) => (
            <div className="container-detail" id={hi.id}>
              <section className="container-re">
                <div
                  style={{
                    position: "relative",
                    borderBottom: "1px solid gainsboro",
                  }}
                >
                  <span className="container-re-title">REQUEST</span>
                  <span className="history-re-detail-date">{hi.reqDate}</span>
                </div>
                <div className="container-re-detail">
                  <div className="container-re-detail-title">
                    {" "}
                    <JSONViewer jsonData={(hi.request.body as any).model} />
                    <span>|</span>
                    <div>
                      <JSONViewer jsonData={(hi.request.body as any).act} />
                    </div>
                  </div>
                  {show === hi.id ? (
                    <button
                      onClick={() => setShow("")}
                      className="history-re-detail-button"
                    >
                      Hide
                      <span className="history-re-detail-button-icon">
                        &#8211;
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShow(hi.id);
                        document.getElementById(hi.id)?.scrollIntoView();
                      }}
                      className="history-re-detail-button"
                    >
                      Show{" "}
                      <span className="history-re-detail-button-icon">
                        &#43;
                      </span>
                    </button>
                  )}
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={show === hi.id}
                >
                  {" "}
                  <JSONViewer jsonData={hi.request} />
                </div>
              </section>
              <section className="container-re container-response">
                <div
                  className="history-re-title_delete"
                  style={{
                    position: "relative",
                    borderBottom: "1px solid gainsboro",
                  }}
                >
                  <span
                    className="history-re-delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteItemHistory(index);
                    }}
                  >
                    <DeleteIcon />
                  </span>
                  <span className="container-re-title history-response-title">
                    RESPONSE
                  </span>
                  <span className="history-re-detail-date history-response-took">
                    {ConvertMilliseconds(hi.response.tookTime)}
                  </span>
                </div>
                <div className="container-re-detail">
                  <div className="history-re-detail-title">
                    <div className="history-re-response-title">
                      {" "}
                      <span className="history-re-response-title-status">
                        success:
                      </span>
                      <div className="history-re-response-info">
                        <JSONViewer jsonData={hi.response.success} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setFormFromHistory(hi.request)}
                    className="history-re-detail-button"
                  >
                    Use{" "}
                    <span className="history-re-detail-button-icon">
                      &#10140;{" "}
                    </span>
                  </button>
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={show === hi.id}
                >
                  {" "}
                  <JSONViewer jsonData={hi.response} />
                </div>
              </section>
            </div>
          ))}
        </div>
      ) : (
        <span className="no-history">"There is no history to display"</span>
      )}
      {history && history.length > 0 ? (
        <div className="clear-history">
          <button
            className="btn clear-history-button tooltip"
            onClick={() => {
              if (confirm("Clear All History?") == true) {
                setHistory([]);
              }
            }}
          >
            <DustbinIcon />
            <span className="tooltip-text">Clear History</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
