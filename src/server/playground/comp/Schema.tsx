/** @jsx h */
import { getPureFromMainRelations } from "../../../models/schema/getPureFromMainRelations.ts";
import { h, useState } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import ExportIcon from "./icon/ExportIcon.tsx";
import Search from "./icon/Search.tsx";

export const Schema = () => {
  const { schemasObj } = useLesan();

  const exportSchemas = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(schemasObj)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "schemas.json";

    link.click();
  };

  const rainbowClass = [
    "color-1",
    "color-2",
    "color-3",
    "color-4",
    "color-5",
    "color-6",
    "color-7",
  ];

  const proceedSchemas = (schemas: Record<string, any>) => {
    return Object.keys(schemas).map((schema: any) => {
      const newUid = uid();
      return (
        <div className="schema">
          <div
            className="schema-name"
            onClick={() => {
              document.getElementById(newUid)?.classList.toggle("open");
            }}
          >
            <p className="schema-title">{schema}</p>
            <span>...</span>
          </div>
          <div className="proceed-child-container" id={newUid}>
            {proceedChildSchema(schemasObj[schema])}

            {/* {proceedChildSchema(schemasObj[schema]["pure"])} */}
          </div>
        </div>
      );
    });
  };

  const proceedChildSchema = (childSchema: Record<string, any>) => {
    return Object.keys(childSchema).map((childItem: any) => {
      const newUid = uid();
      return (
        <div
          className={`inside-schema ${
            rainbowClass[Math.floor(Math.random() * rainbowClass.length)]
          }`}
        >
          <div
            className={`inside ${
              typeof childSchema[childItem] === "object" &&
              childSchema[childItem].schema !== null &&
              "schema-pointer"
            }`}
            onClick={() => {
              document.getElementById(newUid)?.classList.toggle("open");
            }}
          >
            <p className="schema-title">
              {childItem} {childSchema[childItem]["type"]}
            </p>
            <p className="schema-title schema-type">
              {" "}
              {childSchema[childItem]["type"]}
            </p>
            {typeof childSchema[childItem] === "object" &&
              childSchema[childItem].schema !== null && <span>...</span>}
          </div>
          <div id={newUid} className="proceed-child">
            {typeof childSchema[childItem] === "object" &&
              childSchema[childItem] !== null &&
              childSchema[childItem].schema !== null &&
              proceedChildSchema(
                childSchema[childItem].pure
                  ? childSchema[childItem].pure
                  : childSchema[childItem].relatedRelations
                  ? childSchema[childItem].relatedRelations
                  : childSchema[childItem].mainRelation
                  ? childSchema[childItem].mainRelation
                  : childSchema[childItem]
              )}
            {/* {childSchema[childItem].type === "object" &&
              proceedChildSchema(childSchema[childItem].schema)} */}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="schema-modal">
      <div className="results-buttons">
        <button
          className=" schema-export-button btn e2e-back-button e2e-export_results-button"
          onClick={exportSchemas}
        >
          <ExportIcon />
          <span>Export</span>
        </button>
      </div>
      <div className="search-box">
        <input className="input" type="text" placeholder="search..." />
        <span className="search-icon">
          <Search />
        </span>
      </div>
      <div className="schema-list">{proceedSchemas(schemasObj)}</div>
    </div>
  );
};
