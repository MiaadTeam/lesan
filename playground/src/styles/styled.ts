import styled from "styled-components";
import Play from "../playbutton.png";

export const Input = styled.input`
  border: none;
  border-bottom: 0.1rem solid black;
  margin-left: 0.5rem;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const Container = styled.form`
  display: flex;
  height: 100vh;
  justify-content: center;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: white;
  position: relative;
  overflow-y: auto;
  width: 50%;
  flex: 1;
`;
export const Right = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1;
  position: relative;
  background-color: white;
  border-left: 0.1rem solid black;
`;
export const Bottom = styled.div`
  position: absolute;
  border-top: 0.1rem solid black;
  /* border-right: 0.1rem solid black;
  border-left: 0.1rem solid black; */
  height: 5.2rem;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  align-items: center;
  border-radius: 50% 50% 0 0;
  background-color: white;
`;

export const LeftBottom = styled.div`
  border-radius: 50% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
`;

export const RightBottom = styled.div`
  border-radius: 0 50% 0 0;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  flex: 1;
`;

export const ButtonPaly = styled.input.attrs({ type: "submit", value: "" })`
  z-index: 1;
  position: absolute;
  /* background: url(Play); */
  display: flex;
  justify-content: center;
  bottom: 2rem;
  border: 0.1rem solid black;
  width: 8rem;
  background-color: white;
  overflow: hidden;
  height: 6.5rem;
  border-radius: 50%;
`;
export const IconPlay = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1.2rem;
`;

export const BoxParagraphHeader = styled.div`
  background-color: white;
  position: fixed;
  width: 48%;
  margin: 0 1%;
  padding: 0.5rem 0;
`;
export const ParagraphHeader = styled.p`
  font-size: 1rem;
  border: 0.1rem solid black;
  border-radius: 1rem;
  margin: 0;
  padding: 0.5rem 2rem;
`;
export const Icon = styled.img`
  width: 3rem;
  height: 3rem;
`;

export const Models = styled.div`
  align-items: center;
  display: flex;
  padding: 1rem 0;
  border-bottom: 0.2rem solid black;
`;
export const Details = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
`;
