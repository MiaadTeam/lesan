import React from "react";
import "react-json-pretty/themes/monikai.css";
import styled from "styled-components";
import { makeObjectData } from "./function";
interface Props {
  watch: any;
}

const InputTextarea: React.FC<Props> = ({ watch }) => {
  return (
    <ContainerSwitch
      defaultValue={JSON.stringify(makeObjectData(watch()), undefined, 4)}
    />
  );
};

export default InputTextarea;
const ContainerSwitch = styled.textarea`
  height: 90vh;
  width: 100%;
  background-color: rgb(33, 40, 53);
  color: white;
  border: none;
`;
