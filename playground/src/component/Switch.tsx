import React from "react";
import "react-json-pretty/themes/monikai.css";
import styled from "styled-components";
interface Props {
  switchBool: boolean;
  setSwitchBool: any;
  fn: any;
  value: [string, string];
}

const SwitchContent: React.FC<Props> = ({
  switchBool,
  setSwitchBool,
  value,
  fn,
}) => {
  return (
    <ContainerSwitch>
      {switchBool ? (
        <>
          <On>{value[0]}</On>
          <Off
            onClick={() => {
              fn();
              setSwitchBool(!switchBool);
            }}
          >
            {value[1]}
          </Off>
        </>
      ) : (
        <>
          <Off
            onClick={() => {
              fn();
              setSwitchBool(!switchBool);
            }}
          >
            {value[0]}
          </Off>
          <On> {value[1]}</On>
        </>
      )}
    </ContainerSwitch>
  );
};

export default SwitchContent;
const ContainerSwitch = styled.div`
  height: 2rem;
  width: 10rem;
  cursor: pointer;
  border-radius: 0.5rem 0.5rem 0 0;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 0.8rem;
  position: fixed;
  padding: 0.3rem;
  background-color: #ffffff;
  overflow: hidden;
  bottom: 2.4rem;
`;
const Off = styled.div`
  height: 100%;
  background-color: #ccc;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const On = styled.div`
  background-color: #2196f3;
  height: 100%;
  width: 100%;
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
`;
