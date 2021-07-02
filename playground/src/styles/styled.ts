import styled from "styled-components";

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
export const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`;
export const BoxPlayGround = styled.div`
  padding: 5rem 0rem;
  color: white;
  pre {
    padding: 5rem 1rem;
    margin: 0;
    min-height: 100vh;
  }
`;
export const BoxShow = styled.div`
  flex: 1;
  padding: 0.5rem 1rem;
`;
export const Left = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: rgb(33, 40, 53);
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
  overflow-y: auto;
  position: relative;
  background-color: white;
  border-left: 0.1rem solid black;
`;
export const Bottom = styled.div`
  position: fixed;
  height: 2.5rem;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background-color: white;
`;
export const IconPlay = styled.img`
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
`;
export const Rectangle = styled.div`
  width: 0;
  height: 0;
  border-top: 20px solid red;
  border-left: 20px solid transparent;
  /* border-radius: 0 0.5rem 0 0; */
`;
export const LeftBottom = styled.div`
  border-radius: 50% 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  flex: 1;
`;

export const RightBottom = styled.div`
  border-radius: 0 50% 0 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex: 1;
`;
export const IconBottomLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 0.1rem solid;
  width: 5rem;
  height: 100%;
`;
export const IconBottomRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.1rem solid;
  width: 5rem;
  height: 100%;
`;
export const ButtonPaly = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 2.4rem;
  cursor: pointer;
  border: none;
  width: 10rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: white;
  height: 2rem;
`;

export const BoxParagraphHeader = styled.div`
  position: fixed;
  width: 48%;
  margin: 0 1%;
  padding: 0.5rem 0;
`;
export const ParagraphHeader = styled.div`
  font-size: 1rem;
  border: 2px solid rgb(119, 82, 190);
  border-radius: 1rem;
  color: rgb(26, 29, 31);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  background-color: rgba(254, 255, 237, 0.8);
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
