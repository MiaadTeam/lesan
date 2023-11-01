/** @jsx h */
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
import ImportIcon from "./icon/ImportIcon.tsx";
import RunIcon from "./icon/RunIcon.tsx";
import UpIcon from "./icon/UpIcon.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import { SequenceSlider } from "./SequenceSlider.tsx";

export type TResults = {
  id: string;
  request: Record<string, any>;
  response: Record<string, any>;
  responseTime: number;
};

export type captureType = {
  key: string;
  value: string;
  captured?: any;
  sequenceIdx?: number;
  model?: string;
  act?: string;
};

export type TSequenceDetail = {
  id: string;
  bodyHeader: string;
  time: number;
  repeat: number;
  success: number;
  fails: number;
  bestTime: { resultIdx: number; time: number };
  worstTime: { resultIdx: number; time: number };
  captures: captureType[];
  usedCaptures: captureType[];
  results: TResults[];
};

export type TReqDetails = {
  allReqPerformance: number;
  numberRequest: number;
  success: number;
  fails: number;
  bestTime: {
    sequenceIdx: number;
    resultIdx: number;
    time: number;
    act: string;
    model: string;
  };
  worstTime: {
    sequenceIdx: number;
    resultIdx: number;
    time: number;
    act: string;
    model: string;
  };
  sequenceDetail: TSequenceDetail[];
  allCaptureItems: captureType[];
};

