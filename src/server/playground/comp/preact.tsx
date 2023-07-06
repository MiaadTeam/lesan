/** @jsx h */
import { h, Fragment } from "https://esm.sh/preact@10.5.15";
import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.5.15/hooks";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { TRequest, useLesan } from "./ManagedLesanContext.tsx";

import { History } from "./History.tsx";
import Modal from "./Modal.tsx";
import { Setting } from "./Setting.tsx";
import useModal from "./useModal.tsx";

const getSchemasAPI = ({ baseUrl }: { baseUrl: string }) =>
  fetch(`${baseUrl}static/get/schemas`).then((res) => res.json());

const lesanAPI = ({
  baseUrl,
  options,
}: {
  baseUrl: string;
  options: TRequest;
}) => fetch(`${baseUrl}lesan`, options).then((res) => res.json());

enum MODAL_TYPES {
  HISTORY = "HISTORY",
  GRAPH = "GRAPH",
  SETTING = "SETTING",
  E2E_TEST = "E2E_TEST",
}

export const Page = () => {
  const { isOpen, toggleModal } = useModal();

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
    setHistory,
    setResponse,
    resetGetFields,
    resetPostFields,
  } = useLesan();

  const [active, setActive] = useState("");
  const [actsObj, setActsObj] = useState({});
  const [schemasObj, setSchemasObj] = useState({});
  const [urlAddress, setUrlAddress] = useState(
    window && window.location ? window.location.href : "http://localhost:1366"
  );

  const formRef = useRef<HTMLFormElement>(null);

  const configUrl = (address: string) => {
    setUrlAddress(address);

    setService("");
    setMethod("");
    setSchema("");
    resetGetFields();
    resetPostFields();
    setFormData({});

    getSchemasAPI({ baseUrl: address }).then(({ schemas, acts }) => {
      setActsObj(acts);
      setSchemasObj(schemas);
    });
  };

  const setFormFromHistory = (request: any) => {
    setService(request.body.service);
    setMethod(request.body.contents);
    setSchema(request.body.wants.model);
    setAct(request.body.wants.act);

    const actObj = (actsObj as any)[request.body.service][
      request.body.contents
    ][request.body.wants.model][request.body.wants.act]["validator"]["schema"];

    setGetFields(actObj["get"]["schema"]);
    setPostFields(actObj["set"]["schema"]);

    setResponse(null);

    toggleModal();
  };

  useEffect(() => {
    configUrl(window.location.href);
  }, []);

  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleChange = (event: any) => {
    const { name, value, type, alt } = event.target;
    let updatedValue: string | number | boolean | any[];

    if (type === "number") {
      updatedValue = Number(value);
    } else if (alt === "array" || alt === "boolean") {
      updatedValue = JSON.parse(value);
    } else {
      updatedValue = value;
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const renderGetFields = ({
    getField,
    keyName,
    margin,
  }: {
    getField: any;
    keyName: string;
    margin: number;
  }) => (
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
          renderGetFields({
            getField: getField["schema"][item],
            keyName: `${keyName}.${item}`,
            margin: margin + 10,
          })
        )
      )}
    </div>
  );

  const createNestedObjectsFromKeys = (
    obj: Record<string, any>
  ): Record<string, any> => {
    const result: Record<string, any> = {};

    // For each object path (property key) in the object
    for (const objectPath in obj) {
      // Split path into component parts
      const parts = objectPath.split(".");

      // Create sub-objects along path as needed
      let target: Record<string, any> = result;
      while (parts.length > 1) {
        const part = parts.shift()!;
        target[part] = target[part] || {};
        target = target[part];
      }

      // Set value at end of path
      target[parts[0]] = obj[objectPath];
    }

    return result;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const details = createNestedObjectsFromKeys(formData);

    const body: TRequest = {
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

    const jsonSendedRequest = await lesanAPI({
      baseUrl: urlAddress,
      options: body,
    });

    setResponse(jsonSendedRequest);
    /* event.target.reset(); */
    /* setFormData({}); */

    setHistory([
      {
        request: { ...body, body: JSON.parse(body.body) },
        response: jsonSendedRequest,
        id: uid(),
      },
      ...history,
    ]);
  };

  const canShowRequestFields =
    service && method && schema && postFields && getFields && act;

  const canShowSchema = service && method;

  const canShowAct = service && method && schema;

  const modalBtnClickHandler = (type: MODAL_TYPES) => {
    setActive(type);
    toggleModal();
  };

  return (
    <div className="cnt">
      <div className="sidebar">
        <div className="sidebar__sections-wrapper">
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
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="sidebar__section sidebar__section--method">
            <div className="sidebar__section-heading">select content</div>
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
                ? Object.keys((actsObj as any)[service][method]).map(
                    (schema) => <option value={schema}>{schema}</option>
                  )
                : null}
            </select>
          </div>
          <div className="sidebar__section sidebar__section--act">
            <div className="sidebar__section-heading">select action</div>
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
        <div className="sidebar__btns-wrapper">
          <button
            className="btn btn-modal"
            onClick={() => modalBtnClickHandler(MODAL_TYPES.HISTORY)}
          >
            History
          </button>
          <button
            className="btn btn-modal btn-modal--2"
            onClick={() => modalBtnClickHandler(MODAL_TYPES.SETTING)}
          >
            Setting
          </button>
          <button
            className="btn btn-modal btn-modal--3"
            onClick={() => modalBtnClickHandler(MODAL_TYPES.GRAPH)}
          >
            Graph
          </button>
          <button
            className="btn btn-modal btn-modal--4"
            onClick={() => modalBtnClickHandler(MODAL_TYPES.E2E_TEST)}
          >
            E2E Test
          </button>
        </div>
      </div>

      {canShowRequestFields && (
        <div className="sidebar sidebar--fields">
          <form ref={formRef} onSubmit={handleSubmit} className="form--fields">
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              SET fields
            </div>
            {Object.keys(postFields).map((item) => (
              <div className="input-cnt" key={item}>
                <label htmlFor={item}>{item}:</label>
                {postFields[item]["type"] === "enums" ? (
                  <select
                    className="sidebar__select"
                    value={formData[`set.${item}`]}
                    onChange={(event: any) => {
                      setFormData({
                        ...formData,
                        [`set.${item}`]: event.target.value,
                      });
                    }}
                  >
                    <option value=""></option>
                    {Object.keys(postFields[item]["schema"]).map((schema) => (
                      <option value={schema}>{schema}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    placeholder={item}
                    id={item}
                    value={formData[`set.${item}`]}
                    name={`set.${item}`}
                    type={
                      postFields[item]["type"] === "number"
                        ? "number"
                        : "string"
                    }
                    alt={postFields[item]["type"]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              GET fields
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
                renderGetFields({
                  getField: getFields[item],
                  keyName: item,
                  margin: 0,
                })
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
          <div class="response-detail">
            <p className="response-detail-title">Response</p>
            <div className="response-detail-info">
              <JSONViewer jsonData={response} />
              {response && response?.success === true ? (
                <div className="success"></div>
              ) : (
                <div className="fail"></div>
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <Modal toggle={toggleModal} title={active}>
            {active === MODAL_TYPES.HISTORY ? (
              <History setFormFromHistory={setFormFromHistory} />
            ) : active === MODAL_TYPES.SETTING ? (
              <Setting configUrl={configUrl} />
            ) : (
              <Fragment></Fragment>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};
