import React, { useState } from "react";
import Tree from "react-d3-tree";
import { PathFunctionOption } from "react-d3-tree/lib/types/common";
import "../index.css";
import "../styles/globals.css";
import { TreeData } from "./TreeData";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

// handleClick(nodeObj, cont) {
//     if(!cont || nodeObj._collapsed)
//     return;
//     const myRef = this.refs.myRef;
//     const parentObj = nodeObj.parent;
//     if(parentObj && myRef) {
//     const nodesToBeCollapsed = parentObj.children.filter(c=> c.id !== nodeObj.id);
//     nodesToBeCollapsed.map((ndObj,index) => {
//     if(!ndObj._collapsed)
//     myRef.handleNodeToggle(ndObj.id, false);
//     });
const createElementDetails = (item: any, index: number) => {
  return Object.keys(item).map((val: any) =>
    Array.isArray(item[val]) ? (
      <>
        <p style={{ marginLeft: `${index + 1}rem` }}>
          {Object.keys(item[val][0])[0]}
        </p>
        {item[val].map((va: any) => {
          return <>{createElementDetails(va, index + 1)}</>;
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
        <p style={{ margin: "0 0.5rem" }}>{item[val]}</p>
        <input style={{ height: "1.5rem" }} />
      </div>
    )
  );
};
interface Props {
  setGraphPage: any;
  data: any;
}
const OrgChartTree: React.FC<Props> = ({ setGraphPage, data }) => {
  const [path, setPath] = useState<PathFunctionOption>("straight");
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div
      id="treeWrapper"
      style={{
        border: "0.1rem solid black",
        width: "100%",
        backgroundColor: "#f8f9fa",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!data ? (
        <div
          style={{
            backgroundColor: "#dc3545",
            width: "50%",
            color: "white",
            height: "5rem",
            borderRadius: "0.3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Please Upload FastestValidator File in PlayGround
          </p>
          <p
            style={{
              fontWeight: "bold",
              color: "#0645AD",
              cursor: "pointer",
              margin: "0",
            }}
            onClick={() => setGraphPage(false)}
          >
            Go to playground
          </p>
        </div>
      ) : (
        <>
          <button className="btn1" onClick={() => setGraphPage(false)}>
            back
          </button>
          <div style={{ display: "flex" }}>
            <button className="btn" onClick={() => setPath("diagonal")}>
              diagonal
            </button>
            <button className="btn" onClick={() => setPath("elbow")}>
              elbow
            </button>
            <button className="btn" onClick={() => setPath("step")}>
              step
            </button>
            <button className="btn" onClick={() => setPath("straight")}>
              straight
            </button>
          </div>
          <Tree
            shouldCollapseNeighborNodes={true}
            // pathClassFunc={getDynamicPathClass}
            // pathClassFunc={() => "rd3t-link"}
            renderCustomNodeElement={({ nodeDatum, toggleNode }: any) => {
              return nodeDatum.__rd3t.depth < 4 ? (
                <>
                  <circle onClick={toggleNode} r="15" />

                  <text
                    className="rd3t-label__title"
                    text-anchor="start"
                    x="40"
                  >
                    {nodeDatum.name}
                  </text>
                </>
              ) : (
                <foreignObject x={-200} width={400} height={550}>
                  <div
                    style={{
                      height: "15rem",
                      overflow: "auto",
                      border: "0.1rem solid",
                      padding: "0.5rem",
                    }}
                    onClick={toggleNode}
                  >
                    {nodeDatum.data.map((valArray: any) => {
                      return (
                        valArray && (
                          <>
                            <p>
                              {" "}
                              {valArray[0] &&
                                Object.keys(valArray[0]) &&
                                Object.keys(valArray[0])}
                            </p>
                            {valArray.map((va: any) => {
                              return <>{createElementDetails(va, 0)}</>;
                            })}
                          </>
                        )
                      );
                      // console.log("a", valArray);
                      // return valArray
                      //   ? valArray.map((valArray1: any) => {
                      //       // console.log("asas", valArray1);
                      //       return createElementDetails(valArray1, 0);
                      //     })
                      //   : {};
                    })}
                  </div>
                </foreignObject>
              );
            }}
            // collapsible={true}
            enableLegacyTransitions={true}
            transitionDuration={300}
            translate={{ x: 575, y: 20 }}
            initialDepth={3}
            depthFactor={500}
            pathFunc={path}
            // ={() => <div>asdass</div>}
            orientation="vertical"
            rootNodeClassName="node__root"
            // branchNodeClassName="node__branch"
            // leafNodeClassName="node__leaf"
            data={TreeData(data)}
            // data={orgChart}
          />
        </>
      )}
    </div>
  );
};
export default OrgChartTree;
