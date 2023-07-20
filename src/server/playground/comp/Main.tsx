/** @jsx h */
import { Fragment, h, useEffect, useRef } from "../reactDeps.ts";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { TRequest, useLesan } from "./ManagedLesanContext.tsx";

import { uid } from "../utils/uid.ts";
import CopyIcon from "./icon/CopyIcon.tsx";

const lesanAPI = ({
  baseUrl,
  options,
}: {
  baseUrl: string;
  options: TRequest;
}) => fetch(`${baseUrl}lesan`, options).then((res) => res.json());

export const Main = ({ urlAddress }: { urlAddress: string }) => {
  const {
    activeTab,
    tabsData,
    actsObj,
    headers,
    history,
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

  const changeGetValue = (
    value: 0 | 1 | null,
    keyname: string,
    getObj: Record<string, any>,
    returnObj: Record<string, any>,
  ) => {
    for (const key in getObj) {
      getObj[key].type === "enums"
        ? (returnObj[`${keyname}.${key}`] = value)
        : changeGetValue(
          value,
          `${keyname}.${key}`,
          getObj[key].schema,
          returnObj,
        );
    }
    return returnObj;
  };

  // console.log(localStorage);

  const formRef = useRef<HTMLFormElement>(null);

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
      data: {
        ...tabsData[activeTab].formData,
        [name]: updatedValue,
      },
      index: activeTab,
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
    <div
      style={{ marginLeft: `${margin + 1}px` }}
      className="sidebar__section_container"
      key={`${activeTab}.${keyName}`}
    >
      <div className="sidebar__section-heading--subfields">{keyName}</div>
      {Object.keys(getField["schema"]).map((item, index) =>
        getField["schema"][item].type === "enums"
          ? (
            <div
              className="input-cnt get-items"
              key={`${activeTab}.${item}-${index}`}
            >
              <label htmlFor={item}>
                {keyName}.{item}:
              </label>
              <div className="get-values">
                <span
                  onClick={() => {
                    const copy = { ...tabsData[activeTab].formData };
                    delete copy[`get.${keyName}.${item}`];
                    setFormData({ data: copy, index: activeTab });
                  }}
                >
                </span>
                <span
                  className={tabsData[activeTab]
                      .formData[`get.${keyName}.${item}`] === 0
                    ? "active"
                    : ""}
                  onClick={() => {
                    setFormData({
                      index: activeTab,
                      data: {
                        ...tabsData[activeTab].formData,
                        [`get.${keyName}.${item}`]: 0,
                      },
                    });
                  }}
                >
                  0
                </span>
                <span
                  className={tabsData[activeTab]
                      .formData[`get.${keyName}.${item}`] === 1
                    ? "active"
                    : ""}
                  onClick={() => {
                    setFormData({
                      data: {
                        ...tabsData[activeTab].formData,
                        [`get.${keyName}.${item}`]: 1,
                      },
                      index: activeTab,
                    });
                  }}
                >
                  1
                </span>
              </div>
            </div>
          )
          : (
            renderGetFields({
              getField: getField["schema"][item],
              keyName: `${keyName}.${item}`,
              margin: margin + 1,
            })
          )
      )}
    </div>
  );

  const createNestedObjectsFromKeys = (
    obj: Record<string, any>,
  ): Record<string, any> => {
    const result: Record<string, any> = { get: {}, set: {} };

    // For each object path (property key) in the object
    for (const objectPath in obj) {
      if (obj[objectPath] || obj[objectPath] === 0) {
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
    }

    return result;
  };

  const requestFunction = () => {
    const details = createNestedObjectsFromKeys(tabsData[activeTab].formData);

    const body: TRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        service: tabsData[activeTab].service,
        contents: tabsData[activeTab].method,
        wants: {
          model: tabsData[activeTab].schema,
          act: tabsData[activeTab].act,
        },
        details,
      }),
    };
    return { body };
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const sendRequest = new Date().toLocaleDateString();

    const jsonSendedRequest = await lesanAPI({
      baseUrl: urlAddress,
      options: requestFunction().body,
    });

    setResponse({ data: jsonSendedRequest, index: activeTab });
    /* event.target.reset(); */
    /* setFormData({}); */

    const newHistory = [
      {
        request: {
          ...requestFunction().body,
          body: JSON.parse(requestFunction().body.body),
        },
        response: jsonSendedRequest,
        id: uid(),
        reqTime: sendRequest,
      },
      ...history,
    ];
    setHistory(newHistory);
    localStorage.setItem("localHistory", JSON.stringify(newHistory));
  };

  const canShowRequestFields = tabsData[activeTab].service &&
    tabsData[activeTab].method &&
    tabsData[activeTab].schema &&
    tabsData[activeTab].postFields &&
    tabsData[activeTab].getFields &&
    tabsData[activeTab].act;

  const canShowSchema = tabsData[activeTab].service &&
    tabsData[activeTab].method;

  const canShowAct = tabsData[activeTab].service &&
    tabsData[activeTab].method &&
    tabsData[activeTab].schema;

  const response = JSON.stringify(tabsData[activeTab].response);

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
  };

  const request = JSON.stringify(requestFunction());

  const copyRequest = () => {
    navigator.clipboard.writeText(request);
  };

  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar__sections-wrapper">
          <div className="sidebar__section sidebar__section--services">
            <div className="sidebar__section-heading">select services</div>
            <select
              className="sidebar__select"
              value={tabsData[activeTab].service}
              onChange={(event: any) => {
                setService({ data: event.target.value, index: activeTab });
                setMethod({ data: "", index: activeTab });
                setSchema({ data: "", index: activeTab });
                resetGetFields(activeTab);
                resetPostFields(activeTab);
                setFormData({ data: {}, index: activeTab });
              }}
            >
              <option value=""></option>
              {Object.keys(actsObj).map((service, index) => (
                <option key={`${activeTab}.${index}--`} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="sidebar__section sidebar__section--method">
            <div className="sidebar__section-heading">select content</div>
            <select
              className="sidebar__select"
              value={tabsData[activeTab].method}
              onChange={(event: any) => {
                setMethod({ data: event.target.value, index: activeTab });
                setSchema({ data: "", index: activeTab });
                resetGetFields(activeTab);
                resetPostFields(activeTab);
                setFormData({ data: {}, index: activeTab });
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
              value={canShowSchema ? tabsData[activeTab].schema : undefined}
              onChange={(event: any) => {
                setSchema({ data: event.target.value, index: activeTab });
                resetGetFields(activeTab);
                resetPostFields(activeTab);
                setFormData({ data: {}, index: activeTab });
              }}
            >
              <option value=""></option>
              {canShowSchema
                ? Object.keys(
                  (actsObj as any)[tabsData[activeTab].service][
                    tabsData[activeTab].method
                  ],
                ).map((schema, index) => (
                  <option key={`${activeTab}.${index}---`} value={schema}>
                    {schema}
                  </option>
                ))
                : null}
            </select>
          </div>
          <div className="sidebar__section sidebar__section--act">
            <div className="sidebar__section-heading">select action</div>
            <select
              className="sidebar__select"
              disabled={!canShowAct}
              value={canShowAct ? tabsData[activeTab].act : undefined}
              onChange={(event: any) => {
                const actObj = (actsObj as any)[tabsData[activeTab].service][
                  tabsData[activeTab].method
                ][tabsData[activeTab].schema][event.target.value]["validator"][
                  "schema"
                ];

                formRef && formRef.current && formRef.current.reset();
                setAct({ data: event.target.value, index: activeTab });
                setGetFields({
                  data: actObj["get"]["schema"],
                  index: activeTab,
                });
                setPostFields({
                  data: actObj["set"]["schema"],
                  index: activeTab,
                });
                setFormData({ data: {}, index: activeTab });
              }}
            >
              <option value=""></option>
              {canShowAct
                ? Object.keys(
                  (actsObj as any)[tabsData[activeTab].service][
                    tabsData[activeTab].method
                  ][tabsData[activeTab].schema],
                ).map((schema, index) => (
                  <option key={`${activeTab}.${index}----`} value={schema}>
                    {schema}
                  </option>
                ))
                : null}
            </select>
          </div>
        </div>
      </div>

      {canShowRequestFields && (
        <div className="sidebar sidebar--fields">
          <form ref={formRef} onSubmit={handleSubmit} className="form--fields">
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              SET fields
            </div>
            {Object.keys(tabsData[activeTab].postFields).map((item) => (
              <div className="input-cnt" key={`${activeTab}.${item}-----`}>
                <label htmlFor={item}>
                  {item} :
                </label>
                {tabsData[activeTab].postFields[item]["type"] === "enums"
                  ? (
                    <select
                      className="sidebar__select"
                      value={tabsData[activeTab].formData[`set.${item}`]}
                      onChange={(event: any) => {
                        setFormData({
                          data: {
                            ...tabsData[activeTab].formData,
                            [`set.${item}`]: event.target.value,
                          },
                          index: activeTab,
                        });
                      }}
                    >
                      <option value=""></option>
                      {Object.keys(
                        tabsData[activeTab].postFields[item]["schema"],
                      ).map((schema, index) => (
                        <option
                          key={`${activeTab}.${index}------`}
                          value={schema}
                        >
                          {schema}
                        </option>
                      ))}
                    </select>
                  )
                  : (
                    <input
                      placeholder={item}
                      id={item}
                      value={tabsData[activeTab].formData[`set.${item}`]}
                      name={`set.${item}`}
                      type={tabsData[activeTab].postFields[item]["type"] ===
                          "number"
                        ? "number"
                        : "string"}
                      alt={tabsData[activeTab].postFields[item]["type"]}
                      onChange={handleChange}
                    />
                  )}
              </div>
            ))}
            <div className="sidebar__section-heading sidebar__section-heading--fields">
              GET fields
            </div>

            <div className="input-cnt get-items border-bottom">
              <label>All Items :</label>
              <div className="get-values">
                <span
                  onClick={() => {
                    const copy = changeGetValue(
                      null,
                      "get",
                      tabsData[activeTab].getFields,
                      {},
                    );

                    setFormData({
                      data: { ...tabsData[activeTab].formData, ...copy },
                      index: activeTab,
                    });
                  }}
                >
                </span>
                <span
                  onClick={() => {
                    const copy = changeGetValue(
                      0,
                      "get",
                      tabsData[activeTab].getFields,
                      {},
                    );
                    setFormData({
                      data: {
                        ...tabsData[activeTab].formData,
                        ...copy,
                      },
                      index: activeTab,
                    });
                  }}
                >
                  0
                </span>
                <span
                  onClick={() => {
                    const copy = changeGetValue(
                      1,
                      "get",
                      tabsData[activeTab].getFields,
                      {},
                    );
                    setFormData({
                      data: {
                        ...tabsData[activeTab].formData,
                        ...copy,
                      },
                      index: activeTab,
                    });
                  }}
                >
                  1
                </span>
              </div>
            </div>

            {Object.keys(tabsData[activeTab].getFields).map((item) =>
              tabsData[activeTab].getFields[item].type === "enums"
                ? (
                  <div
                    className="input-cnt get-items"
                    key={`${activeTab}.${item}-------`}
                  >
                    <label htmlFor={item}>{item}:</label>
                    <div className="get-values">
                      <span
                        onClick={() => {
                          const copy = { ...tabsData[activeTab].formData };
                          delete copy[`get.${item}`];
                          setFormData(copy);
                        }}
                      >
                      </span>
                      <span
                        className={tabsData[activeTab]
                            .formData[`get.${item}`] === 0
                          ? "active"
                          : ""}
                        onClick={() => {
                          setFormData({
                            data: {
                              ...tabsData[activeTab].formData,
                              [`get.${item}`]: 0,
                            },
                            index: activeTab,
                          });
                        }}
                      >
                        0
                      </span>
                      <span
                        className={tabsData[activeTab]
                            .formData[`get.${item}`] === 1
                          ? "active"
                          : ""}
                        onClick={() => {
                          setFormData({
                            data: {
                              ...tabsData[activeTab].formData,
                              [`get.${item}`]: 1,
                            },
                            index: activeTab,
                          });
                        }}
                      >
                        1
                      </span>
                    </div>
                  </div>
                )
                : (
                  renderGetFields({
                    getField: tabsData[activeTab].getFields[item],
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
        {tabsData[activeTab].response && (
          <div class="response-detail">
            <div className="response-detail-button_title">
              <p className="response-detail-title">Response</p>
              <div className="response-detail-buttons">
                <div
                  className="btn response-detail-button "
                  onClick={copyRequest}
                >
                  <CopyIcon />
                  <span className="tooltip-text">Copy Request</span>
                </div>
                <div
                  className="btn response-detail-button "
                  onClick={() => {
                    copyResponse;
                  }}
                >
                  <CopyIcon />
                  <span className="tooltip-text">Copy Response</span>
                </div>
              </div>
            </div>
            <div className="response-detail-info">
              <JSONViewer jsonData={tabsData[activeTab].response} />
              {tabsData[activeTab].response &&
                  tabsData[activeTab].response?.success === true
                ? <div className="success"></div>
                : <div className="fail"></div>}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
