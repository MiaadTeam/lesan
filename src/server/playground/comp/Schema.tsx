/** @jsx h */
import { h, useState, useEffect } from "../reactDeps.ts";
import { uid } from "../utils/uid.ts";
import { JSONViewer } from "./JSONVeiwer.tsx";
import { useLesan } from "./ManagedLesanContext.tsx";
import ExportIcon from "./icon/ExportIcon.tsx";
import HelpIcon from "./icon/HelpIcon.tsx";
import Search from "./icon/Search.tsx";

export const Schema = () => {
  const { schemasObj } = useLesan();
  const [reProduceSchemaObj, setreProduceSchemaObj] = useState<
    Record<string, any>
  >({});

  useEffect(() => {
    const myNewObj: Record<string, any> = {};
    for (const schema in schemasObj) {
      myNewObj[schema] = {
        ...myNewObj[schema],
        pure: schemasObj[schema].pure,
      };
      for (const mainRels in schemasObj[schema].mainRelations) {
        myNewObj[schema] = {
          ...myNewObj[schema],
          mainRelations: {
            ...myNewObj[schema].mainRelations,
            [mainRels]: {
              type: "relation",
              extraDetails: schemasObj[schema].mainRelations[mainRels],
              schema: {
                ...schemasObj[
                  schemasObj[schema].mainRelations[mainRels].schemaName
                ].pure,
              },
            },
          },
        };
      }
      for (const relatedRels in schemasObj[schema].relatedRelations) {
        myNewObj[schema] = {
          ...myNewObj[schema],
          relatedRelations: {
            ...myNewObj[schema].relatedRelations,
            [relatedRels]: {
              type: "relation",
              extraDetails: schemasObj[schema].relatedRelations[relatedRels],
              schema: {
                ...schemasObj[
                  schemasObj[schema].relatedRelations[relatedRels].schemaName
                ].pure,
              },
            },
          },
        };
      }
    }
    setreProduceSchemaObj(myNewObj);
  }, []);

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
            {proceedChildSchema(schemas[schema])}

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
            <p className="schema-title">{childItem}</p>
            <div className="schema-info">
              {" "}
              <p className="schema-title schema-type">
                {" "}
                {childSchema[childItem]["type"]}
              </p>
              <div className="schema-help">
                {childSchema[childItem]["extraDetails"] && <HelpIcon />}
                {childSchema[childItem]["extraDetails"] && (
                  <div className=" tooltip-text">
                    <JSONViewer
                      jsonData={childSchema[childItem]["extraDetails"]}
                    />
                  </div>
                )}
              </div>
              {typeof childSchema[childItem] === "object" &&
                childSchema[childItem].schema !== null && <span>...</span>}
            </div>
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
                  : childSchema[childItem].type === "relation"
                  ? childSchema[childItem].schema
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
      {/* <div className="search-box">
        <input className="input" type="text" placeholder="search..." />
        <span className="search-icon">
          <Search />
        </span>
      </div> */}
      <div className="schema-list">{proceedSchemas(reProduceSchemaObj)}</div>
    </div>
  );
};
