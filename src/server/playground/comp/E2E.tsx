/** @jsx h */
import { Fragment, h, useState, useRef } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
import { E2eForm, TRequest } from "./context/actionType.ts";
import { e2eFirstInp } from "./context/initials.ts";
import { Help } from "./Help.tsx";
import AddIcon from "./icon/AddIcon.tsx";
import BackIcon from "./icon/BackIcon.tsx";
import DeleteIcon from "./icon/DeleteIcon.tsx";
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

  const handleDuplicate = (fromIndex: any) => {
    const newForm = { ...e2eForms[fromIndex], id: uid() };
    setE2eForms([
      ...e2eForms.slice(0, fromIndex),
      newForm,
      ...e2eForms.slice(fromIndex, e2eForms.length),
    ]);
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
    variablesSet: Set<captureType>,
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
          if (variableName.startsWith("faker")) {
            const parsedFaker = variableName.split(".");
            const callParsedFaker = (faker as any)[parsedFaker[1]][
              parsedFaker[2]
            ]();
            returnCaptures.push({
              key: variableName,
              value: callParsedFaker,
            });
            obj[key] = obj[key].replace(`{${variableName}}`, callParsedFaker);
          }
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

      const body: TRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaderBody.headers,
        },
        body: JSON.stringify(parsedHeaderBody.body),
      };

      const findInParsedCaptures = (value: string, set: Set<captureType>) => {
        for (const item of set) if (item.value === value) return item;
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
                sequenceIdx: sequnces.length + 1,
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
                  sequenceIdx:
                    findedInsideParsedCapture?.sequenceIdx ||
                    findedInsideParsedCapture?.sequenceIdx === 0
                      ? findedInsideParsedCapture?.sequenceIdx + 1
                      : undefined,
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

  const handeE2eFormDetails = (
    idx: number,
    fieldName: keyof E2eForm,
    value: any
  ) => {
    const copy = [...e2eForms];
    (copy[idx] as any)[fieldName] = value;
    setE2eForms([...copy]);
  };

  const Ref = useRef<any>();
  const handleClick = (id: any) =>
    Ref.current.childNodes[id - 1].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div className="e2e-container">
      {view === "result" ? (
        <div className="e2e-container--sequence-container">
          <div className="results-buttons--back-export">
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
                  <span className="e2e-best">Best</span> Request Time:{" "}
                  <span className="e2e-best">
                    {requestDetail.bestTime.time}{" "}
                  </span>
                  ms{" "}
                </li>
                <li>
                  {" "}
                  Seqeunce Number:{" "}
                  <span
                    onClick={() => {
                      handleClick(requestDetail.bestTime.sequenceIdx);
                    }}
                    className="information-container--request--sections--item--content e2e-sequensce-number"
                  >
                    {requestDetail.bestTime.sequenceIdx}{" "}
                  </span>
                </li>
                <li>
                  {" "}
                  Request Number:{" "}
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
                  Seqeunce Number:{" "}
                  <span
                    onClick={() => {
                      handleClick(requestDetail.worstTime.sequenceIdx);
                    }}
                    className="information-container--request--sections--item--content e2e-sequensce-number"
                  >
                    {requestDetail.worstTime.sequenceIdx}{" "}
                  </span>
                </li>
                <li>
                  {" "}
                  Request Number:{" "}
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
                  <ul
                    className="information-container--captures--sections"
                    key={uid()}
                  >
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
                      Captured Inside Sequnce Number:{" "}
                      <span className="information-container--request--sections--item--content">
                        {ci.sequenceIdx}
                      </span>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>

          <div className="e2e-sequesnce-wrapper" ref={Ref}>
            {requestDetail.sequenceDetail.map((sequence, idx) => {
              return <SequenceSlider sequence={sequence} index={idx} />;
            })}
          </div>
        </div>
      ) : view === "e2e" ? (
        <Fragment>
          <div className="sidebar__section sidebar__section--headers">
            {e2eForms.map((e2eForm, idx) => (
              <Fragment key={e2eForm.id}>
                <div className="sidebar__input-double" key={e2eForm.id}>
                  <div className="e2e-move-buttons">
                    <div
                      className="e2e-move-div"
                      onClick={() => handleDuplicate(idx)}
                    >
                      <AddIcon />
                    </div>
                    {e2eForms.length > 1 && (
                      <Fragment>
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
                      </Fragment>
                    )}
                  </div>
                  <div className="sidebar__section-body-heading">
                    <div className="sidebar__section-heading">
                      set test body and headers
                    </div>
                    <textarea
                      placeholder="please paste a request body here"
                      value={e2eForm.bodyHeaders}
                      name={`${e2eForm.id}-body`}
                      rows={18}
                      onChange={(e: any) =>
                        handeE2eFormDetails(idx, "bodyHeaders", e.target.value)
                      }
                    />
                  </div>
                  <div className="sidebar__section-capture">
                    <div className="e2e_sidebar__section-heading">
                      set repeat time
                    </div>
                    <div className="repeat__number">
                      <input
                        className="input"
                        min={1}
                        placeholder="set repeat number"
                        value={e2eForm.repeat}
                        name={`${e2eForm.id}-repeat`}
                        type="number"
                        onChange={(e: any) =>
                          handeE2eFormDetails(
                            idx,
                            "repeat",
                            Math.abs(e.target.value)
                          )
                        }
                      />
                      <button
                        className="e2e-back-button e2e-export_results-button"
                        onClick={() =>
                          handeE2eFormDetails(
                            idx,
                            "repeat",
                            e2eForms[idx].repeat + 1
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="e2e-back-button e2e-export_results-button"
                        onClick={() =>
                          handeE2eFormDetails(
                            idx,
                            "repeat",
                            e2eForms[idx].repeat > 2
                              ? e2eForms[idx].repeat - 1
                              : 1
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                    <div className="e2e_sidebar__section-heading">
                      capture variables
                    </div>
                    <button
                      className="btn btn--add e2e-back-button e2e-export_results-button e2e-add-capture "
                      onClick={() =>
                        handeE2eFormDetails(idx, "captures", [
                          ...e2eForms[idx].captures,
                          { key: "", value: "" },
                        ])
                      }
                    >
                      add capture
                    </button>

                    {e2eForm.captures.map((capture, capId) => (
                      <Fragment key={`${e2eForm.id}-${capId}`}>
                        <div
                          className="sidebar__section-add-capture"
                          style={{ position: "relative" }}
                        >
                          <span
                            className="section-add-capture__delete-button"
                            onClick={() =>
                              handeE2eFormDetails(idx, "captures", [
                                ...e2eForms[idx].captures.slice(0, capId),
                                ...e2eForms[idx].captures.slice(
                                  capId + 1,
                                  e2eForms[idx].captures.length
                                ),
                              ])
                            }
                            style={{ position: "absolute", zIndex: "2" }}
                          >
                            <DeleteIcon />
                          </span>
                          <input
                            className="input"
                            placeholder="set a variable name"
                            value={capture.key}
                            onChange={(e: any) =>
                              handeE2eFormDetails(idx, "captures", [
                                ...e2eForms[idx].captures.slice(0, capId),
                                {
                                  key: e.target.value,
                                  value: e2eForms[idx].captures[capId].value,
                                },
                                ...e2eForms[idx].captures.slice(
                                  capId + 1,
                                  e2eForms[idx].captures.length
                                ),
                              ])
                            }
                            // onChange={(e: any) => {
                            //   const copy = [...e2eForms];
                            //   copy[idx].captures[capId].key = e.target.value;
                            //   setE2eForms([...copy]);
                            // }}
                          />
                          <input
                            className="input"
                            placeholder="set a value for variable"
                            value={capture.value}
                            onChange={(e: any) =>
                              handeE2eFormDetails(idx, "captures", [
                                ...e2eForms[idx].captures.slice(0, capId),
                                {
                                  key: e2eForms[idx].captures[capId].key,
                                  value: e.target.value,
                                },
                                ...e2eForms[idx].captures.slice(
                                  capId + 1,
                                  e2eForms[idx].captures.length
                                ),
                              ])
                            }
                            // onChange={(e: any) => {
                            //   const copy = [...e2eForms];
                            //   copy[idx].captures[capId].value =
                            //     e.target.value;
                            //   setE2eForms([...copy]);
                            // }}
                          />
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {
            <button
              className="btn btn-show-results-buttons "
              onClick={() => setIsShowE2eButton(!isShowE2eButton)}
            >
              show btn
            </button>
          }
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
            <a
              href="https://miaadteam.github.io/lesan/playground.html"
              target="_blank"
              className="btn btn-e2e-action e2e-back-button e2e-export_results-button"
            >
              <HelpIcon />
              <span>Help</span>
            </a>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
