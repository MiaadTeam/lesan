import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Setting from "./component/Seteting";
import Show from "./component/Show";
import { customStyles } from "./styles/reactSelectStyle";
import { Container, Details, Left, Models, Right } from "./styles/styled";

interface Props {}
const App: React.FC<Props> = () => {
  const [models, setModels]: any = useState(null);
  const [stateDoits, setStateDoits]: any = useState(null);
  const [fileChange, setFileChange] = useState("");
  const [message, setMessage] = useState("");
  const [port, setPort] = useState("");
  let dataModel: any;
  let optionModels: any = [];
  let optionDoits: any = [];
  if (fileChange) {
    dataModel = JSON.parse(fileChange).schema.props.models.props;
    Object.keys(dataModel).map((key) =>
      optionModels.push({ value: key, label: key })
    );

    models !== null &&
      Object.keys(dataModel[models.value].props.doits.props).map((key) => {
        return optionDoits.push({ value: key, label: key });
      });
  }

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
    resolver: async (data) => {
      return {
        values: data,
        errors: {},
      };
    },
  });

  const onSubmit = (data: any) => {
    let first = "";
    let dataCustom: any = {};
    Object.keys(data).map((key: string) => {
      first = key.split(" ")[0];
      let second = key.split(" ")[1];
      if (second[second.length - 1] === "?") {
        second = second.substring(0, second.length - 1);
      }
      if (!Object.keys(dataCustom).includes(first)) {
        dataCustom[first] = {};
        dataCustom[first][second] = data[key];
      } else {
        dataCustom[first][second] = data[key];
      }
    });

    const link = port
      ? `http://127.0.0.1:${port}/funql`
      : `http://127.0.0.1:6005/funql`;

    axios
      .post(link, {
        details: dataCustom,
        wants: {
          model: models.value,
          doit: stateDoits.value,
        },
      })
      .then(function (response) {
        setMessage(JSON.stringify(response.data.body));
      })
      .catch(function (error) {
        console.log(errors, "err");
        errors && setMessage("you have errors");
        error &&
          error.response &&
          setMessage(JSON.stringify(error.response.data));
      });
  };
  return (
    <Container>
      <Left onSubmit={handleSubmit(onSubmit)}>
        <Models>
          {dataModel && (
            <Select
              styles={customStyles}
              id="models"
              width="230px"
              // value={Models.value}
              onChange={(value: any) => {
                setModels(value);
                setStateDoits(null);
              }}
              options={optionModels}
            />
          )}
          {models !== null && (
            <Select
              id="stateDoits"
              value={stateDoits}
              styles={customStyles}
              onChange={setStateDoits}
              width="230px"
              options={optionDoits}
            />
          )}
        </Models>
        <input
          style={{
            position: "absolute",
            top: "40%",
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            right: "-2.5rem",
          }}
          type="submit"
          value="play"
        />
        <Details>
          {models !== "" &&
            stateDoits !== null &&
            Object.keys(
              dataModel[models.value].props.doits.props[stateDoits.value].props
                .details.props
            ).map((key, index) => (
              <div key={key + index} style={{ flex: 1, padding: "0 1rem" }}>
                {key}
                <Show
                  register={register}
                  ke={key}
                  index={index}
                  value={""}
                  values={
                    dataModel[models.value].props.doits.props[stateDoits.value]
                      .props.details.props[key]
                  }
                />
              </div>
            ))}
        </Details>
      </Left>
      <Right>
        {message}
        <Setting setFileChange={setFileChange} setPort={setPort} />
      </Right>
    </Container>
  );
};

export default App;
