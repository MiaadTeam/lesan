import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Setting from "./component/Seteting";
import Play from "./playbutton.png";
import Show from "./component/Show";
import { customStyles } from "./styles/reactSelectStyle";
import {
  Bottom,
  BoxParagraphHeader,
  ButtonPaly,
  Container,
  Details,
  IconPlay,
  Left,
  LeftBottom,
  Models,
  ParagraphHeader,
  Right,
  RightBottom,
} from "./styles/styled";
import _ from "lodash";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import TreeChart from "./component/Graph";
import { Logo } from "./component/Logo";
interface Props {}
interface SelectOptions {
  value: string;
  label: string;
}
const App: React.FC<Props> = () => {
  const [models, setModels] = useState<SelectOptions | null>(null); //this state is for react-select models management
  const [doits, setDoits] = useState<SelectOptions | null>(null); //this state is for react-select doits management
  const [fileChange, setFileChange] = useState<string>(""); //this state is for read file when user input the schema file
  const [result, setResult] = useState<string>(""); //this state is for displaying the request result
  const [port, setPort] = useState<string>(""); //this state is for specifying the port to request server
  const [header, setHeader] = useState<string>(""); //this state is for specifying the port to request server

  //this variable for set json schema
  let dataSchema: any = [];

  //this variables for options react-select
  let optionModels: SelectOptions[] = [];
  let optionDoits: SelectOptions[] = [];

  //this condition for check user input file json
  // convert value text file to json then set options for react-select
  if (fileChange) {
    dataSchema = JSON.parse(fileChange).schema.props.models.props;
    Object.keys(dataSchema).map((key: string) =>
      optionModels.push({ value: key, label: key })
    );

    models !== null &&
      Object.keys(dataSchema[models.value].props.doits.props).map((key) => {
        return optionDoits.push({ value: key, label: key });
      });
  }

  //when change models cleanup register input react-hook-form
  useEffect(() => {
    return () => {
      Object.keys(watch()).map((key) => unregister(key));
    };
  }, [models]);

  const {
    register,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    //use resolver for validation values but now not working validation and will be developed in the future
    resolver: async (data: any) => {
      return {
        values: data,
        errors: {},
      };
    },
  });
  let dataCustom: any = {};
  const makeNestedObjWithArrayItemsAsKeys = (arr: any, first: any) => {
    const reducer = (acc: any, item: any) => {
      return { [item]: acc };
    };
    return arr.reduceRight(reducer, first);
  };
  //when user click play button call this function
  const onSubmit = (data: any) => {
    Object.keys(data).map((key: any) => {
      if (data[key] === "" || data[key].toString() === "NaN") {
        delete data[key];
      } else {
        const arr: [] = key.split(" ");
        _.defaultsDeep(
          dataCustom,
          makeNestedObjWithArrayItemsAsKeys(arr, data[key])
        );
      }
    });
    console.log(dataCustom);
    const link = port
      ? `http://127.0.0.1:${port}/funql`
      : `http://127.0.0.1:6005/funql`;
    axios
      .post(
        link,
        {
          details: dataCustom,
          wants: {
            model: models ? models.value : "",
            doit: doits ? doits.value : "",
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

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Setting
        setHeader={setHeader}
        setFileChange={setFileChange}
        setPort={setPort}
      />
      <Left>
        <BoxParagraphHeader>
          <ParagraphHeader>Details</ParagraphHeader>
        </BoxParagraphHeader>
        <div style={{ padding: "5rem 1rem" }}>
          {models !== null &&
            doits !== null &&
            Object.keys(
              dataSchema[models.value].props.doits.props[doits.value].props
                .details.props
            ).map((key, index) => (
              <div key={key + index} style={{ flex: 1, padding: "0 1rem" }}>
                {key}
                <Show
                  register={register}
                  ke={key}
                  key={key}
                  index={index}
                  value={""}
                  values={
                    dataSchema[models.value].props.doits.props[doits.value]
                      .props.details.props[key]
                  }
                />
              </div>
            ))}
        </div>
      </Left>
      <Right>
        <BoxParagraphHeader>
          <ParagraphHeader>Response</ParagraphHeader>
        </BoxParagraphHeader>
        <div style={{ padding: "5rem 1rem" }}>
          <JSONPretty
            style={{ height: "100%" }}
            id="json-pretty"
            data={result}
          ></JSONPretty>
        </div>
      </Right>
      {/* <ButtonPaly /> */}
      <input
        type="submit"
        value=""
        style={{
          position: "absolute",
          background: `url(${Play})`,
          backgroundPosition: "52% 20%",
          backgroundRepeat: " no-repeat",
          display: "flex",
          justifyContent: "center",
          bottom: "2rem",
          border: " 0.1rem solid black",
          width: "8rem",
          backgroundColor: "white",
          overflow: "hidden",
          height: " 6.5rem",
          backgroundSize: "1.7rem",
          borderRadius: "50%",
        }}
      />
      <Bottom>
        <LeftBottom>
          {dataSchema && (
            <Select
              menuPlacement="auto"
              styles={customStyles}
              id="models"
              placeholder={"Models"}
              width="230px"
              // value={Models.value}
              onChange={(value: any) => {
                setModels(value);
                setDoits(null);
              }}
              options={optionModels}
            />
          )}
        </LeftBottom>

        <Logo size={"5rem"} />

        <RightBottom>
          {
            <Select
              id="doits"
              placeholder={"Doits"}
              menuPlacement="auto"
              value={doits}
              styles={customStyles}
              onChange={setDoits}
              width="230px"
              options={optionDoits}
            />
          }
        </RightBottom>
      </Bottom>
    </Container>
    //   <div style={{ display: "flex", flexDirection: "column" }}>
    //     <Setting
    //       setHeader={setHeader}
    //       setFileChange={setFileChange}
    //       setPort={setPort}
    //     />
    //     <Container>
    //       <Left onSubmit={handleSubmit(onSubmit)}>
    //         <Models>
    //           {dataSchema && (
    //             <Select
    //               styles={customStyles}
    //               id="models"
    //               width="230px"
    //               // value={Models.value}
    //               onChange={(value: any) => {
    //                 setModels(value);
    //                 setDoits(null);
    //               }}
    //               options={optionModels}
    //             />
    //           )}
    //           {models !== null && (
    //             <Select
    //               id="doits"
    //               value={doits}
    //               styles={customStyles}
    //               onChange={setDoits}
    //               width="230px"
    //               options={optionDoits}
    //             />
    //           )}
    //         </Models>
    //         <input
    //           style={{
    //             position: "absolute",
    //             top: "40%",
    //             width: "5rem",
    //             height: "5rem",
    //             borderRadius: "50%",
    //             right: "-2.5rem",
    //           }}
    //           type="submit"
    //           value="play"
    //         />
    //         <Details>
    //           {models !== null &&
    //             doits !== null &&
    //             Object.keys(
    //               dataSchema[models.value].props.doits.props[doits.value].props
    //                 .details.props
    //             ).map((key, index) => (
    //               <div key={key + index} style={{ flex: 1, padding: "0 1rem" }}>
    //                 {key}
    //                 <Show
    //                   register={register}
    //                   ke={key}
    //                   key={key}
    //                   index={index}
    //                   value={""}
    //                   values={
    //                     dataSchema[models.value].props.doits.props[doits.value]
    //                       .props.details.props[key]
    //                   }
    //                 />
    //               </div>
    //             ))}
    //         </Details>
    //       </Left>
    //       <Right>
    //         <JSONPretty  style={{height:"100%"}} id="json-pretty" data= {result}></JSONPretty>
    //     {/* <TreeChart/> */}
    //       </Right>
    //     </Container>
    //  </div>
  );
};

export default App;
