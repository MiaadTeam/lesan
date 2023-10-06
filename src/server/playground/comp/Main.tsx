/** @jsx h */
import { Fragment, h, useRef, useState } from "../reactDeps.ts";
import { createNestedObjectsFromKeys } from "../utils/createNestedObjectsFromKeys.ts";
import { uid } from "../utils/uid.ts";
import { E2eForm, MODAL_TYPES, TRequest } from "./context/actionType.ts";
import { ConvertMilliseconds } from "../utils/convertMilliseconds.ts";
import CopyIcon from "./icon/CopyIcon.tsx";
import RunTestIcon from "./icon/RunTestIcon.tsx";
import SuccessIcon from "./icon/SuccessIcon.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import { Selected } from "./Selected.tsx";
import MultiSelect from "./MultiSelect.tsx";

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
    setSchema,
    setAct,
    setPostFields,
    setGetFields,
    setFormData,
    setHistory,
    setResponse,
    resetGetFields,
    resetPostFields,
    addE2eForm,
    setModal,
  } = useLesan();

  const [active, setActive] = useState(false);

  const changeGetValue = (
    value: 0 | 1 | null,
    keyname: string,
    getObj: Record<string, any>,
    returnObj: Record<string, any>
  ) => {
    for (const key in getObj) {
      getObj[key].type === "enums"
        ? (returnObj[`${keyname}.${key}`] = value)
        : changeGetValue(
            value,
            `${keyname}.${key}`,
            getObj[key].schema,
            returnObj
          );
    }
    return returnObj;
  };

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

  const renderPostFields = ({
    key,
    field,
    isMultiEnum = false,
    formData,
  }: {
    key: string;
    field: Record<string, any>;
    isMultiEnum?: boolean;
    formData?: any;
  }): h.JSX.Element => {
    if (field.type === "array") {
      return renderPostFields({
        key,
        formData,
        field: field["schema"],
        isMultiEnum: true,
      });
    } else if (field["type"] === "enums" && isMultiEnum) {
      return (
        <MultiSelect
          options={Object.keys(field["schema"]).map((schemaKey) => ({
            label: schemaKey,
            value: field["schema"][schemaKey],
          }))}
          onChange={(options) => {
            const value = options.map((item) => item.value);
            setFormData({
              data: {
                ...formData,
                [`set.${key}`]: value,
              },
              index: activeTab,
            });
            localStorage.setItem("localTabsData", JSON.stringify(tabsData));
          }}
        ></MultiSelect>
      );
    } else if (field["type"] === "enums") {
      return (
        <Selected
          onClickItem={(value: string) => {
            setFormData({
              data: {
                ...formData,
                [`set.${key}`]: value,
              },
              index: activeTab,
            });
            localStorage.setItem("localTabsData", JSON.stringify(tabsData));
          }}
          incomeActiveItem={formData[`set.${key}`]}
          items={Object.keys(field["schema"])}
        />
      );
    } else {
      return (
        <input
          className="input"
          placeholder={key}
          id={key}
          value={formData[`set.${key}`]}
          name={`set.${key}`}
          type={field["type"] === "number" ? "number" : "string"}
          alt={field["type"]}
          onChange={handleChange}
        />
      );
    }
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
        getField["schema"][item].type === "enums" ? (
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
              ></span>
              <span
                className={
                  tabsData[activeTab].formData[`get.${keyName}.${item}`] === 0
                    ? "active"
                    : ""
                }
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
                className={
                  tabsData[activeTab].formData[`get.${keyName}.${item}`] === 1
                    ? "active"
                    : ""
                }
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
        ) : (
          renderGetFields({
            getField: getField["schema"][item],
            keyName: `${keyName}.${item}`,
            margin: margin + 1,
          })
        )
      )}
    </div>
  );

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
        model: tabsData[activeTab].schema,
        act: tabsData[activeTab].act,
        details,
      }),
    };
    return { body };
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const sendRequest = new Date().toLocaleDateString();

    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 450);

    const t0 = performance.now();
    const jsonSendedRequest = await lesanAPI({
      baseUrl: urlAddress,
      options: requestFunction().body,
    });
    const t1 = performance.now();
    const tookTime = t1 - t0;

    /* event.target.reset(); */
    /* setFormData({}); */

    setResponse({ data: { ...jsonSendedRequest, tookTime }, index: activeTab });

    const newHistory = [
      {
        request: {
          ...requestFunction().body,
          body: JSON.parse(requestFunction().body.body),
        },
        response: { ...jsonSendedRequest, tookTime },
        id: uid(),
        reqDate: sendRequest,
      },
      ...history,
    ];
    setHistory(newHistory);
    localStorage.setItem("localHistory", JSON.stringify(newHistory));

    localStorage.setItem("localTabsData", JSON.stringify(tabsData));
  };

  const canShowRequestFields =
    tabsData[activeTab].service &&
    tabsData[activeTab].schema &&
    tabsData[activeTab].postFields &&
    tabsData[activeTab].getFields &&
    tabsData[activeTab].act;

  const canShowSchema = tabsData[activeTab].service;

  const canShowAct = tabsData[activeTab].service && tabsData[activeTab].schema;

  const copyResponse = () => {
    const response = JSON.stringify(tabsData[activeTab].response);
    navigator.clipboard.writeText(response);
  };

  const copyRequest = () => {
    const request: any = requestFunction();
    console.log(request);
    request.body.body = JSON.parse(request.body.body);
    navigator.clipboard.writeText(JSON.stringify(request));
  };

  const runE2eRequest = () => {
    const request: any = requestFunction();
    request.body.body = JSON.parse(request.body.body);
    const { method, ...rest } = request.body;
    const newE2eForm: E2eForm = {
      id: uid(),
      bodyHeaders: JSON.stringify({ ...rest }, null, 2),
      repeat: 1,
      captures: [],
    };
    addE2eForm(newE2eForm);
    setModal(MODAL_TYPES.E2E_TEST);
  };

  const onClickItem = (
    item: string,
    type: "service" | "method" | "schema" | "action"
  ) => {
    if (type === "service") {
      setService({
        data: item,
        index: activeTab,
      });
      setSchema({ data: "", index: activeTab });
    }
    if (type === "method") {
      setSchema({ data: "", index: activeTab });
    }
    if (type === "schema") {
      setSchema({ data: item, index: activeTab });
    }
    setAct({ data: "", index: activeTab });
    resetGetFields(activeTab);
    resetPostFields(activeTab);

    if (type === "action") {
      const actObj = (actsObj as any)[tabsData[activeTab].service][
        tabsData[activeTab].schema
      ][item]["validator"]["schema"];

      formRef && formRef.current && formRef.current.reset();
      setAct({ data: item, index: activeTab });
      setGetFields({
        data: actObj["get"]["schema"],
        index: activeTab,
      });
      setPostFields({
        data: actObj["set"]["schema"],
        index: activeTab,
      });
    }

    setFormData({ data: {}, index: activeTab });
    localStorage.setItem("localTabsData", JSON.stringify(tabsData));
  };

  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebar__sections-wrapper">
          <div className="sidebar__section sidebar__section--services">
            <div className="sidebar__section-heading">select services</div>
            <Selected
              onClickItem={(item: string) => onClickItem(item, "service")}
              items={Object.keys(actsObj)}
              incomeActiveItem={
                tabsData[activeTab].service ? tabsData[activeTab].service : null
              }
            />
          </div>

          <div className="sidebar__section sidebar__section--schema">
            <div
              onClick={() => console.log(canShowSchema)}
              className="sidebar__section-heading"
            >
              select schema
            </div>
            <Selected
              canShow={!canShowSchema}
              onClickItem={(item: string) => onClickItem(item, "schema")}
              items={
                canShowSchema
                  ? Object.keys((actsObj as any)[tabsData[activeTab].service])
                  : []
              }
              incomeActiveItem={
                tabsData[activeTab].schema ? tabsData[activeTab].schema : null
              }
            />
          </div>

          <div className="sidebar__section sidebar__section--act">
            <div className="sidebar__section-heading">select action</div>
            <Selected
              canShow={!canShowAct}
              onClickItem={(item: string) => onClickItem(item, "action")}
              items={
                canShowAct
                  ? Object.keys(
                      (actsObj as any)[tabsData[activeTab].service][
                        tabsData[activeTab].schema
                      ]
                    )
                  : []
              }
              incomeActiveItem={
                tabsData[activeTab].act ? tabsData[activeTab].act : null
              }
            />
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
                <label htmlFor={item}>{item} :</label>
                {renderPostFields({
                  key: item,
                  field: tabsData[activeTab].postFields[item],
                  formData: tabsData[activeTab].formData,
                })}
                {/* {tabsData[activeTab].postFields[item]["type"] === "enums" ? (
                  <Selected
                    onClickItem={(clickedItem: string) => {
                      setFormData({
                        data: {
                          ...tabsData[activeTab].formData,
                          [`set.${item}`]: clickedItem,
                        },
                        index: activeTab,
                      });
                      localStorage.setItem(
                        "localTabsData",
                        JSON.stringify(tabsData)
                      );
                    }}
                    incomeActiveItem={
                      tabsData[activeTab].formData[`set.${item}`]
                    }
                    items={Object.keys(
                      tabsData[activeTab].postFields[item]["schema"]
                    )}
                  />
                ) : (
                  <input
                    className="input"
                    placeholder={item}
                    id={item}
                    value={tabsData[activeTab].formData[`set.${item}`]}
                    name={`set.${item}`}
                    type={
                      tabsData[activeTab].postFields[item]["type"] === "number"
                        ? "number"
                        : "string"
                    }
                    alt={tabsData[activeTab].postFields[item]["type"]}
                    onChange={handleChange}
                  />
                )} */}
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
                      {}
                    );

                    setFormData({
                      data: { ...tabsData[activeTab].formData, ...copy },
                      index: activeTab,
                    });
                  }}
                ></span>
                <span
                  onClick={() => {
                    const copy = changeGetValue(
                      0,
                      "get",
                      tabsData[activeTab].getFields,
                      {}
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
                      {}
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
              tabsData[activeTab].getFields[item].type === "enums" ? (
                <div
                  className="input-cnt get-items"
                  key={`${activeTab}.${item}-------`}
                >
                  <label htmlFor={item}>{item}:</label>
                  <div className="get-values">
                    <span
                      onClick={() => {
                        setFormData({
                          data: {
                            ...tabsData[activeTab].formData,
                            [`get.${item}`]: null,
                          },
                          index: activeTab,
                        });
                      }}
                    ></span>
                    <span
                      className={
                        tabsData[activeTab].formData[`get.${item}`] === 0
                          ? "active"
                          : ""
                      }
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
                      className={
                        tabsData[activeTab].formData[`get.${item}`] === 1
                          ? "active"
                          : ""
                      }
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
              ) : (
                renderGetFields({
                  getField: tabsData[activeTab].getFields[item],
                  keyName: item,
                  margin: 0,
                })
              )
            )}
            <div class="wrapper">
              <button class="send-button" data-active={active}>
                <span>Send</span>
                <div class="successe">
                  <SuccessIcon />
                </div>
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
                  onClick={() => copyRequest()}
                >
                  <CopyIcon />
                  <span className="tooltip-text">Copy Request</span>
                </div>
                <div
                  className="btn response-detail-button "
                  onClick={() => {
                    copyResponse();
                  }}
                >
                  <CopyIcon />
                  <span className="tooltip-text">Copy Response</span>
                </div>
                <div
                  className="btn response-detail-button "
                  onClick={() => {
                    runE2eRequest();
                  }}
                >
                  <RunTestIcon />
                  <span className="tooltip-text">Run E2E Test</span>
                </div>
              </div>
            </div>
            <div className="response-detail-info">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <JSONViewer
                  jsonData={{
                    body: tabsData[activeTab].response?.body,
                    success: tabsData[activeTab].response?.success,
                  }}
                />
              </div>

              <span className="response-took">
                took:
                {ConvertMilliseconds(tabsData[activeTab].response?.tookTime!)}
              </span>
              {tabsData[activeTab].response &&
              tabsData[activeTab].response?.success === true ? (
                <div className="success"></div>
              ) : (
                <div className="fail"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};
