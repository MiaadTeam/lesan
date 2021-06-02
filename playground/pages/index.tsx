import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Setting from "../component/Seteting";
import { customStyles } from "../styles/reactSelectStyle";
import { Container, Details, Left, Models, Right } from "../styles/styled";
// import { data } from "./api/schema";
import data from "./api/fastestValidatorSchema.json";
import Show from "./api/function";

export default function Home() {
  const [models, setModels]: any = useState(null);
  const [stateDoits, setStateDoits]: any = useState(null);
  const [message, setMessage] = useState("");
  const [port, setPort] = useState("");
  const dataModel = data.schema.props.models.props;
  let optionModels: any = [];
  let optionDoits: any = [];
  Object.keys(dataModel).map((key) =>
    optionModels.push({ value: key, label: key })
  );

  models !== null &&
    Object.keys(dataModel[models.value].props.doits.props).map((key) => {
      console.log(key);
      return optionDoits.push({ value: key, label: key });
    });
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

  const onSubmit = (data) => {
    let first = "";
    let dataCustom: object = {};
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
          <Select
            styles={customStyles}
            id="models"
            width="230px"
            // value={Models.value}
            onChange={(value) => {
              setModels(value);
              setStateDoits(null);
            }}
            options={optionModels}
          />
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
                  key={key}
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
        <Setting setPort={setPort} />
      </Right>
    </Container>
  );
}
