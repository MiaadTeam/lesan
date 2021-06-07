import React from "react";
import { Input } from "../styles/styled";

interface Props {
  values: any;
  value: any;
  index: any;
  ke: any;
  register: any;
}
const Show: React.FC<Props> = ({ index, ke, value, values, register }) => {
  return (
    <>
      {values.props && values.type === "object" ? (
        <>
          <p
            style={{
              display: "flex",
              marginLeft: index + "rem",
              minWidth: "4rem",
            }}
          >
            {value}
          </p>
          <p style={{ marginLeft: index + "rem", minWidth: "4rem" }}>{"{"}</p>

          {Object.keys(values.props).map((val, ind) => {
            return (
              <Show
                key={ke + " " + value + ind}
                register={register}
                ke={ke + (value === "" ? "" : " ") + value}
                index={index + 1}
                value={val}
                values={values.props[val]}
              />
            );
          })}
          <p style={{ marginLeft: index + "rem", minWidth: "4rem" }}>{"}"}</p>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "2rem",
            alignItems: "center",
          }}
        >
          {ke === "get" ? (
            <div style={{ marginLeft: index + "rem", display: "flex" }}>
              <p
                style={{
                  minWidth: "4rem",
                  margin: "0",
                }}
              >
                {value}
              </p>
              <Input name={value} {...register(ke + " " + value)} />
            </div>
          ) : (
            <>
              <p style={{ marginLeft: index + "rem", minWidth: "4rem" }}>
                {value}
              </p>
              <Input name={value} {...register(ke + " " + value)} />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Show;
