/** @jsx h */
// import { StateUpdater } from "https://esm.sh/v118/preact@10.5.15/hooks/src/index.js";
import { StateUpdater, h, useState } from "../reactDeps.ts";
import BackIcon from "./icon/BackIcon.tsx";

interface IHelpProps {
    setView: StateUpdater<"help" | "e2e" | "result">;
}

export const Help = ({setView}: IHelpProps) => {
    return (
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
    )
}