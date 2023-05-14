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

  const renderGetFileds = (getField: any, keyName: string, margin: number) => {
    return (
      <div style={{ marginLeft: `${margin + 10}px` }}>
        <h1 style={{ marginLeft: "0" }}>{keyName} :</h1>
        {Object.keys(getField["schema"]).map((childKeys) => {
          return getField["schema"][childKeys].type === "enums" ? (
            <div
              className="input-container"
              style={{ marginLeft: `${margin + 10}px` }}
            >
              <label htmlFor={childKeys}>{childKeys}:</label>
              <input
                placeholder={`${keyName}.${childKeys}`}
                type="number"
                id={`${keyName}.${childKeys}`}
                value={(formData as any)[`get.${keyName}.${childKeys}`]}
                name={`get.${keyName}.${childKeys}`}
                onChange={handleChange}
              />
            </div>
          ) : (
            renderGetFileds(
              getField["schema"][childKeys],
              `${keyName}.${childKeys}`,
              margin + 10
            )
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div className="headers">
          <span>set headers :</span>
          {Object.entries(headers).map(([objKey, objValue]) => {
            return (
              <div className="auth-input">
                <input
                  placeholder={objKey}
                  id={objKey}
                  value={objKey}
                  name={objKey}
                  onChange={(e: any) => {
                    const { name, value } = e.target;
                    objKey = value;
                  }}
                />
                <input
                  placeholder={objValue}
                  id={objValue}
                  value={objValue}
                  name={objValue}
                  onChange={(e: any) => {
                    const { name, value } = e.target;
                    objValue = value;
                  }}
                />
                <button
                  className="btn"
                  onClick={() => {
                    setHeader({
                      ...headers,
                      [objKey]: objValue,
                    });
                  }}
                >
                  Apply
                </button>
              </div>
            );
          })}
        </div>
        <div className="service-container">
          <label>select service?</label>
          <select
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

        <div className="service-container">
          <label>select dynamic or static?</label>
          <select
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

        {service && method && (
          <div className="service-container">
            <label>select schema?</label>
            <select
              value={schema}
              onChange={(event: any) => {
                setSchema(event.target.value);
                resetGetFields();
                resetPostFields();
                setFormData({});
              }}
            >
              <option value=""></option>
              {Object.keys((actsObj as any)[service][method]).map((schema) => (
                <option value={schema}>{schema}</option>
              ))}
            </select>
          </div>
        )}

        {service && method && schema && (
          <div className="service-container">
            <label>select act?</label>
            <select
              value={act}
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
              {Object.keys((actsObj as any)[service][method][schema]).map(
                (schema) => (
                  <option value={schema}>{schema}</option>
                )
              )}
            </select>
          </div>
        )}
      </div>

      {service && method && schema && postFields && getFields && (
        <div className="content">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="">
              <h1>set inputs :</h1>
              <div className="get-container">
                {Object.keys(postFields).map((setField) => (
                  <div className="input-container">
                    <label htmlFor={setField}>{setField}:</label>
                    <input
                      placeholder={setField}
                      id={setField}
                      value={(formData as any)[`set.${setField}`]}
                      name={`set.${setField}`}
                      type={
                        postFields[setField]["type"] === "number"
                          ? "number"
                          : "string"
                      }
                      alt={postFields[setField]["type"]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <h1>get inputs :</h1>
              <div className="set-container">
                {Object.keys(getFields).map((getField) => {
                  return ((getFields as any)[getField] as any).type ===
                    "enums" ? (
                    <div className="input-container">
                      <label htmlFor={getField}>{getField}:</label>
                      <input
                        placeholder={getField}
                        id={getField}
                        value={(formData as any)[`get.${getField}`]}
                        name={`get.${getField}`}
                        type="number"
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    renderGetFileds((getFields as any)[getField], getField, 0)
                  );
                })}
              </div>
              <button className="btn btn-submit" type="submit">
                Submit
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
