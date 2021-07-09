import React, { useState } from "react";
import { Input } from "../styles/styled";

interface Props {
  values: any;
  value: any;
  index: any;
  ke: any;
  register: any;
  mainkey: any;
}
const Show: React.FC<Props> = ({
  mainkey,
  index,
  ke,
  value,
  values,
  register,
}) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  // let a = [false];
  ke = ke + (value === "" ? "" : " ") + value;
  return (
    <>
      {values.props && values.type === "object" ? (
        <>
          {value && (
            <p
              style={{
                display: "flex",
                // marginLeft: index + "rem",
                minWidth: "4rem",
                backgroundColor: "rgb(24,37,46)",
                padding: "1rem",
                borderRadius: "0.4rem",
                marginTop: "1.5rem",
                marginBottom: "0.3rem",
                border: "1px solid rgb(255,168,62)",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  marginRight: "0.5rem",
                  cursor: "pointer",
                  marginTop: "-0.3rem",
                }}
                onClick={() => setCollapse(!collapse)}
              >
                {collapse ? "-" : "+"}
              </span>
              {value}
            </p>
          )}
          <div
            style={collapse ? { display: "none" } : { display: "block" }}
            className={"rainbow" + (index % 4)}
          >
            {Object.keys(values.props).map((val, ind) => {
              return (
                <Show
                  key={ke + " " + value + ind}
                  mainkey={mainkey}
                  register={register}
                  ke={ke}
                  index={index + 1}
                  value={val}
                  values={values.props[val]}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            // height: "a",
            alignItems: "center",
            marginTop: "0.5rem",
            boxSizing: "border-box",
            backgroundColor: "rgb(73,82,97)",
            padding: "0.2rem 0.1rem",
          }}
        >
          <div style={{ padding: "0.6rem", display: "flex" }}>
            {mainkey === "get" ? (
              <>
                <p
                  style={{
                    minWidth: "8rem",
                    margin: "0",
                  }}
                >
                  {value} :
                </p>
                <Input
                  type={values.type === "enum" ? "number" : "text"}
                  name={value}
                  max={1}
                  min={0}
                  {...register(ke + " " + value, { valueAsNumber: true })}
                />
                <span style={{ color: "rgb(145,145,145)", marginLeft: "2rem" }}>
                  value are just 0 or 1
                </span>
              </>
            ) : (
              <>
                <p
                  style={{
                    minWidth: "8rem",
                    margin: "0",
                  }}
                >
                  {value} :
                </p>
                <Input
                  type={values.type === "number" ? "number" : "text"}
                  name={value}
                  {...register(ke + " " + value, {
                    valueAsNumber:
                      values.type === "number" ||
                      (values.type === "enum" &&
                        Array.isArray(values.values) &&
                        values.values.length > 0 &&
                        parseInt(values.values[0]).toString() != "NaN"),
                  })}
                />
                <span
                  style={{
                    color: "rgb(145,145,145)",
                    marginLeft: "2rem",
                  }}
                >
                  {JSON.stringify(values)}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Show;
