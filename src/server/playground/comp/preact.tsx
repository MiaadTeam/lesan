/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { useState } from "https://esm.sh/preact@10.5.15/hooks";

export const Page = (
  { schemasObj, actsObj } = { schemasObj: {}, actsObj: {} },
) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [selectedAct, setSelectedAct] = useState("");
  const [avalibaleSetFields, setAvalibaleSetFields] = useState([]);
  const [avalibaleGetFields, setAvalibaleGetFields] = useState([]);

  return (
    <div>
      <div>
        <label>
          select service?

          <select
            value={selectedService}
            onChange={(event: any) => setSelectedService(event.target.value)}
          >
            <option value=""></option>
            {Object.keys(actsObj).map((service, index) => (
              <option value={service}>{service}</option>
            ))}
          </select>
        </label>

        <p>selected service is {selectedService}!</p>
      </div>

      <div>
        <label>
          select dynamic or static?

          <select
            value={selectedMethod}
            onChange={(event: any) => setSelectedMethod(event.target.value)}
          >
            <option value=""></option>
            <option value="dynamic">dynamic</option>
            <option value="static">static</option>
          </select>
        </label>

        <p>selected method is {selectedMethod}!</p>
      </div>

      {selectedService && selectedMethod && (
        <div>
          <label>
            select schema?

            <select
              value={selectedSchema}
              onChange={(event: any) => setSelectedSchema(event.target.value)}
            >
              <option value=""></option>
              {Object.keys((actsObj as any)[selectedService][selectedMethod])
                .map(
                  (
                    schema,
                  ) => <option value={schema}>{schema}</option>,
                )}
            </select>
          </label>

          <p>selected schema is {selectedSchema}!</p>
        </div>
      )}

      {selectedService && selectedMethod && selectedSchema && (
        <div>
          <label>
            select act?

            <select
              value={selectedAct}
              onChange={(event: any) => {
                const setArr = [];
                const getArr = [];

                const actObj =
                  (actsObj as any)[selectedService][selectedMethod][
                    selectedSchema
                  ][
                    event.target.value
                  ]["validator"]["schema"];

                /*
                 *  @LOG @DEBUG @WARN
                 *  This log written by ::==> {{ syd }}
                 *
                 *  Please remove your log after debugging
                 */
                console.warn(" ============= ");
                console.group("setObj:  ------ ");
                console.log();
                console.warn({
                  setObj: actObj,
                }, " ------ ");
                console.log();
                console.groupEnd();
                console.warn(" ============= ");

                for (
                  let setKey in actObj["set"]["schema"]
                ) {
                  /*
                   *  @LOG @DEBUG @INFO
                   *  This log written by ::==> {{ syd }}
                   *
                   *  Please remove your log after debugging
                   */
                  console.log(" ============= ");
                  console.group("setKey ------ ");
                  console.log();
                  console.info({ setKey }, " ------ ");
                  console.log();
                  console.groupEnd();
                  console.log(" ============= ");
                  setArr.push({
                    key: setKey,
                    desc: actObj["set"]["schema"][setKey],
                  });
                }

                for (
                  let getKey in actObj["get"]["schema"]
                ) {
                  getArr.push({
                    key: getKey,
                    desc: actObj["get"]["schema"][getKey],
                  });
                }

                setSelectedAct(event.target.value);
                /*
                 *  @LOG @DEBUG @INFO
                 *  This log written by ::==> {{ syd }}
                 *
                 *  Please remove your log after debugging
                 */
                console.log(" ============= ");
                console.group("getArr, setArr ------ ");
                console.log();
                console.info({ getArr, setArr }, " ------ ");
                console.log();
                console.groupEnd();
                console.log(" ============= ");
                setAvalibaleGetFields(getArr as any);
                setAvalibaleSetFields(setArr as any);
              }}
            >
              <option value=""></option>
              {Object.keys(
                (actsObj as any)[selectedService][selectedMethod][
                  selectedSchema
                ],
              )
                .map(
                  (
                    schema,
                  ) => <option value={schema}>{schema}</option>,
                )}
            </select>
          </label>

          <p>selected atc is {selectedAct}!</p>
        </div>
      )}

      {avalibaleSetFields.length > 1 && (
        <div>
          set fields is :
          {avalibaleSetFields.map(setFiled => (
            <input placeholder={(setFiled as any).key} />
          ))}
        </div>
      )}

      {avalibaleGetFields.length > 1 && (
        <div>
          get fields is :
          {avalibaleGetFields.map(getFiled => (
            <input placeholder={(getFiled as any).key} />
          ))}
        </div>
      )}
    </div>
  );
};
