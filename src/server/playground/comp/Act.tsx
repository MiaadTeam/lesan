/** @jsx h */
import { h } from "../reactDeps.ts";
import { useLesan } from "./ManagedLesanContext.tsx";
import Search from "./icon/Search.tsx";
import { uid } from "../utils/uid.ts";
import ExportIcon from "./icon/ExportIcon.tsx";

export function Act() {
  const { actsObj } = useLesan();
  const exportActs = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(actsObj)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "acts.json";

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
            <p className="schema-title">{act}</p>
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

      if (childActs[childAct] || childActs[childAct] === 0) {
        return (
          <div
            className={`inside-schema ${
              rainbowClass[Math.floor(Math.random() * rainbowClass.length)]
            }`}
          >
            <div
              className={`inside ${
                typeof childActs[childAct] === "object" &&
                childActs[childAct].schema !== null &&
                "schema-pointer"
              }`}
              onClick={() => {
                document.getElementById(newUid)?.classList.toggle("open");
              }}
            >
              <p className="schema-title">{childAct}</p>
              {childActs[childAct].type && (
                <p className="schema-title schema-type">
                  {childActs[childAct].type}
                </p>
              )}
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
      }
    });
  };

  return (
    <div className="schema-modal">
      {" "}
      <div className="results-buttons">
        <button
          className=" schema-export-button btn e2e-back-button e2e-export_results-button"
          onClick={exportActs}
        >
          <ExportIcon />
          <span>Export</span>
        </button>
      </div>
      {/* <div className="search-box">
        <input className="input" type="text" placeholder="search..." />
        <span className="search-icon">
          <Search />
        </span>
      </div> */}
      <div className="schema-list">{proceedActs(actsObj)}</div>
    </div>
  );
}
