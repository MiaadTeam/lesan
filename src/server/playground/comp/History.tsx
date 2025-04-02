/** @jsx h */
import { Fragment, h, useEffect, useRef, useCallback } from "../reactDeps.ts";
import { signal, computed } from "../reactDeps.ts";
import { ConvertMilliseconds } from "../utils/convertMilliseconds.ts";
import { useNonInitialEffect } from "./hooks/useNonInitialEffect.ts";
import DeleteIcon from "./icon/DeleteIcon.tsx";
import DustbinIcon from "./icon/DustbinIcon.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";

const ITEMS_PER_PAGE = 10;
const SCROLL_THRESHOLD = 100;

// Global signals for history state
const showIdSignal = signal("");
const pageSignal = signal(1);
const isLoadingSignal = signal(false);

export function History({
  setFormFromHistory,
}: {
  setFormFromHistory: (form: any) => void;
}) {
  const { history, setHistory, deleteItemHistory } = useLesan();
  const containerRef = useRef<HTMLDivElement>(null);

  useNonInitialEffect(() => {
    localStorage.setItem("localHistory", JSON.stringify(history));
  }, [history]);

  // Computed value to derive visible items based on current page
  const visibleHistory = computed(() => {
    return history.slice(0, pageSignal.value * ITEMS_PER_PAGE);
  });

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingSignal.value) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD) {
      isLoadingSignal.value = true;
      pageSignal.value += 1;
      // Use setTimeout to simulate async loading and prevent multiple triggers
      setTimeout(() => {
        isLoadingSignal.value = false;
      }, 100);
    }
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      deleteItemHistory(index);
    },
    [deleteItemHistory]
  );

  const handleUseHistory = useCallback(
    (request: any) => {
      setFormFromHistory(request);
    },
    [setFormFromHistory]
  );

  const handleShowDetails = useCallback((id: string) => {
    showIdSignal.value = showIdSignal.value === id ? "" : id;
    if (id && showIdSignal.value) {
      // Delay scrolling to ensure UI updates first
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    if (confirm("Clear All History?") === true) {
      setHistory([]);
    }
  }, [setHistory]);

  return (
    <Fragment>
      {history && history?.length > 0 ? (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <br />
          {visibleHistory.value.map((hi, index) => (
            <div key={hi.id} className="container-detail" id={hi.id}>
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
                    <JSONViewer jsonData={(hi.request.body as any).model} />
                    <span>|</span>
                    <div>
                      <JSONViewer jsonData={(hi.request.body as any).act} />
                    </div>
                  </div>
                  <button
                    onClick={() => handleShowDetails(hi.id)}
                    className="history-re-detail-button"
                  >
                    {showIdSignal.value === hi.id ? "Hide" : "Show"}{" "}
                    <span className="history-re-detail-button-icon">
                      {showIdSignal.value === hi.id ? "−" : "+"}
                    </span>
                  </button>
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={showIdSignal.value === hi.id}
                >
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
                      handleDelete(index);
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
                      <span className="history-re-response-title-status">
                        success:
                      </span>
                      <div className="history-re-response-info">
                        <JSONViewer jsonData={hi.response.success} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUseHistory(hi.request)}
                    className="history-re-detail-button"
                  >
                    Use <span className="history-re-detail-button-icon">→</span>
                  </button>
                </div>
                <div
                  className="history-re-detail-complete"
                  data-show={showIdSignal.value === hi.id}
                >
                  <JSONViewer jsonData={hi.response} />
                </div>
              </section>
            </div>
          ))}
          {isLoadingSignal.value && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              Loading...
            </div>
          )}
        </div>
      ) : (
        <span className="no-history">"There is no history to display"</span>
      )}
      {history && history.length > 0 ? (
        <div className="clear-history">
          <button
            className="btn clear-history-button tooltip"
            onClick={handleClearHistory}
          >
            <DustbinIcon />
            <span className="tooltip-text">Clear History</span>
          </button>
        </div>
      ) : null}
    </Fragment>
  );
}
