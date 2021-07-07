import React from "react";
import "react-json-pretty/themes/monikai.css";
import styled from "styled-components";
import { makeObjectData } from "./function";
interface Props {
  watch: any;
  isStatic: boolean;
  model: string;
  doit: string;
}
const InputTextarea: React.FC<Props> = ({ watch, model, isStatic, doit }) => {
  return (
    <PreContainer>
      {JSON.stringify(
        {
          details: makeObjectData(watch()),
          contents: isStatic ? "static" : "dynamic",
          wants: {
            model: model,
            doit: doit,
          },
        },
        undefined,
        4
      )}
    </PreContainer>
  );
};

export default InputTextarea;
const PreContainer = styled.pre`
  height: 90vh;
  width: 100%;
  background-color: rgb(33, 40, 53);
  color: white;
  border: none;
`;
