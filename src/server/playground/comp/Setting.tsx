/** @jsx h */
import { h, useState } from "../../../deps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";

export function Setting({
  configUrl,
}: {
  configUrl: (address?: string) => void;
}) {
  const { headers, setHeader } = useLesan();
  const [urlAddress, setUrlAddress] = useState("");

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
        {Object.entries(headers).map(([objKey, objValue]) => (
          <div className="sidebar__input-double" key={objKey}>
            <input
              placeholder={objKey}
              id={objKey}
              value={objKey}
              name={objKey}
              onChange={(e: any) => {
                objKey = e.target.value;
              }}
            />
            <input
              placeholder={objValue}
              id={objValue}
              value={objValue}
              name={objValue}
              onChange={(e: any) => {
                objValue = e.target.value;
              }}
            />
            <button
              className="btn btn--add"
              onClick={() => {
                setHeader({
                  ...headers,
                  [objKey]: objValue,
                });
              }}
            >
              add +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
