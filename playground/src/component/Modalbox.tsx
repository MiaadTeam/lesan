import React from "react";
import styled from "styled-components";

interface Props {
  textHeader: string;
  open: any;
  setOpen: any;
  width?: string;
}
interface ContainMI {
  open: string;
  width?: string;
}
const ModalBox: React.FC<Props> = ({
  width,
  textHeader,
  setOpen,
  open,
  children,
}) => {
  return (
    <>
      <Modal open={open} onClick={() => setOpen("")}></Modal>

      <ContainerModal width={width} open={open}>
        <HeaderModal>
          <TextHeader>{textHeader}</TextHeader>
        </HeaderModal>
        <BodyModal>{children}</BodyModal>
      </ContainerModal>
    </>
  );
};
export default ModalBox;

const Modal = styled.div<ContainMI>`
  display: ${(props) => (props.open !== "" ? "flex" : "none")};
  flex-direction: column;
  z-index: 1;
  left: 0;
  justify-content: center;
  align-items: center;
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const ContainerModal = styled.div<ContainMI>`
  display: ${(props) => (props.open !== "" ? "flex" : "none")};
  border-radius: 0.8rem;
  width: ${(props) => (props.width ? props.width : "65%")};
  z-index: 2;
  margin: 5rem auto;
  height: 80%;
  background-color: white;
  padding: 0 3rem;
  flex-direction: column;
`;

const HeaderModal = styled.div`
  display: flex;
  height: 5rem;
  border-bottom: 0.1rem solid #cbcbcb;
  align-items: center;
`;
const TextHeader = styled.h3`
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 1.5rem;
  flex: 1;
`;
// const Close = styled.span`
//   font-size: 2.5rem;
//   cursor: pointer;
// `;
const BodyModal = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0 3rem 0;
  flex-wrap: wrap;
  overflow-y: auto;
`;