export function E2E({ baseUrl }: { baseUrl: string; bodyHeaders?: string }) {
  const { e2eForms, setE2eForms } = useLesan();

  const initialRequestDetail: TReqDetails = {
    allReqPerformance: 0,
    numberRequest: 0,
    success: 0,
    fails: 0,
    bestTime: {
      sequenceIdx: 0,
      resultIdx: 0,
      time: Number.MAX_SAFE_INTEGER,
      act: "",
      model: "",
    },
    worstTime: { sequenceIdx: 0, resultIdx: 0, act: "", model: "", time: 0 },
    sequenceDetail: [],
    allCaptureItems: [],
  };

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
    variablesSet: Set<any>,
    returnCaptures: captureType[]
  ) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        replaceCaptureString(obj[key], variablesSet, returnCaptures);
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
              returnCaptures.push({
                key: obj[key],
                value: obj[key].replace(`{${variableName}}`, setValue.value),
              });
              obj[key] = obj[key].replace(`{${variableName}}`, setValue.value);
            }
          }
        });
      }
    }
    return returnCaptures;
  };

  const runE2eTest = async () => {
    const parsedCaptures = new Set<captureType>();

    for await (const e2eForm of e2eForms) {
      const parsedHeaderBody = JSON.parse(e2eForm.bodyHeaders);

      const usedCaptures = replaceCaptureString(
        parsedHeaderBody,
        parsedCaptures,
        []
      );

      const findInParsedCaptures = (value: string, set: Set<captureType>) => {
        for (const item of set) if (item.value === value) return item;
      };

      const body: TRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaderBody.headers,
        },
        body: JSON.stringify(parsedHeaderBody.body),
      };

      let jsonSendedRequest: any;

      const sequnceId = uid();
      for (let repeat = 0; repeat < e2eForm.repeat; repeat++) {
        const tResTime0 = performance.now();
        jsonSendedRequest = await lesanAPI({
          baseUrl: baseUrl,
          options: body,
        });
        const tResPerformance = performance.now() - tResTime0;

        const resultId = uid();
        const newResult = {
          id: resultId,
          request: { ...body, body: parsedHeaderBody.body },
          response: jsonSendedRequest,
          responseTime: tResPerformance,
        };

        // console.log("parsedCaptures is ", { parsedCaptures });
        setRequestDetail((preReqDetails) => {
          const sequnces = preReqDetails.sequenceDetail;
          const findedSequnceIdx = sequnces.findIndex(
            (sq) => sq.id === sequnceId
          );
          let resultIdx = 1;
          if (findedSequnceIdx !== -1) {
            sequnces[findedSequnceIdx].results.push(newResult);
            resultIdx = sequnces[findedSequnceIdx].results.length;
            sequnces[findedSequnceIdx].bestTime =
              sequnces[findedSequnceIdx].bestTime.time < tResPerformance
                ? sequnces[findedSequnceIdx].bestTime
                : { resultIdx, time: tResPerformance };
            sequnces[findedSequnceIdx].worstTime =
              sequnces[findedSequnceIdx].worstTime.time > tResPerformance
                ? sequnces[findedSequnceIdx].worstTime
                : { resultIdx, time: tResPerformance };
            if (jsonSendedRequest.success) {
              sequnces[findedSequnceIdx].success =
                sequnces[findedSequnceIdx].success + 1;
            } else {
              sequnces[findedSequnceIdx].fails =
                sequnces[findedSequnceIdx].fails + 1;
            }
            sequnces[findedSequnceIdx].time =
              sequnces[findedSequnceIdx].time + tResPerformance;
            sequnces[findedSequnceIdx].repeat =
              sequnces[findedSequnceIdx].repeat + 1;
          } else {
            sequnces.push({
              id: sequnceId,
              bodyHeader: e2eForm.bodyHeaders,
              time: tResPerformance,
              repeat: 1,
              success: jsonSendedRequest.success ? 1 : 0,
              fails: jsonSendedRequest.success ? 0 : 1,
              bestTime: { resultIdx, time: tResPerformance },
              worstTime: { resultIdx, time: tResPerformance },
              captures: e2eForm.captures.map(({ key, value }) => ({
                key,
                value,
                sequenceIdx: sequnces.length,
                model: parsedHeaderBody.body.model,
                act: parsedHeaderBody.body.act,
              })),
              usedCaptures: usedCaptures.map(({ key, value }) => {
                const findedInsideParsedCapture = findInParsedCaptures(
                  value,
                  parsedCaptures
                );
                return {
                  key,
                  value,
                  captured: findedInsideParsedCapture?.captured,
                  sequenceIdx: findedInsideParsedCapture?.sequenceIdx,
                  model: findedInsideParsedCapture?.model,
                  act: findedInsideParsedCapture?.act,
                };
              }),
              results: [newResult],
            });
          }

          return {
            allReqPerformance:
              preReqDetails.allReqPerformance + tResPerformance,
            numberRequest: preReqDetails.numberRequest + 1,
            success: jsonSendedRequest.success
              ? preReqDetails.success + 1
              : preReqDetails.success,
            fails: jsonSendedRequest.success
              ? preReqDetails.fails
              : preReqDetails.fails + 1,
            bestTime:
              preReqDetails.bestTime.time < tResPerformance
                ? preReqDetails.bestTime
                : {
                    resultIdx,
                    sequenceIdx: sequnces.length,
                    act: parsedHeaderBody.body.act,
                    model: parsedHeaderBody.body.model,
                    time: tResPerformance,
                  },
            worstTime:
              preReqDetails.worstTime.time > tResPerformance
                ? preReqDetails.worstTime
                : {
                    resultIdx,
                    sequenceIdx: sequnces.length,
                    act: parsedHeaderBody.body.act,
                    model: parsedHeaderBody.body.model,
                    time: tResPerformance,
                  },
            sequenceDetail: sequnces,
            allCaptureItems: Array.from(parsedCaptures),
          };
        });
      }

      const captures = [...e2eForm.captures].filter(
        (capture) => capture.key && capture.value
      );

      const parsedCapuresValue = captures.map((capture) => {
        const parts = capture.value.split("[");
        const parsedValue: (string | number)[] = [];

        parts.forEach((part: any) => {
          let slicedPart: string | number = part.slice(0, part.indexOf("]"));
          if (!isNaN(Number(slicedPart))) {
            slicedPart = Number(slicedPart);
          }
          parsedValue.push(slicedPart);
        });
        parsedValue.shift();
        return { key: capture.key, parsedValue, value: capture.value };
      });
      // let getedValues: any;
      parsedCapuresValue.forEach((capture) => {
        if (capture.parsedValue.length > 0) {
          let getedValue: any = jsonSendedRequest;
          capture.parsedValue.forEach((capValue) => {
            getedValue = getedValue[capValue];
          });
          parsedCaptures.add({
            key: capture.key,
            value: getedValue,
            captured: capture.value,
            act: parsedHeaderBody.body.act,
            model: parsedHeaderBody.body.model,
            sequenceIdx: requestDetail.sequenceDetail.length - 1,
          });
          // getedValues = [...getedValue, ...e2eForm.captures];
        }
      });
    }
  };

  // plus repeat
  const plusRepeatHandler = (index: number) => {
    const copy = [...e2eForms];
    console.log("copy", copy[index].repeat);
    copy[index].repeat = +copy[index].repeat + 1;
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
    <div className="e2e-container">
      {view === "result" ? (
        <div className="e2e-container--sequence-container">
          <div className="results-buttons">
            <button
              className="btn  e2e-back-button"
              onClick={() => {
                document.getElementById("modal")?.scroll({
                  top: 0,
                  behavior: "smooth",
                });
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
          <div className="e2e-container--sequence-container--information-container">
            <span className="information-container-label">Information</span>
            <div className="information-container--request">
              <span className="information-container-label">Requests</span>{" "}
              <div className="information-container--request--sections">
                <p className="information-container--request--sections--item">
                  All Request Count:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.numberRequest}
                  </span>{" "}
                  times
                </p>{" "}
                <p className="information-container--request--sections--item">
                  {" "}
                  All Request Time:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.allReqPerformance}
                  </span>{" "}
                  ms
                </p>
              </div>
              <div className="information-container--request--sections">
                <p className="information-container--request--sections--item">
                  All <span className="e2e-success">Success</span> Request:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.success}{" "}
                  </span>{" "}
                  times
                </p>
                <p className="information-container--request--sections--item">
                  All <span className="e2e-fail">Fails</span> Request :{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.fails}{" "}
                  </span>
                  times
                </p>
              </div>
            </div>
            <div className="information-container--times">
              <span className="information-container-label">Times</span>{" "}
              <ul className="information-container--times--sections">
                <li>
                  {" "}
                  <span className="e2e-best">Best </span> Request Time:{" "}
                  <span className="e2e-best">
                    {requestDetail.bestTime.time}{" "}
                  </span>
                  ms{" "}
                </li>
                <li>
                  {" "}
                  Seqeunce Index:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.bestTime.sequenceIdx}{" "}
                  </span>
                </li>
                <li>
                  {" "}
                  Request Index:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.bestTime.resultIdx}
                  </span>{" "}
                </li>
                <li>
                  Model:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.bestTime.model}{" "}
                  </span>{" "}
                </li>
                <li>
                  Act:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.bestTime.act}{" "}
                  </span>
                </li>
              </ul>
              <ul className="information-container--times--sections">
                <li>
                  Worst Request Time:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.worstTime.time}
                  </span>{" "}
                  ms{" "}
                </li>
                <li>
                  {" "}
                  Seqeunce Index:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.worstTime.sequenceIdx}{" "}
                  </span>
                </li>
                <li>
                  {" "}
                  Request Index:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.worstTime.resultIdx}{" "}
                  </span>
                </li>
                <li>
                  Model:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.worstTime.model}
                  </span>
                </li>
                <li>
                  act:{" "}
                  <span className="information-container--request--sections--item--content">
                    {requestDetail.worstTime.act}
                  </span>
                </li>
              </ul>
            </div>
            {requestDetail.allCaptureItems.length > 0 && (
              <div className="information-container--captures">
                <span className="information-container-label">
                  Captures Information
                </span>{" "}
                {requestDetail.allCaptureItems.map((ci) => (
                  <ul className="information-container--captures--sections">
                    <span className="information-container-label">
                      {ci.key}
                    </span>
                    <li>
                      Captured From:{" "}
                      <span className="information-container--request--sections--item--content">
                        {ci.captured}
                      </span>
                    </li>
                    <li>
                      Value Of{" "}
                      <span className="information-container--request--sections--item--content">
                        : {ci.value}
                      </span>
                    </li>
                    <li>
                      Model :{" "}
                      <span className="information-container--request--sections--item--content">
                        {ci.model}
                      </span>
                    </li>
                    <li>
                      Act :{" "}
                      <span className="information-container--request--sections--item--content">
                        {ci.act}
                      </span>
                    </li>
                    <li>
                      Captured Inside Sequnce Index:{" "}
                      <span className="information-container--request--sections--item--content">
                        {ci.sequenceIdx}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>

          <div className="e2e-sequesnce-wrapper">
            {requestDetail.sequenceDetail.map((sequence) => {
              return <SequenceSlider sequence={sequence} />;
            })}
          </div>
        </div>
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
                        min={0}
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
