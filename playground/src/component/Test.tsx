import React, { createElement, useRef, useState } from "react";
import "../styles/globals.css";
import "../index.css";
import Tree from "react-d3-tree";
import { TreeData } from "./TreeData";
import createElementDetails from "./CreateElementDetails";
import { PathFunctionOption } from "react-d3-tree/lib/types/common";

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
        height: "100%",
      }}
    >
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
          return nodeDatum.__rd3t.depth < 3 ? (
            <>
              <circle onClick={toggleNode} r="15" />

              <text className="rd3t-label__title" text-anchor="start" x="40">
                {nodeDatum.name}
              </text>
            </>
          ) : (
            <foreignObject x={-150} width={300} height={550}>
              <div
                style={{
                  height: "15rem",
                  overflow: "auto",
                  border: "0.1rem solid",
                  padding: "0.5rem",
                }}
                onClick={toggleNode}
              >
                {/* {nodeDatum.data &&
                  nodeDatum.data.map((valArray: any) => {
                    // console.log("a", valArray);
                    return valArray
                      ? valArray.map((valArray1: any) => {
                          // console.log("asas", valArray1);
                          return createElementDetails(valArray1, 0);
                        })
                      : {};
                  })} */}
              </div>
            </foreignObject>
          );
        }}
        // collapsible={true}
        enableLegacyTransitions={true}
        transitionDuration={300}
        translate={{ x: 575, y: 20 }}
        initialDepth={2}
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
    </div>
  );
};
export default OrgChartTree;
