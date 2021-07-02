import React from "react";
import "react-json-pretty/themes/monikai.css";
import styled from "styled-components";
interface Props {
  isStatic: any;
  setIsStatic: any;
  setModels: any;
  setDoits: any;
  reset: any;
}

const SwitchContent: React.FC<Props> = ({
  reset,
  setIsStatic,
  setDoits,
  isStatic,
  setModels,
}) => {
  return (
    <ContainerSwitch>
      {isStatic ? (
        <>
          <On>static</On>
          <Off
            onClick={() => {
              setModels(null);
              reset();
              setDoits(null);
              setIsStatic(!isStatic);
            }}
          >
            dynamic
          </Off>
        </>
      ) : (
        <>
          <Off
            onClick={() => {
              setModels(null);
              reset();
              setDoits(null);
              setIsStatic(!isStatic);
            }}
          >
            static
          </Off>
          <On>dynamic</On>
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
