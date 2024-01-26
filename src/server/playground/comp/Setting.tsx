/** @jsx h */
import { h, useEffect, useState } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import AddIcon from "./icon/AddIcon.tsx";
import TickIcon from "./icon/TickIcon.tsx";
import DeleteIcon from "./icon/DeleteIcon.tsx";

export function Setting({
  configUrl,
}: {
  configUrl: (address?: string) => void;
}) {
  const [active, setActive] = useState("no");
  const handleClick = () => {
    setTimeout(() => {
      setActive("no");
    }, 1000);
  };
  const handleDelete = (fromIndex: any) => {
    headersState[fromIndex];
    headersState.splice(fromIndex, 1);
    setHeadersState([...headersState]);
  };
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
          {" "}
          <input
            className="input url-input "
            placeholder="Set URL"
            onChange={(e: any) => setUrlAddress(e.target.value)}
          />
          <button
            className="setting_fetch-config--apply-button e2e-back-button e2e-add-capture "
            onClick={() => {
              configUrl(urlAddress);
              setActive("yes");
              handleClick();
            }}
          >
            <TickIcon />
            <span>{active === "yes" ? "Applyed!" : "Apply"}</span>
          </button>
        </div>
      </div>
      <div className="sidebar__section sidebar__section--headers">
        <div className="sidebar__section-heading setting_heading">
          {" "}
          <span className="setting_heading--title">Set Headers</span>
          <button
            className="setting_add-header--button e2e-back-button e2e-export_results-button e2e-add-capture "
            onClick={() => {
              setHeadersState([...headersState, { key: "", value: "" }]);
            }}
          >
            <AddIcon />
            <span>Add Header</span>
          </button>
        </div>
        <div className="setting_container--setheaders">
          <div className="setting_set-headers">
            {headersState?.map((hst, idx) => (
              <div key={`${idx}____`} className="setting_set-headers--inputs">
                <div className="setting__set-headers--key-value setting__set-headers--key">
                  <span>Key:</span>
                  <input
                    className="setting_set-headers--inputs--key input"
                    placeholder="Authotization"
                    value={hst.key}
                    onChange={(e: any) => {
                      setHeadersState((prevState) => {
                        prevState[idx].key = e.target.value;
                        return prevState;
                      });
                    }}
                  />
                </div>
                <div className="setting__set-headers--key-value setting__set-headers--value">
                  <span>Value:</span>
                  <input
                    className="setting_set-headers--inputs--value input"
                    placeholder="some string ..."
                    value={hst.value}
                    onChange={(e: any) => {
                      setHeadersState((prevState) => {
                        prevState[idx].value = e.target.value;
                        return prevState;
                      });
                    }}
                  />
                </div>
                {headersState.length > 1 && (
                  <div
                    className="setting_set-headers--delete-button e2e-move-div e2e-move-close"
                    onClick={() => handleDelete(idx)}
                  >
                    <DeleteIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="setting_set-headers--apply-button e2e-back-button e2e-add-capture "
            onClick={() => {
              const newHeaders: Record<string, string> = {};
              for (const header of headersState) {
                const { key, value } = header;
                newHeaders[key] = value;
              }
              setHeader(newHeaders);
              setActive("yess");
              handleClick();
            }}
          >
            <TickIcon />
            <span>{active === "yess" ? "Applyed!" : "Apply"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
