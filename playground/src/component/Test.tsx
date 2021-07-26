import React, { useState } from "react";
import Tree from "react-d3-tree";
import { PathFunctionOption } from "react-d3-tree/lib/types/common";
import { useForm } from "react-hook-form";
import "../index.css";
import "../styles/globals.css";
import Leaf from "./Leaf";
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

interface Props {
  setGraphPage: any;
  data: any;
  port: string;
  header: string;
}

const OrgChartTree: React.FC<Props> = ({
  setGraphPage,
  data,
  header,
  port,
}) => {
  const {
    register: register3,
    handleSubmit: handleSubmit3,
    watch,
    unregister,
    reset,
  } = useForm();

  const onSubmit3 = (data: any) => {
    // let model;
    // let doit;
    // let contents;
    // let obdata: any;
    // Object.keys(data).map((key: any) => {
    //   if (data[key] === "" || data[key].toString() === "NaN") {
    //     delete data[key];
    //   } else {
    //     contents = key.split(" ")[0];
    //     model = key.split(" ")[1];
    //     doit = key.split(" ")[2];
    //     console.log(key, key.split(contents + " " + model + " " + doit)[1]);

    //     obdata = {
    //       ...obdata,
    //     };
    //     delete Object.assign(data, {
    //       [key.split(contents + " " + model + " " + doit)[1]]: data[key],
    //     })[key];
    //   }
    // });
    // let dataCustom = makeObjectData(data);

    console.log(
      {
        // contents: isStatic ? "static" : "dynamic",
        details: data,
        // wants: {
        //   model: models ? models.value : "",
        //   doit: doits ? doits.value : "",
        // },
      },
      "dat"
    );
    // const link = port
    //   ? `http://127.0.0.1:${port}/funql`
    //   : `http://127.0.0.1:6005/funql`;
    // axios
    //   .post(
    //     link,
    //     {
    //       contents: isStatic ? "static" : "dynamic",
    //       details: dataCustom,
    //       wants: {
    //         model: models ? models.value : "",
    //         doit: doits ? doits.value : "",
    //       },
    //     },
    //     { headers: header }
    //   )
    //   .then(function (response) {
    //     setResult(JSON.stringify(response.data.body));
    //   })
    //   .catch(function (error) {
    //     console.log(error.response, "err");
    //     // error && setResult("you have errors");
    //     error &&
    //       error.response &&
    //       setResult(JSON.stringify(error.response.data));
    //   });
  };

  let list: any;

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
      {/* {result !== "" && (
        <ModalBox textHeader="" open={result} setOpen={setResult}>
          <div>{result}</div>
        </ModalBox>
      )} */}
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
                <>
                  {nodeDatum.data && (
                    <Leaf
                      data={nodeDatum.data}
                      parent={nodeDatum.parent}
                      port={port}
                      header={header}
                      toggleNode={toggleNode}
                    />
                  )}
                </>
              );
            }}
            // collapsible={true}
            enableLegacyTransitions={true}
            transitionDuration={300}
            translate={{ x: 575, y: 20 }}
            initialDepth={3}
            depthFactor={500}
            pathFunc={path}
            nodeSize={{ x: 400, y: 200 }}
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
