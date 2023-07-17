/** @jsx h */
import { Fragment, h, useState } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { TRequest } from "./ManagedLesanContext.tsx";

/* const sampleE2eForm = [{ */
/*   body: { */
/*     service: "main", */
/*     contents: "dynamic", */
/*     wants: { */
/*       model: "city", */
/*       act: "getCities", */
/*     }, */
/*     details: { */
/*       get: { */
/*         _id: 1, */
/*         name: 1, */
/*         enName: 1, */
/*         abb: 1, */
/*         province: { */
/*           _id: 1, */
/*           name: 1, */
/*           enName: 1, */
/*           abb: 1, */
/*         }, */
/*         orgs: { */
/*           _id: 1, */
/*           name: 1, */
/*           address: 1, */
/*         }, */
/*       }, */
/*       set: {}, */
/*     }, */
/*   }, */
/*   repeat: 2, */
/*   capture: { */
/*     cityId: "$['body'][0]['_id']", */
/*     cityName: "$['body'][0]['name']", */
/*   }, */
/* }]; */

export function E2E({
  configUrl,
}: {
  configUrl: (address: string) => void;
}) {
  const [e2eFroms, setE2eForms] = useState<{
    id: string;
    bodyHeaders: string;
    repeat: number;
    capture: { key: string; value: string }[];
  }[]>([]);
  const [urlAddress, setUrlAddress] = useState("");

  const lesanAPI = ({
    baseUrl,
    options,
  }: {
    baseUrl: string;
    options: TRequest;
  }) => fetch(`${baseUrl}lesan`, options).then((res) => res.json());

  const runE2eTest = () => {
    e2eFroms.map(async (e2eForm) => {
      const parsedHeaderBody = JSON.parse(e2eForm.bodyHeaders);

      /*
       *  @LOG @DEBUG @INFO
       *  This log written by ::==> {{ syd }}
       *
       *  Please remove your log after debugging
       */
      console.log(" ============= ");
      console.group("parsedHeaderBody ------ ");
      console.log();
      console.info({ parsedHeaderBody }, " ------ ");
      console.log();
      console.groupEnd();
      console.log(" ============= ");

      const body: TRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedHeaderBody.body),
      };

      const jsonSendedRequest = await lesanAPI({
        baseUrl: "http://localhost:8000/",
        options: body,
      });

      /*
       *  @LOG @DEBUG @INFO
       *  This log written by ::==> {{ syd }}
       *
       *  Please remove your log after debugging
       */
      console.log(" ============= ");
      console.group("jsonSendedRequest ------ ");
      console.log();
      console.info({ jsonSendedRequest }, " ------ ");
      console.log();
      console.groupEnd();
      console.log(" ============= ");
    });
  };

  return (
    <div className="e2e modal-content">
      <button
        className="btn btn--add"
        onClick={() => {
          setE2eForms(
            e2eForm => [...e2eForm, {
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
      "get": {},
      "set": {}
    }
  }
}
`,
              repeat: 1,
              capture: [],
            }],
          );
        }}
      >
        add +
      </button>

      <div className="sidebar__section sidebar__section--headers">
        {e2eFroms.map((e2eForm, idx) => (
          <Fragment>
            <div className="sidebar__input-double" key={e2eForm.id}>
              <div className="sidebar__section-heading">
                set test body and headers
              </div>
              <textarea
                placeholder="please paste a request body here"
                value={e2eForm.bodyHeaders}
                name={`${e2eForm.id}-body`}
                rows={18}
                onChange={(e: any) => {
                  setE2eForms(e2eForm => {
                    const copy = [...e2eForm];
                    copy[idx].bodyHeaders = e.target.value;
                    return [...copy];
                  });
                }}
              />
              <div className="sidebar__section-heading">
                set repeat time
              </div>
              <input
                placeholder="set repeat number"
                value={e2eForm.repeat}
                name={`${e2eForm.id}-repeat`}
                type="number"
                onChange={(e: any) => {
                  setE2eForms(e2eForm => {
                    const copy = [...e2eForm];
                    copy[idx].repeat = e.target.value;
                    return [...copy];
                  });
                }}
              />

              <div className="sidebar__section-heading">
                capture variables
              </div>
              <button
                className="btn btn--add"
                onClick={() => {
                  setE2eForms(e2eForm => {
                    const copy = [...e2eForm];
                    copy[idx].capture.push({ key: "", value: "" });
                    return copy;
                  });
                }}
              >
                add capture variable item
              </button>
              {e2eForm.capture.map((capture, capId) => (
                <Fragment>
                  <input
                    placeholder="set a variable name"
                    value={capture.key}
                    onChange={(e: any) => {
                      setE2eForms(e2eForm => {
                        const copy = [...e2eForm];
                        copy[idx].capture[capId].key = e.target.value;
                        return copy;
                      });
                    }}
                  />
                  <input
                    placeholder="set a value for variable"
                    value={capture.value}
                    onChange={(e: any) => {
                      setE2eForms(e2eForm => {
                        const copy = [...e2eForm];
                        copy[idx].capture[capId].value = e.target.value;
                        return copy;
                      });
                    }}
                  />
                  <hr />
                </Fragment>
              ))}
            </div>
            <hr />
            <hr />
          </Fragment>
        ))}
      </div>
      <button
        className="btn btn--add"
        onClick={() => {
          runE2eTest();
        }}
      >
        Run E2E Test
      </button>
    </div>
  );
}
