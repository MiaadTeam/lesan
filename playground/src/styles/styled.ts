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
  background-color: black;
`;

export const Left = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  flex: 2;
`;
export const Icon = styled.img`
  width: 3rem;
  height: 3rem;
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  background-color: white;
  border-left: 0.1rem solid black;
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
