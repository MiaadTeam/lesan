import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import JSONPretty from "react-json-pretty";
import { makeObjectData } from "./function";

interface Props {
  data: any;
  toggleNode: any;
  parent: any;
  port: string;
  header: string;
}

const createElementDetails = (
  item: any,
  index: number,
  name: string,
  register: any,
  detail: string
) => {
  return Object.keys(item).map((val: any) =>
    Array.isArray(item[val].value) ? (
      <>
        <p style={{ marginLeft: `${index + 2}rem` }}>
          {Object.keys(item[val].value[0])[0]}
        </p>
        {item[val].value.map((va: any) => {
          return (
            <>
              {createElementDetails(
                va,
                index + 1,
                name + " " + Object.keys(va)[0],
                register,
                detail
              )}
            </>
          );
        })}
      </>
    ) : (
      <div
        style={{
          marginLeft: `${index + 1}rem`,
          display: "flex",
          marginTop: "0.5rem",
        }}
      >
        <p style={{ margin: "0 1rem", minWidth: "6rem" }}>{item[val].value}</p>

        <input
          {...register(
            name + " " + item[val].value,
            detail === "get"
              ? { valueAsNumber: true }
              : {
                  valueAsNumber:
                    item[val].type === "number" ||
                    (item[val].type === "enum" &&
                      Array.isArray(item[val].value) &&
                      item[val].value.length > 0 &&
                      parseInt(item[val].value[0]).toString() != "NaN"),
                }
          )}
          style={{ height: "1.5rem" }}
        />
      </div>
    )
  );
};
const Leaf: React.FC<Props> = ({ data, toggleNode, parent, header, port }) => {
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    watch,
    unregister,
    reset,
  } = useForm();
  const onSubmit3 = (data: any) => {
    let contents;
    let model;
    let doit;
    let myObject: any = {};
    Object.keys(data).map((key: any) => {
      if (data[key] === "" || data[key].toString() === "NaN") {
        delete data[key];
      } else {
        contents = key.split(" ")[0];
        model = key.split(" ")[1];
        doit = key.split(" ")[2];

        myObject = {
          ...myObject,
          [key.split(contents + " " + model + " " + doit)[1].trim()]: data[key],
        };
      }
    });

    let dataCustom = makeObjectData(myObject);

    const link = port
      ? `http://127.0.0.1:${port}/funql`
      : `http://127.0.0.1:6005/funql`;
    console.log({
      link,
      dataCustom,
      header,
    });
    axios
      .post(
        link,
        {
          contents: contents,
          details: dataCustom,
          wants: {
            model: model ? model : "",
            doit: doit ? doit : "",
          },
        },
        { headers: header }
      )
      .then(function (response) {
        setResult(JSON.stringify(response.data.body));
      })
      .catch(function (error) {
        console.log(error.response, "err");
        // error && setResult("you have errors");
        error &&
          error.response &&
          setResult(JSON.stringify(error.response.data));
      });
  };
  const [result, setResult] = useState<string>(""); //this state is for displaying the request result

  return (
    <>
      {result ? (
        <foreignObject x="-10rem" width={"44rem"} height={300}>
          <div>
            <button className="btn" onClick={() => setResult("")}>
              back
            </button>
            <JSONPretty id="json-pretty" data={result}></JSONPretty>
          </div>
        </foreignObject>
      ) : (
        <foreignObject x="-10rem" width={"44rem"} height={300}>
          <form
            onSubmit={handleSubmit3(onSubmit3)}
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "20rem",
                display: "flex",
                width: "4rem",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <button
                onClick={handleSubmit3(onSubmit3)}
                style={{
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  color: "white",
                  cursor: "pointer",
                  border: "solid white 0.1rem",
                  backgroundColor: "#1183ca",
                }}
              >
                play
              </button>
              <button
                style={{
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  color: "white",
                  cursor: "pointer",
                  margin: "1rem 0",
                  border: "solid white 0.1rem",
                  backgroundColor: "#ca6c87",
                }}
              >
                config
              </button>
            </div>

            {data.map((da: any, index: number) => {
              return (
                <div
                  style={{
                    height: "300",
                    overflow: "auto",
                    borderRadius: "0.5rem",
                    width: "18rem",
                    border: "0.1rem solid",
                    padding: "0.5rem",
                  }}
                  onClick={toggleNode}
                >
                  <p>
                    {da && da[0] && Object.keys(da[0]) && Object.keys(da[0])[0]}
                  </p>
                  {da &&
                    Array.isArray(da) &&
                    da.map((valArray: any) => {
                      return (
                        valArray && (
                          <>
                            {
                              <>
                                {createElementDetails(
                                  valArray,
                                  0,
                                  parent + " " + Object.keys(valArray)[0],
                                  register3,
                                  Object.keys(valArray)[0].split(" ")[0]
                                )}
                              </>
                            }
                          </>
                        )
                      );
                    })}
                </div>
              );
            })}
          </form>
        </foreignObject>
      )}
    </>
  );
};
export default Leaf;
