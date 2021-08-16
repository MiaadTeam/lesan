import React, { useEffect, useRef, useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import styled from "styled-components";
import ModalBox from "./Modalbox";

interface Props {
  setHistory: any;
  history: boolean;
}
const History: React.FC<Props> = ({ history, setHistory }) => {
  const scroll: any = useRef(null);

  const [itemHistory, setItemHistory] = useState(
    localStorage.getItem("history") &&
      JSON.parse(localStorage.getItem("history")!)
  );
  useEffect(() => {
    console.log("i call", JSON.parse(localStorage.getItem("history")!));
    setItemHistory(JSON.parse(localStorage.getItem("history")!));
  }, [localStorage.getItem("history")]);
  // setItemHistory(
  //   localStorage.getItem("history") &&
  //     JSON.parse(localStorage.getItem("history")!)
  // );
  // console.log(itemHistory, JSON.parse(localStorage.getItem("history")!));
  const Delete = (item: number) => {
    setItemHistory(
      itemHistory.filter((value: any) => itemHistory[item] !== value)
    );
  };

  return (
    <ModalBox open={history} setOpen={setHistory} textHeader="History">
      <ContHistory ref={scroll}>
        <Tag
          onClick={() => {
            setItemHistory([]);
            localStorage.removeItem("history");
          }}
        >
          Clear All
        </Tag>
        <Body>
          {itemHistory &&
            itemHistory.map((item: any, index: number) => {
              return (
                <Item>
                  <Close onClick={() => Delete(index)}>&times;</Close>
                  <ItemBody>
                    <Side>
                      <JSONPretty
                        id="json-pretty-history"
                        data={item.request}
                      ></JSONPretty>
                    </Side>
                    <Side>
                      <JSONPretty
                        id="json-pretty-history"
                        data={item.response}
                      ></JSONPretty>
                    </Side>
                  </ItemBody>
                </Item>
              );
            })}
        </Body>
      </ContHistory>
    </ModalBox>
  );
};

export default History;
const ContHistory = styled.div`
  overflow-x: hidden;
  height: 100%;
`;
const Body = styled.div`
  padding: 0 0 1rem 0;
  display: flex;
  overflow-x: auto;
  height: 85%;
`;

const Item = styled.div`
  display: flex;
  border: rgb(119, 82, 190) solid 0.1rem;
  min-width: 35rem;
  border-radius: 0.5rem;
  flex-direction: column;
  margin-right: 1.5rem;
`;
const ItemBody = styled.div`
  display: flex;
  height: 93%;
`;
const Side = styled.div`
  display: flex;
  margin: 0.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  flex: 1;
`;
const Close = styled.span`
  text-align: start;
  font-size: 1.5rem;
  padding-left: 0.5rem;
`;

const Tag = styled.p`
  color: white;
  width: 6rem;
  font-size: 0.9rem;
  padding: 0.3rem 0;
  margin: 0.5rem;
  text-align: center;
  border-radius: 0.2rem;
  background-color: #ffb1b1;
`;
