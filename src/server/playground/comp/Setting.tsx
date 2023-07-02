/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { Fragment } from "https://esm.sh/preact@10.5.15";
import { TRequest, useLesan } from "./ManagedLesanContext.tsx";

export function Setting() {
  const {
    act,
    formData,
    getFields,
    headers,
    history,
    method,
    postFields,
    response,
    schema,
    service,
    setService,
    setMethod,
    setSchema,
    setAct,
    setPostFields,
    setGetFields,
    setFormData,
    setHeader,
    setHistory,
    setResponse,
    resetGetFields,
    resetPostFields,
  } = useLesan();

  return (
    <div className="setting">
      <div className="url">
        <p className="url-title">Set Url</p>
        <input
          className="url-input"
          placeholder="Set URL"

        />
        <button className="btn url-button">Apply</button>
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
