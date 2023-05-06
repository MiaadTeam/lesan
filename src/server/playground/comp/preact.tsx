/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { useState } from "https://esm.sh/preact@10.5.15/hooks";

export const Page = (
  { schemasObj, actsObj } = { schemasObj: {}, actsObj: {} },
) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");

  return (
    <div>
      <h1>Current time</h1>
      <p>{new Date().toLocaleString()}</p>

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
    </div>
  );
};
