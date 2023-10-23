/** @jsx h */
import { repeat } from "https://deno.land/std@0.140.0/bytes/mod.ts";
import { Fragment, h, useState } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { TRequest } from "./context/actionType.ts";
import { e2eFirstInp } from "./context/initials.ts";
import { Help } from "./Help.tsx";
import AddIcon from "./icon/AddIcon.tsx";
import BackIcon from "./icon/BackIcon.tsx";
import DeleteIcon from "./icon/deleteIcon.tsx";
import DownIcon from "./icon/DownIcon.tsx";
import ExportIcon from "./icon/ExportIcon.tsx";
import HelpIcon from "./icon/HelpIcon.tsx";
import Hide from "./icon/Hide.tsx";
import ImportIcon from "./icon/ImportIcon.tsx";
import RunIcon from "./icon/RunIcon.tsx";
import { Show } from "./icon/Show.tsx";
import UpIcon from "./icon/UpIcon.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import InfoIcon from "./icon/InfoIcon.tsx";

export function E2E({ baseUrl }: { baseUrl: string; bodyHeaders?: string }) {
  const { e2eForms, setE2eForms } = useLesan();

  const [show, setShow] = useState(0);

  type TResults = {
    id: string;
    request: Record<string, any>;
    response: Record<string, any>;
    responseTime: number;
  };
  type TSequenceDetail = {
    id: string;
    bodyHeader: string;
    time: number;
    repeat: number;
    success: number;
    fails: number;
    // captures: { key: string; value: string; captured: any }[];
    results: TResults[];
  };
  type TReqDetails = {
    allReqPerformance: number;
    numberRequest: number;
    success: number;
    fails: number;
    sequenceDetail: TSequenceDetail[];
  };
  const initialRequestDetail = {
    allReqPerformance: 0,
    numberRequest: 0,
    success: 0,
    fails: 0,
    sequenceDetail: [],
  };

  const [isShowE2eResponse, setIsShowE2eResponse] = useState<boolean>(true);
  const [isShowE2eButton, setIsShowE2eButton] = useState<boolean>(false);
  const [requestDetail, setRequestDetail] =
    useState<TReqDetails>(initialRequestDetail);

  const handleMove = (fromIndex: any, toIndex: any) => {
    if (fromIndex === 0 && toIndex <= 0) {
      return;
    } else {
      const element = e2eForms[fromIndex];
      e2eForms.splice(fromIndex, 1);
      e2eForms.splice(toIndex, 0, element);
      setE2eForms([...e2eForms]);
    }
  };

  const handleDelete = (fromIndex: any) => {
    e2eForms[fromIndex];
    e2eForms.splice(fromIndex, 1);
    setE2eForms([...e2eForms]);
  };

  const [view, setView] = useState<"help" | "e2e" | "result">("e2e");

  const exportForm = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(e2eForms)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "Configdata.json";

    link.click();
  };

  const jsonFileUpload = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const data = JSON.parse(e.target!.result as string);
      setE2eForms(data);
    };
  };

  const exportResults = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(requestDetail)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  const lesanAPI = async ({
    baseUrl,
    options,
  }: {
    baseUrl: string;
    options: TRequest;
  }) => {
    const fetching = await fetch(`${baseUrl}lesan`, options);
    return await fetching.json();
  };

  const replaceCaptureString = (
    obj: Record<string, any>,
    variablesSet: Set<any>
  ) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        replaceCaptureString(obj[key], variablesSet);
      }

      const value = obj[key];

      if (typeof value === "string" && value.includes("{")) {
        const openBraceIndexes: number[] = [];
        for (let index = 0; index < value.length; index++) {
          if (value[index] === "{") {
            openBraceIndexes.push(index);
          }
        }

        const closeBraceIndexes: number[] = [];
        for (let index = 0; index < value.length; index++) {
          if (value[index] === "}") {
            closeBraceIndexes.push(index);
          }
        }

        const variablesName = openBraceIndexes.map((openBrace, index) => {
          return value.slice(openBrace + 1, closeBraceIndexes[index]);
        });

        variablesName.forEach((variableName) => {
          for (const setValue of variablesSet) {
            if (setValue.key === variableName) {
              obj[key] = obj[key].replace(`{${variableName}}`, setValue.value);
            }
          }
        });
      }
    }
  };

  const runE2eTest = async () => {
    const parsedCaptures = new Set();

    const requestDetail: TReqDetails = {
      allReqPerformance: 0,
      numberRequest: 0,
      success: 0,
      fails: 0,
      sequenceDetail: [],
    };
    const allReqPerformance0 = performance.now();

    for await (const e2eForm of e2eForms) {
      const parsedHeaderBody = JSON.parse(e2eForm.bodyHeaders);

      replaceCaptureString(parsedHeaderBody, parsedCaptures);

      const body: TRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaderBody.headers,
        },
        body: JSON.stringify(parsedHeaderBody.body),
      };

      let jsonSendedRequest: any;

      const sequenceTime0 = performance.now();

      const sequenceDetail: TSequenceDetail = {
        id: uid(),
        bodyHeader: e2eForm.bodyHeaders,
        time: 0,
        repeat: 0,
        success: 0,
        fails: 0,
        results: [],
      };
      for (let repeat = 0; repeat < e2eForm.repeat; repeat++) {
        const tResTime0 = performance.now();
        jsonSendedRequest = await lesanAPI({
          baseUrl: baseUrl,
          options: body,
        });
        const tResTime1 = performance.now();
        sequenceDetail.repeat = sequenceDetail.repeat + 1;
        requestDetail.numberRequest = requestDetail.numberRequest + 1;

        if (jsonSendedRequest.success) {
          sequenceDetail.success = sequenceDetail.success + 1;
          requestDetail.success = requestDetail.success + 1;
        } else {
          sequenceDetail.fails = sequenceDetail.fails + 1;
          requestDetail.fails = requestDetail.fails + 1;
        }

        sequenceDetail.results.push({
          id: uid(),
          request: { ...body, body: parsedHeaderBody.body },
          response: jsonSendedRequest,
          responseTime: tResTime1 - tResTime0,
        });
      }
      sequenceDetail.time = performance.now() - sequenceTime0;

      const captures = [...e2eForm.captures].filter(
        (capture) => capture.key && capture.value
      );

      const parsedCapuresValue = captures.map((capture) => {
        const parts = capture.value.split("[");
        const value: (string | number)[] = [];

        parts.forEach((part: any) => {
          let slicedPart: string | number = part.slice(0, part.indexOf("]"));
          if (!isNaN(Number(slicedPart))) {
            slicedPart = Number(slicedPart);
          }
          value.push(slicedPart);
        });
        value.shift();
        return { key: capture.key, value };
      });
      // let getedValues: any;
      parsedCapuresValue.forEach((capture) => {
        if (capture.value.length > 0) {
          let getedValue: any = jsonSendedRequest;
          capture.value.forEach((capValue) => {
            getedValue = getedValue[capValue];
          });
          parsedCaptures.add({ key: capture.key, value: getedValue });
          // getedValues = [...getedValue, ...e2eForm.captures];
        }
      });

      requestDetail.sequenceDetail.push(sequenceDetail);
    }

    const allReqPerformance1 = performance.now();
    setRequestDetail({
      ...requestDetail,
      allReqPerformance: allReqPerformance1 - allReqPerformance0,
    });
    console.log(requestDetail);
  };

  // plus repeat
  const plusRepeatHandler = (index: number) => {
    const copy = [...e2eForms];
    copy[index].repeat += 1;
    setE2eForms([...copy]);
  };

  // mines repeat
  const minesRepeatHandler = (index: number) => {
    const copy = [...e2eForms];
    if (copy[index].repeat > 0) {
      copy[index].repeat -= 1;
    }
    setE2eForms([...copy]);
  };

  return (
    <div className="e2e modal-content">
      {view === "result" ? (
        <Fragment>
          <br />
          <div className="results">
            <div className="results-buttons">
              <button
                className="btn  e2e-back-button"
                onClick={() => {
                  setRequestDetail(initialRequestDetail);
                  setView("e2e");
                }}
              >
                <BackIcon />
                <span>Back</span>
              </button>
              <button
                className="btn  e2e-back-button e2e-export_results-button"
                onClick={exportResults}
              >
                <ExportIcon />
                <span>Export</span>
              </button>
            </div>
            {/* <div
              className="container-e2e"
              onClick={() => setIsShowE2eResponse(!isShowE2eResponse)}
            >
              <span className="container-header">REQUESTS</span>
              <span className="container-header">
                {isShowE2eResponse ? <Hide /> : <Show />}
              </span>
            </div> */}
          </div>
          {requestDetail.sequenceDetail.map((sequence) => (
            <div key={sequence.id} className="container-detail">
              {isShowE2eResponse ? (
                <Fragment
                // style={{ display: "flex", width: "100%" }}
                >
                  <section className="sequence-re">
                    <div style={{ display: "flex" }}>
                      <span
                        onClick={() => setIsShowE2eResponse(!isShowE2eResponse)}
                      >
                        <InfoIcon />
                      </span>
                      <span className="container-re-title">Body Header</span>
                    </div>
                    <JSONViewer jsonData={JSON.parse(sequence.bodyHeader)} />
                  </section>
                  <section className="sequence-re sequence-response ">
                    <span className="container-re-title">Description</span>
                    <div className="detail-sequence">
                      <p>
                        you send <span>{sequence.repeat}</span> times of this
                        request
                      </p>
                      <p>
                        the avrage time for each request is
                        <span>{sequence.time / sequence.repeat}ms</span>
                      </p>
                      <p>
                        and whole time is
                        <span>{sequence.time}ms</span>
                      </p>
                      <p>
                        this sequence sends
                        <span>{sequence.success}</span> success request and{" "}
                        <span>{sequence.fails}</span> it be fails
                      </p>
                      {/* {sequence.captures.length && (
                    <p>
                      you capture theese in this sequence :
                      {sequence.captures.map((capture) => (
                        <div>
                          <span>{capture.value} as </span>
                          <span>{capture.key} with value of </span>
                        </div>
                      ))}
                    </p>
                  )} */}
                    </div>
                  </section>
                </Fragment>
              ) : (
                <div>
                  {/* {sequence.results.length} */}
                  {sequence.results.map(
                    (re, index) =>
                      show === index && (
                        //  sequence.results.length >1 ? show === index :  (
                        <div
                          style={{ display: "flex", minWidth: "100%" }}
                          id={re.id}
                        >
                          {sequence.results.length > 1 && (
                            <div>
                              <button
                                onClick={() =>
                                  setShow(
                                    show === sequence.results.length - 1
                                      ? 0
                                      : index + 1
                                  )
                                }
                              >
                                plus
                              </button>
                              <button
                                onClick={() =>
                                  setShow(
                                    show === 0
                                      ? sequence.results.length - 1
                                      : index - 1
                                  )
                                }
                              >
                                miner
                              </button>
                            </div>
                          )}
                          <section
                            className="container-re"
                            // style={{ minWidth: "100%", width: "100%" }}
                          >
                            <div style={{ display: "flex" }}>
                              <span
                                onClick={() =>
                                  setIsShowE2eResponse(!isShowE2eResponse)
                                }
                              >
                                <InfoIcon />
                              </span>
                              <span className="container-re-title">
                                REQUEST
                              </span>
                            </div>
                            <JSONViewer jsonData={re.request} />
                          </section>
                          <section
                            className="container-re container-response"
                            // style={{ minWidth: "100%", width: "100%" }}
                          >
                            <span className="container-re-title">RESPONSE</span>
                            <span className="e2e-re-timeNumber-request">
                              {re.responseTime}ms
                            </span>

                            <JSONViewer jsonData={re.response} />
                          </section>
                        </div>
                      )

                    // )
                    //
                    // )
                  )}{" "}
                </div>
              )}
            </div>
          ))}
        </Fragment>
      ) : view === "e2e" ? (
        <Fragment>
          <div className="sidebar__section sidebar__section--headers">
            {e2eForms.map((e2eForm, idx) => (
              <Fragment>
                <div className="sidebar__input-double" key={e2eForm.id}>
                  {e2eForms.length > 1 && (
                    <div className="e2e-move-buttons">
                      <div
                        className="e2e-move-div"
                        onClick={() => handleMove(idx, idx - 1)}
                      >
                        <UpIcon />
                      </div>
                      <div
                        className="e2e-move-div"
                        onClick={() => handleMove(idx, idx + 1)}
                      >
                        <DownIcon />
                      </div>
                      <div
                        className="e2e-move-div e2e-move-close"
                        onClick={() => handleDelete(idx)}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  )}
                  <div className="sidebar__section-body-heading">
                    <div className="sidebar__section-heading">
                      set test body and headers
                    </div>
                    <textarea
                      placeholder="please paste a request body here"
                      value={e2eForm.bodyHeaders}
                      name={`${e2eForm.id}-body`}
                      rows={18}
                      onChange={(e: any) => {
                        const copy = [...e2eForms];
                        copy[idx].bodyHeaders = e.target.value;
                        setE2eForms([...copy]);
                      }}
                    />
                  </div>
                  <div className="sidebar__section-capture">
                    <div className="e2e_sidebar__section-heading">
                      set repeat time
                    </div>
                    <div className="repeat__number">
                      <input
                        className="input"
                        placeholder="set repeat number"
                        value={e2eForm.repeat}
                        name={`${e2eForm.id}-repeat`}
                        type="number"
                        onChange={(e: any) => {
                          const copy = [...e2eForms];
                          copy[idx].repeat = e.target.value;
                          setE2eForms([...copy]);
                        }}
                      />
                      <button
                        className="e2e-back-button e2e-export_results-button"
                        onClick={() => plusRepeatHandler(idx)}
                      >
                        +
                      </button>
                      <button
                        className="e2e-back-button e2e-export_results-button"
                        onClick={() => minesRepeatHandler(idx)}
                      >
                        -
                      </button>
                    </div>
                    <div className="e2e_sidebar__section-heading">
                      capture variables
                    </div>
                    <button
                      className="btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture "
                      onClick={() => {
                        const copy = [...e2eForms];
                        copy[idx].captures.push({ key: "", value: "" });
                        setE2eForms([...copy]);
                      }}
                    >
                      add capture
                    </button>

                    {e2eForm.captures.map((capture, capId) => (
                      <Fragment>
                        <div className="sidebar__section-add-capture">
                          <input
                            className="input"
                            placeholder="set a variable name"
                            value={capture.key}
                            onChange={(e: any) => {
                              const copy = [...e2eForms];
                              copy[idx].captures[capId].key = e.target.value;
                              setE2eForms([...copy]);
                            }}
                          />
                          <input
                            className="input"
                            placeholder="set a value for variable"
                            value={capture.value}
                            onChange={(e: any) => {
                              const copy = [...e2eForms];
                              copy[idx].captures[capId].value = e.target.value;
                              setE2eForms([...copy]);
                            }}
                          />
                        </div>
                        <hr />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <button
            className="btn btn-show-results-buttons "
            onClick={() => setIsShowE2eButton(!isShowE2eButton)}
          >
            show btn
          </button>
          <div className="results-buttons" data-show={isShowE2eButton === true}>
            <button
              className="btn btn-e2e-action e2e-back-button e2e-export_results-button"
              onClick={() => {
                setE2eForms([...e2eForms, e2eFirstInp()]);
              }}
            >
              <AddIcon />
              <span>Add</span>
            </button>
            <button
              className="btn btn-e2e-action e2e-back-button e2e-run-botton e2e-export_results-button"
              onClick={async () => {
                setView("result");
                await runE2eTest();
              }}
            >
              <RunIcon />
              <span>Run E2E Test</span>
            </button>
            <input
              id="actual-btn"
              type="file"
              onChange={jsonFileUpload}
              hidden={true}
            ></input>
            <label
              htmlFor="actual-btn"
              className="btn btn-e2e-action e2e-back-button e2e-export_results-button"
            >
              <ImportIcon />
              <span>Import</span>
            </label>
            <button
              className="btn btn-e2e-action e2e-back-button e2e-export_results-button"
              onClick={exportForm}
            >
              <ExportIcon />
              <span>Export</span>
            </button>
            <button
              onClick={() => setView("help")}
              className="btn btn-e2e-action e2e-back-button e2e-export_results-button"
            >
              <HelpIcon />
              <span>Help</span>
            </button>
          </div>
        </Fragment>
      ) : view === "help" ? (
        <Help setView={setView} />
      ) : (
        ""
      )}
    </div>
  );
}
