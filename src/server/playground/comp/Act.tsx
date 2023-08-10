/** @jsx h */
import { Fragment, h, useEffect, useState } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import Search from "./icon/Search.tsx";
import { uid } from "../utils/uid.ts";

export default function Act() {
  const { actsObj } = useLesan();

  const rainbowClass = [
    "color-1",
    "color-2",
    "color-3",
    "color-4",
    "color-5",
    "color-6",
    "color-7",
  ];
  const backClass = ["gray", "blue"];

  const proceedActs = (acts: Record<string, any>) => {
    return Object.keys(acts).map((act: any, index) => {
      const newUid = uid();
      return (
        <div className="schema">
          <div
            className="schema-name"
            onClick={() => {
              document.getElementById(newUid)?.classList.toggle("open");
            }}
          >
            <p>{act}</p>
            <span>...</span>
          </div>
          <div className="proceed-child-container" id={newUid}>
            {proceedChildActs(actsObj[act])}
          </div>
        </div>
      );
    });
  };

  const proceedChildActs = (childActs: Record<string, any>) => {
    return Object.keys(childActs).map((childAct: any, index) => {
      const newUid = uid();

      return (
        <div
          className={`inside-schema ${
            rainbowClass[Math.floor(Math.random() * rainbowClass.length)]
          } ${backClass[Math.floor(Math.random() * backClass.length)]}`}
        >
          <div
            className="inside"
            onClick={() => {
              document.getElementById(newUid)?.classList.toggle("open");
            }}
          >
            <p>{childAct}</p>
            {childActs[childAct].type && <p>{childActs[childAct].type}</p>}
            <div>
              {" "}
              {typeof childActs[childAct] === "object" &&
                childActs[childAct].schema !== null && <span>...</span>}
            </div>
          </div>
          <div id={newUid} className="proceed-child">
            {typeof childActs[childAct] === "object" &&
              childActs[childAct] !== null &&
              childActs[childAct].schema !== null &&
              proceedChildActs(
                childActs[childAct].validator
                  ? childActs[childAct].validator.schema
                  : childActs[childAct].schema
                  ? childActs[childAct].schema
                  : childActs[childAct]
              )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="schema-modal">
      <div className="search-box">
        <input className="search-input" type="text" placeholder="search..." />
        <span className="search-icon">
          <Search />
        </span>
      </div>
      <div className="schema-list">{proceedActs(actsObj)}</div>
    </div>
  );
}
