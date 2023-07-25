/** @jsx h */
import { Fragment, h, useState, useEffect } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import AddIcon from "./icon/AddIcon.tsx";
import BackIcon from "./icon/BackIcon.tsx";
import DeleteIcon from "./icon/deleteIcon.tsx";
import DownIcon from "./icon/DownIcon.tsx";
import ExportIcon from "./icon/ExportIcon.tsx";
import HelpIcon from "./icon/HelpIcon.tsx";
import ImportIcon from "./icon/ImportIcon.tsx";
import RunIcon from "./icon/RunIcon.tsx";
import UpIcon from "./icon/UpIcon.tsx";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { TRequest } from "./ManagedLesanContext.tsx";

export function E2E({
  baseUrl,
  bodyHeaders,
}: {
  baseUrl: string;
  bodyHeaders?: string;
}) {
  const handleMove = (fromIndex: any, toIndex: any) => {
    if (fromIndex === 0 && toIndex <= 0) {
      return;
    } else {
      const element = e2eFroms[fromIndex];
      e2eFroms.splice(fromIndex, 1);
      e2eFroms.splice(toIndex, 0, element);
      setE2eForms([...e2eFroms]);
    }
  };

  const handleDelete = (fromIndex: any) => {
    const element = e2eFroms[fromIndex];
    e2eFroms.splice(fromIndex, 1);
    setE2eForms([...e2eFroms]);
  };

  const [e2eFroms, setE2eForms] = useState<
    {
      id: string;
      bodyHeaders: string;
      repeat: number;
      captures: { key: string; value: string }[];
    }[]
  >([
    {
      id: uid(),
      bodyHeaders: `
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": ""
  },
  "body": {
    "service": "main",
    "contents": "dynamic",
    "wants": {
    "model": "",
    "act": ""
  },
    "details": {
      "get": {
      },
    "set": {
    }
  }
}
}
            `,
      repeat: 1,
      captures: [],
    },
  ]);

  useEffect(() => {
    if (bodyHeaders) {
      setE2eForms([{ id: uid(), repeat: 1, bodyHeaders, captures: [] }]);
    }
  }, []);

  const [resultView, setResultView] = useState<string>("e2e");
  const [results, setResults] = useState<
    {
      id: string;
      request: Record<string, any>;
      response: Record<string, any>;
    }[]
  >([]);

  const exportForm = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(e2eFroms)
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
      JSON.stringify(results)
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

    for await (const e2eForm of e2eFroms) {
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
      for (let repeat = 0; repeat < e2eForm.repeat; repeat++) {
        jsonSendedRequest = await lesanAPI({
          baseUrl: baseUrl,
          options: body,
        });
        setResults((results) => [
          ...results,
          {
            id: uid(),
            request: { ...body, body: parsedHeaderBody.body },
            response: jsonSendedRequest,
          },
        ]);
      }

      const captures = [...e2eForm.captures].filter(
        (capture) => capture.key && capture.value
      );

      const parsedCapuresValue = captures.map((capture) => {
        const parts = capture.value.split("[");
        const value: (string | number)[] = [];

        parts.forEach((part) => {
          let slicedPart: string | number = part.slice(0, part.indexOf("]"));
          if (!isNaN(Number(slicedPart))) {
            slicedPart = Number(slicedPart);
          }
          value.push(slicedPart);
        });
        value.shift();
        return { key: capture.key, value };
      });

      parsedCapuresValue.forEach((capture) => {
        if (capture.value.length > 0) {
          let getedValue: any = jsonSendedRequest;
          capture.value.forEach((capValue) => {
            getedValue = getedValue[capValue];
          });
          parsedCaptures.add({ key: capture.key, value: getedValue });
        }
      });
    }
  };

  // plus repeat
  const plusRepeatHandler = (index: number) => {
    setE2eForms((e2eForm) => {
      const copy = [...e2eForm];
      copy[index].repeat += 1;
      return [...copy];
    });
  };

  // mines repeat
  const minesRepeatHandler = (index: number) => {
    setE2eForms((e2eForm) => {
      const copy = [...e2eForm];
      if (copy[index].repeat > 0) {
        copy[index].repeat -= 1;
      }
      return [...copy];
    });
  };

  return (
    <div className="e2e modal-content">
      {resultView === "result" ? (
        <Fragment>
          <br />
          <div className="results">
            <div className="results-buttons">
              <button
                className="btn  e2e-back-button"
                onClick={() => {
                  setResults([]);
                  setResultView("e2e");
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
            {results.map((re) => (
              <div key={re.id} className="container-detail">
                <section className="container-re ">
                  <span className="container-re-title">REQUEST</span>
                  <JSONViewer jsonData={re.request} />
                </section>
                <section className="container-re history-response">
                  <span className="container-re-title">RESPONSE</span>
                  <JSONViewer jsonData={re.response} />
                </section>
              </div>
            ))}
          </div>
        </Fragment>
      ) : resultView === "e2e" ? (
        <Fragment>
          <div className="sidebar__section sidebar__section--headers">
            {e2eFroms.map((e2eForm, idx) => (
              <Fragment>
                <div className="sidebar__input-double" key={e2eForm.id}>
                  <div className="sidebar__section-body-heading">
                    {e2eFroms.length > 1 ? (
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
                          className="e2e-move-div"
                          onClick={() => handleDelete(idx)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="sidebar__section-heading">
                      set test body and headers
                    </div>
                    <textarea
                      placeholder="please paste a request body here"
                      value={e2eForm.bodyHeaders}
                      name={`${e2eForm.id}-body`}
                      rows={18}
                      onChange={(e: any) => {
                        setE2eForms((e2eForm) => {
                          const copy = [...e2eForm];
                          copy[idx].bodyHeaders = e.target.value;
                          return [...copy];
                        });
                      }}
                    />
                  </div>

                  <div className="sidebar__section-capture">
                    <div className="sidebar__section-heading">
                      set repeat time
                    </div>
                    <div className="repeat__number">
                      <input
                        placeholder="set repeat number"
                        value={e2eForm.repeat}
                        name={`${e2eForm.id}-repeat`}
                        type="number"
                        onChange={(e: any) => {
                          setE2eForms((e2eForm) => {
                            const copy = [...e2eForm];
                            copy[idx].repeat = e.target.value;
                            return [...copy];
                          });
                        }}
                      />
                      <button
                        className="btn"
                        onClick={() => plusRepeatHandler(idx)}
                      >
                        +
                      </button>
                      <button
                        className="btn"
                        onClick={() => minesRepeatHandler(idx)}
                      >
                        -
                      </button>
                    </div>
                    <div className="sidebar__section-heading">
                      capture variables
                    </div>
                    <button
                      className="btn btn--add"
                      onClick={() => {
                        setE2eForms((e2eForm) => {
                          const copy = [...e2eForm];
                          copy[idx].captures.push({ key: "", value: "" });
                          return copy;
                        });
                      }}
                    >
                      add capture variable item
                    </button>

                    {e2eForm.captures.map((capture, capId) => (
                      <Fragment>
                        <div className="sidebar__section-add-capture">
                          <input
                            placeholder="set a variable name"
                            value={capture.key}
                            onChange={(e: any) => {
                              setE2eForms((e2eForm) => {
                                const copy = [...e2eForm];
                                copy[idx].captures[capId].key = e.target.value;
                                return copy;
                              });
                            }}
                          />
                          <input
                            placeholder="set a value for variable"
                            value={capture.value}
                            onChange={(e: any) => {
                              setE2eForms((e2eForm) => {
                                const copy = [...e2eForm];
                                copy[idx].captures[capId].value =
                                  e.target.value;
                                return copy;
                              });
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
          
          <div className="results-buttons">
            <button
              className="btn  e2e-back-button e2e-export_results-button"
              onClick={() => {
                setE2eForms((e2eForm) => [
                  ...e2eForm,
                  {
                    id: uid(),
                    bodyHeaders: `
{
  "headers": {
    "Content-Type": "application/json",
    "Authorization": ""
  },
  "body": {
    "service": "main",
      "contents": "dynamic",
    "wants": {
      "model": "",
      "act": ""
    },
    "details": {
      "get": {
      },
      "set": {
      }
    }
  }
}
                        `,
                    repeat: 1,
                    captures: [],
                  },
                ]);
              }}
            >
              <AddIcon />
              <span>Add</span>
            </button>
            <button
              className="btn e2e-back-button e2e-run-botton e2e-export_results-button"
              onClick={async () => {
                setResultView("result");
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
              className="btn e2e-back-button e2e-export_results-button"
            >
              <ImportIcon />
              <span>Import</span>
            </label>
            <button
              className="btn e2e-back-button e2e-export_results-button"
              onClick={exportForm}
            >
              <ExportIcon />
              <span>Export</span>
            </button>
            <button
              onClick={() => setResultView("help")}
              className="btn e2e-back-button e2e-export_results-button"
            >
              <HelpIcon />
              <span>Help</span>
            </button>
          </div>
        </Fragment>
      ) : resultView === "help" ? (
        <div className="help">
          {" "}
          <button
            className="btn  e2e-back-button"
            onClick={() => {
              setResultView("e2e");
            }}
          >
            <BackIcon />
            <span>Back</span>
          </button>{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
