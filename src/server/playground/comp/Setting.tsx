/** @jsx h */
import { Fragment, h, useEffect, useState } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";

export function Setting({
  configUrl,
}: {
  configUrl: (address?: string) => void;
}) {
  const { headers, setHeader } = useLesan();
  const [headersState, setHeadersState] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);

  const [urlAddress, setUrlAddress] = useState("");

  useEffect(() => {
    const arrHeader = [];
    for (const key in headers) {
      arrHeader.push({ key, value: headers[key] });
    }
    setHeadersState(arrHeader);
  }, []);

  return (
    <div className="setting modal-content">
      <div className="url">
        <p className="url-title">Fetch Config</p>
        <div className="url-detail">
          <button
            className="btn url-button"
            onClick={() => configUrl()}
          >
            Refetch Config
          </button>
        </div>
        <div className="url-detail">
          {" "}
          <input
            className="url-input"
            placeholder="Set URL"
            onChange={(e: any) => setUrlAddress(e.target.value)}
          />
          <button
            className="btn url-button"
            onClick={() => configUrl(urlAddress)}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="sidebar__section sidebar__section--headers">
        <div className="sidebar__section-heading">set headers</div>
        <div className="sidebar__input-double">
          <button
            className="btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture "
            onClick={() => {
              setHeadersState([...headersState, { key: "", value: "" }]);
            }}
          >
            add header
          </button>
          {headersState?.map((hst, idx) => (
            <Fragment key={`${idx}____`}>
              <input
                placeholder="Authotization"
                value={hst.key}
                onChange={(e: any) => {
                  setHeadersState((prevState) => {
                    prevState[idx].key = e.target.value;
                    return prevState;
                  });
                }}
              />
              <input
                placeholder="some string ..."
                value={hst.value}
                onChange={(e: any) => {
                  setHeadersState((prevState) => {
                    prevState[idx].value = e.target.value;
                    return prevState;
                  });
                }}
              />
            </Fragment>
          ))}
          <button
            className="btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture "
            onClick={() => {
              const newHeaders: Record<string, string> = {};
              for (const header of headersState) {
                const { key, value } = header;
                newHeaders[key] = value;
              }

              setHeader(newHeaders);
            }}
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );
}
