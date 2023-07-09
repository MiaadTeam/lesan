/** @jsx h */
import { h, Fragment, FunctionComponent } from "https://esm.sh/preact@10.5.15";
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
import ArrowDownIcon from "../Icons/ArrowDownIcon.tsx";
import CloseIcon from "../Icons/CloseIcon.tsx";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
}

const MultiSelect: FunctionComponent<MultiSelectProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [unselectedOptions, setUnselectedOptions] = useState<Option[]>(options);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (selectedOption: Option) => {
    if (selectedOptions.includes(selectedOption)) {
      const filteredSelectedOptions = selectedOptions.filter(
        (option) => option.value !== selectedOption.value
      );
      setSelectedOptions(filteredSelectedOptions);
      setUnselectedOptions([...unselectedOptions, selectedOption]);
    } else {
      const filteredUnselectedOptions = unselectedOptions.filter(
        (option) => option.value !== selectedOption.value
      );
      setSelectedOptions([...selectedOptions, selectedOption]);
      setUnselectedOptions(filteredUnselectedOptions);
    }
  };

  const resetOptions = () => {
    setSelectedOptions([]);
    setUnselectedOptions(options);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="multi-select__wrapper">
      <div className="multi-select__field" onClick={toggleDropdown}>
        <div className="multi-select__selected-item-wrapper">
          {selectedOptions.map((item) => (
            <div className="multi-select__selected-item" key={item}>
              <div className="multi-select__selected-item-text">
                {item.label}
              </div>
              <div
                className="multi-select__selected-item-btn"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionChange(item);
                }}
              >
                x
              </div>
            </div>
          ))}
        </div>
        <div className="multi-select__icons-wrapper">
          <div
            className="multi-select__close-icon-wrapper"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              resetOptions();
            }}
          >
            <CloseIcon className="multi-select__close-icon" />
          </div>
          <div className="multi-select__arrow-icon-wrapper" role="button">
            <ArrowDownIcon className="multi-select__arrow-icon" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="multi-select__options">
          {unselectedOptions.length ? (
            unselectedOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionChange(option)}
                className="multi-select__option"
              >
                <div className="multi-select__option-label">{option.label}</div>
              </div>
            ))
          ) : (
            <div className="multi-select__option--no-option">No Options!</div>
          )}
        </div>
      )}
    </div>
  );
};

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

  const configUrl = (address?: string) => {
    address && setUrlAddress(address);

    setService("");
    setMethod("");
    setSchema("");
    resetGetFields();
    resetPostFields();
    setFormData({});

    getSchemasAPI({ baseUrl: address ? address : urlAddress }).then(
      ({ schemas, acts }) => {
        setActsObj(acts);
        setSchemasObj(schemas);
      }
    );
  };

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

    const generateFormData = (
      formData: Record<string, any>,
      returnFormData: Record<string, any>,
      keyname: string
    ) => {
      for (const key in formData) {
        typeof formData[key] === "object"
          ? generateFormData(
              formData[key],
              returnFormData,
              keyname ? `${keyname}.${key}` : key
            )
          : (returnFormData[`${keyname}.${key}`] = formData[key]);
      }
      return returnFormData;
    };

    const historyFromData = generateFormData(request.body.details, {}, "");

    setFormData(historyFromData);

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
    <div
      style={{ marginLeft: `${margin + 1}px` }}
      className="sidebar__section_container"
    >
      <div className="sidebar__section-heading--subfields">{keyName}</div>
      {Object.keys(getField["schema"]).map((item) =>
        getField["schema"][item].type === "enums" ? (
          <div className="input-cnt get-items" key={item}>
            <label htmlFor={item}>
              {keyName}.{item}:
            </label>
            <div className="get-values">
              <span
                onClick={() => {
                  const copy = { ...formData };
                  delete copy[`get.${keyName}.${item}`];
                  setFormData(copy);
                }}
              ></span>
              <span
                className={
                  formData[`get.${keyName}.${item}`] === 0 ? "active" : ""
                }
                onClick={() => {
                  setFormData({
                    ...formData,
                    [`get.${keyName}.${item}`]: 0,
                  });
                }}
              >
                0
              </span>
              <span
                className={
                  formData[`get.${keyName}.${item}`] === 1 ? "active" : ""
                }
                onClick={() => {
                  setFormData({
                    ...formData,
                    [`get.${keyName}.${item}`]: 1,
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

  const renderPostFields = ({
    key,
    field,
    isMultiEnum = false,
  }: {
    key: string;
    field: Record<string, any>;
    isMultiEnum?: boolean;
  }): h.JSX.Element => {
    if (field.type === "array") {
      return renderPostFields({
        field: field["schema"],
        key,
        isMultiEnum: true,
      });
    }
    if (field["type"] === "enums" && isMultiEnum) {
      return (
        <MultiSelect
          // value={formData[`set.${key}`]}
          // onChange={(e: any) => {
          //   setFormData({
          //     ...formData,
          //     [`set.${key}`]: e.target.value,
          //   });
          // }}
          options={Object.keys(field["schema"]).map((schema) => ({
            label: schema,
            value: schema,
          }))}
        ></MultiSelect>
      );
    }
    return field["type"] === "enums" ? (
      <select
        className="sidebar__select"
        value={formData[`set.${key}`]}
        onChange={(event: any) => {
          setFormData({
            ...formData,
            [`set.${key}`]: event.target.value,
          });
        }}
      >
        <option value=""></option>
        {Object.keys(field["schema"]).map((schema) => (
          <option value={schema}>{schema}</option>
        ))}
      </select>
    ) : (
      <input
        placeholder={key}
        id={key}
        value={formData[`set.${key}`]}
        name={`set.${key}`}
        type={field["type"] === "number" ? "number" : "string"}
        alt={field["type"]}
        onChange={handleChange}
      />
    );
  };

  const createNestedObjectsFromKeys = (
    obj: Record<string, any>
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
                {renderPostFields({
                  field: postFields[item],
                  key: item,
                })}
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
                    const copy = changeGetValue(null, "get", getFields, {});
                    setFormData({ ...formData, ...copy });
                  }}
                ></span>
                <span
                  onClick={() => {
                    const copy = changeGetValue(0, "get", getFields, {});
                    setFormData({
                      ...formData,
                      ...copy,
                    });
                  }}
                >
                  0
                </span>
                <span
                  onClick={() => {
                    const copy = changeGetValue(1, "get", getFields, {});
                    setFormData({
                      ...formData,
                      ...copy,
                    });
                  }}
                >
                  1
                </span>
              </div>
            </div>

            {Object.keys(getFields).map((item) =>
              getFields[item].type === "enums" ? (
                <div className="input-cnt get-items">
                  <label htmlFor={item}>{item}:</label>
                  <div className="get-values">
                    <span
                      onClick={() => {
                        const copy = { ...formData };
                        delete copy[`get.${item}`];
                        setFormData(copy);
                      }}
                    ></span>
                    <span
                      className={formData[`get.${item}`] === 0 ? "active" : ""}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          [`get.${item}`]: 0,
                        });
                      }}
                    >
                      0
                    </span>
                    <span
                      className={formData[`get.${item}`] === 1 ? "active" : ""}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          [`get.${item}`]: 1,
                        });
                      }}
                    >
                      1
                    </span>
                  </div>
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
