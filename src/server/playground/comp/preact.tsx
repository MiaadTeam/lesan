/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.5.15/hooks";
import { useLesan } from "./ManagedLesanContext.tsx";

export const Page = () => {
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

  const [actsObj, setActsObj] = useState({});
  const [schemasObj, setSchemasObj] = useState({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("http://localhost:8000/static/get/schemas").then((value) => {
      value.json().then(({ schemas, acts }) => {
        setActsObj(acts);
        setSchemasObj(schemas);
      });
    });
  }, []);

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleChange = (event: any) => {
    const { name, value, type, alt } = event.target;
    setFormData({
      ...formData,
      [name]:
        type === "number"
          ? Number(value)
          : alt === "array" || alt === "boolean"
          ? JSON.parse(value)
          : value,
    });
  };

  const deepen = (obj: Record<string, any>) => {
    const result = {};

    // For each object path (property key) in the object
    for (const objectPath in obj) {
      // Split path into component parts
      const parts = objectPath.split(".");

      // Create sub-objects along path as needed
      let target = result;
      while (parts.length > 1) {
        const part = parts.shift();
        target = (target as any)[part!] = (target as any)[part!] || {};
      }

      // Set value at end of path
      (target as any)[parts[0]] = obj[objectPath];
    }

    return result;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const details = deepen(formData);

    /* for (const key in formData) { */
    /*   key.split(".").map((k, i, values) => { */
    /*     body = (body as any)[k] = i == values.length - 1 */
    /*       ? (formData as any)[key] */
    /*       : {}; */
    /*   }); */
    /* } */

    const body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        service: service,
        contents: method,
        wants: { model: schema, act: act },
        details,
      }),
    };

    const sendedRequest = await fetch("http://localhost:8000/lesan", body);
    const jsonSendedRequest = await sendedRequest.json();

    setResponse(jsonSendedRequest);
    /* event.target.reset(); */
    /* setFormData({}); */

    setHistory([
      ...(history ? history : []),
      {
        request: JSON.stringify(body, null, 2),
        response: JSON.stringify(jsonSendedRequest, null, 2),
        id: uid(),
      },
    ]);
  };

  const renderGetFields = (getField: any, keyName: string, margin: number) => (
    <div style={{ marginLeft: `${margin + 10}px` }}>
      <div className="sidebar__section-heading--subfields">{keyName}</div>
      {Object.keys(getField["schema"]).map((item) =>
        getField["schema"][item].type === "enums" ? (
          <div className="input-cnt" key={item}>
            <label htmlFor={item}>{item}:</label>
            <input
              placeholder={`${keyName}.${item}`}
              type="number"
              id={`${keyName}.${item}`}
              value={formData[`get.${keyName}.${item}`]}
              name={`get.${keyName}.${item}`}
              onChange={handleChange}
            />
          </div>
        ) : (
          renderGetFields(
            getField["schema"][item],
            `${keyName}.${item}`,
            margin + 10
          )
        )
      )}
    </div>
  );

  const canShowContent =
    service && method && schema && postFields && getFields && act;

  const canShowSchema = service && method;

  const canShowAct = service && method && schema;

  return (
    <div className="cnt">
      <div className="sidebar">
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
        <div className="sidebar__section sidebar__section--services">
          <div className="sidebar__section-heading">select services</div>
          <select
            className="sidebar__select"
            value={service}
            onChange={(event: any) => {
              setService(event.target.value);
              setMethod("");
              setSchema("");
              resetGetFields();
              resetPostFields();
              setFormData({});
            }}
          >
            <option value=""></option>
            {Object.keys(actsObj).map((service, index) => (
              <option value={service}>{service}</option>
            ))}
          </select>
        </div>
        <div className="sidebar__section sidebar__section--method">
          <div className="sidebar__section-heading">select method</div>
          <select
            className="sidebar__select"
            value={method}
            onChange={(event: any) => {
              setMethod(event.target.value);
              setSchema("");
              resetGetFields();
              resetPostFields();
              setFormData({});
            }}
          >
            <option value=""></option>
            <option value="dynamic">dynamic</option>
            <option value="static">static</option>
          </select>
        </div>
        <div className="sidebar__section sidebar__section--schema">
          <div className="sidebar__section-heading">select schema</div>
          <select
            className="sidebar__select"
            disabled={!canShowSchema}
            value={canShowSchema ? schema : undefined}
            onChange={(event: any) => {
              setSchema(event.target.value);
              resetGetFields();
              resetPostFields();
              setFormData({});
            }}
          >
            <option value=""></option>
            {canShowSchema
              ? Object.keys((actsObj as any)[service][method]).map((schema) => (
                  <option value={schema}>{schema}</option>
                ))
              : null}
          </select>
        </div>
        <div className="sidebar__section sidebar__section--act">
          <div className="sidebar__section-heading">select act</div>
          <select
            className="sidebar__select"
            disabled={!canShowAct}
            value={canShowAct ? act : undefined}
            onChange={(event: any) => {
              const actObj = (actsObj as any)[service][method][schema][
                event.target.value
              ]["validator"]["schema"];

              formRef && formRef.current && formRef.current.reset();
              setAct(event.target.value);
              setGetFields(actObj["get"]["schema"]);
              setPostFields(actObj["set"]["schema"]);
              setFormData({});
            }}
          >
            <option value=""></option>
            {canShowAct
              ? Object.keys((actsObj as any)[service][method][schema]).map(
                  (schema) => <option value={schema}>{schema}</option>
                )
              : null}
          </select>
        </div>
      </div>

      {canShowContent && (
        <div className="sidebar sidebar--fields">
          <form ref={formRef} onSubmit={handleSubmit} className="form--fields">
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              set fields
            </div>
            {Object.keys(postFields).map((item) => (
              <div className="input-cnt" key={item}>
                <label htmlFor={item}>{item}:</label>
                <input
                  placeholder={item}
                  id={item}
                  value={formData[`set.${item}`]}
                  name={`set.${item}`}
                  type={
                    postFields[item]["type"] === "number" ? "number" : "string"
                  }
                  alt={postFields[item]["type"]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              get fields
            </div>
            {Object.keys(getFields).map((item) =>
              getFields[item].type === "enums" ? (
                <div className="input-cnt">
                  <label htmlFor={item}>{item}:</label>
                  <input
                    placeholder={item}
                    id={item}
                    value={formData[`get.${item}`]}
                    name={`get.${item}`}
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              ) : (
                renderGetFields(getFields[item], item, 0)
              )
            )}
            <div className="cnt--btn-send">
              <button className="btn btn--send" type="submit">
                send
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="response">
        {response && (
          <div>
            <br />
            <hr />
            <br />
            the response is :
            <br />
            {JSON.stringify(response, null, 2)}
          </div>
        )}

        {history && history?.length > 0 && (
          <div>
            <br />
            <hr />
            <br />
            the req history is :
            <br />
            {history.map((hi) => (
              <div key={hi.id}>
                <section>
                  <span>the request is :</span>
                  <div>{hi.request}</div>
                </section>
                <section>
                  <span>the response is :</span>
                  <div>{hi.response}</div>
                </section>
                <br />
                <hr />
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
