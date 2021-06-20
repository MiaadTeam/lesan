import React from "react";

export default function createElementDetails(value: any, index: number) {
  // console.log(value);
  return Object.keys(value).map((val: any) => {
    return (
      <>
        {Array.isArray(value[val]) ? (
          <>
            <p>{val}</p>
            {value[val].map((val1: any) =>
              createElementDetails(val1, index + 1)
            )}
          </>
        ) : (
          <div style={{ display: "flex", marginLeft: index + "rem" }}>
            <p>{value[val]}</p>
          </div>
        )}
      </>
    );
  });
}
