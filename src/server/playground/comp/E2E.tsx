/** @jsx h */
import { Fragment, h, useState } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { TRequest } from "./context/actionType.ts";
import { e2eFirstInp } from "./context/initials.ts";
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
import { useLesan } from "./ManagedLesanContext.tsx";

export function E2E({ baseUrl }: { baseUrl: string; bodyHeaders?: string }) {
  const { e2eForms, setE2eForms } = useLesan();

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
  const [results, setResults] = useState<
    {
      id: string;
      request: Record<string, any>;
      response: Record<string, any>;
    }[]
  >([]);

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
                  setResults([]);
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
            {results.map((re) => (
              <div key={re.id} className="container-detail">
                <section className="container-re ">
                  <span className="container-re-title">REQUEST</span>
                  <JSONViewer jsonData={re.request} />
                </section>
                <section className="container-re container-response">
                  <span className="container-re-title">RESPONSE</span>
                  <JSONViewer jsonData={re.response} />
                </section>
              </div>
            ))}
          </div>
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
                      add capture variable item
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
          <div className="results-buttons">
            <button
              className="btn  e2e-back-button e2e-export_results-button"
              onClick={() => {
                setE2eForms([...e2eForms, e2eFirstInp()]);
              }}
            >
              <AddIcon />
              <span>Add</span>
            </button>
            <button
              className="btn e2e-back-button e2e-run-botton e2e-export_results-button"
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
              onClick={() => setView("help")}
              className="btn e2e-back-button e2e-export_results-button"
            >
              <HelpIcon />
              <span>Help</span>
            </button>
          </div>
        </Fragment>
      ) : view === "help" ? (
        <div className="help">
          {" "}
          <button
            className="btn  e2e-back-button"
            onClick={() => {
              setView("e2e");
            }}
          >
            <BackIcon />
            <span>Back</span>
          </button>
          <section className="e2e_help-content">
            <p>
              With E2E Test, you can test the whole application by sending a
              sequence of HTTP requests.
            </p>
            <p>
              In the image below, you can see the first view of the E2E test
              modal page, which contains a button bar at the top and two
              separate requests.
            </p>
            <img
              src="https://github.com/MiaadTeam/lesan/assets/6236123/829b3288-3d69-4fd0-a1fc-22d011b8d079"
              alt="full screen e2e"
              className="e2e_help--fullscreen-img"
            />

            <hr />

            <p>
              In the button bar, you have these buttons:
              <img
                src="https://github.com/MiaadTeam/lesan/assets/6236123/4edd6034-d6b2-4de9-8c43-8f2fe511aa14"
                alt="full screen e2e"
                className="e2e_help--fullscreen-img"
              />
              <ul>
                <li>Add: This button adds one request section.</li>
                <li>
                  Run E2E Test: This button runs all requests and shows their
                  results.
                </li>
                <li>
                  Import: This button stands for importing an E2E config in JSON
                  format.
                </li>
                <li>
                  Export: This button stands for exporting an existing E2E
                  config in JSON format.
                </li>
                <li>
                  Help: This button switches to the help of the E2E modal page.
                </li>
              </ul>
            </p>

            <hr />

            <div>
              <p>Each request section have 2 side</p>
              <img
                src="https://github.com/MiaadTeam/lesan/assets/6236123/fa9ceb35-21dd-493a-82cc-cd7391f5fc79"
                alt="full screen e2e"
                className="e2e_help--fullscreen-img"
              />

              <hr />

              <section className="e2e_help--section---right-side">
                <p>
                  The right side is a set of configurations for the repeat time
                  of each request and capturing variables of the request
                  response. In the Capture Variables section, you can add a pair
                  of tuple inputs for the key name of the capture variable and
                  its value. You can capture the value of a capture variable
                  with braces syntax. For example, if you get back this response
                  from a request:
                  <pre>
                    {"{\n"}
                    {"  body: [\n"}
                    {"    {\n"}
                    {"      _id: 64c6839c50adc3cb65726934,\n"}
                    {"      name: همدان,\n"}
                    {"      enName: Hamedan,\n"}
                    {"      abb: HM\n"}
                    {"    }\n"}
                    {"  ],\n"}
                    {"  success: true\n"}
                    {"  }\n"}
                    {"}\n"}
                  </pre>
                  You can capture _id with [body][0][_id] or for name:
                  [body][0][name].
                </p>
                <img
                  src="https://github.com/MiaadTeam/lesan/assets/6236123/1cea1db3-44c2-49b5-8739-a9afa8a6e1fa"
                  alt="full screen e2e"
                  className="e2e_help--fullscreen-img"
                />
              </section>

              <hr />

              <section className="e2e_help--section---right-side">
                <img
                  src="https://github.com/MiaadTeam/lesan/assets/6236123/5c9899fa-8be6-42d1-8f4f-8fd965264645"
                  alt="full screen e2e"
                  className="e2e_help--fullscreen-img"
                />
                <p>
                  The left side is a text area for writing headers and the body
                  of the request in JSON format. In this text area, you can use
                  a text parser to implement the captured value you captured
                  before inside these symbols {"{}"}.
                </p>
              </section>

              <hr />

              <p>
                Also, we have some buttons on the top right side of each request
                section. With these buttons, you can move up and down and delete
                requests.
                <img
                  src="https://github.com/MiaadTeam/lesan/assets/6236123/900a5b98-3e7f-460a-a756-403ecaedcf86"
                  alt="full screen e2e"
                  className="e2e_help--fullscreen-img"
                />
              </p>
            </div>

            <hr />

            <div>
              <p>
                After clicking on the Run E2E Test button, you can see the
                result of each test. Also, in the result view, you can export
                the results in JSON format.
              </p>
              <img
                src="https://github.com/MiaadTeam/lesan/assets/6236123/8c367965-a1b7-40b8-8638-60d2d0ea2609"
                alt="full screen e2e"
                className="e2e_help--fullscreen-img"
              />
            </div>

            <hr />

            <div>
              <p>
                Additionally, you can go to the E2E Test modal page from the
                main page by clicking on the Test icon inside the response
                header section. This way, you can add a new test section and
                prepopulate the Header and Body text areas with the sent request
                from the main page.
                <img
                  src="https://github.com/MiaadTeam/lesan/assets/6236123/74dc9e93-2b41-4840-afc1-f4e8e83c9889"
                  alt="full screen e2e"
                  className="e2e_help--fullscreen-img"
                />
              </p>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
