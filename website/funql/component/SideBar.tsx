import React from "react";
import Link from "next/link";
import styled from "styled-components";
interface Props {
  list: string[];
  margin?: string;
}
const ContainerSideBar = styled.div`
  display: flex;
  justify-content: center;
  margin: ${(props) => props.margin};
`;
export const SideBar: React.FC<Props> = ({ list, margin }) => {
  return (
    <ContainerSideBar margin={margin}>
      <ul>
        {list.map((value, index) => (
          <Link key={value} href={"/docs/" + value}>
            <li key={index} style={{ margin: "1.5rem 0", cursor: "pointer" }}>
              {value}
            </li>
          </Link>
        ))}
      </ul>
    </ContainerSideBar>
  );
};
