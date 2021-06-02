import React from "react";
import { Input } from "../../styles/styled";

interface Props {
  values: any;
  value: any;
  index: any;
  key: any;
  register: any;
}
const Show: React.FC<Props> = ({ index, key, value, values, register }) => {
  return (
    <>
      {values.props && values.type === "object" ? (
        <>
          {
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
              <p style={{ marginLeft: index + "rem", minWidth: "4rem" }}>
                {"{"}
              </p>
            </>
          }
          {Object.keys(values.props).map((val, ind) => {
            return (
              <Show
                register={register}
                key={key}
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
          key={value + index}
          style={{
            display: "flex",
            height: "2rem",
            alignItems: "center",
          }}
        >
          {key === "get" ? (
            <div style={{ marginLeft: index + "rem", display: "flex" }}>
              <p
                style={{
                  minWidth: "4rem",
                  margin: "0",
                }}
              >
                {value}
              </p>
              <Input name={value} {...register(key + " " + value)} />
            </div>
          ) : (
            <>
              <p style={{ marginLeft: index + "rem", minWidth: "4rem" }}>
                {value}
              </p>
              <Input name={value} {...register(key + " " + value)} />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Show;
