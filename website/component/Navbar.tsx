import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "./Logo";

interface Props {
  list: string[];
}
const ContainerNavbar = styled.div`
  height: 4rem;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 0.05rem solid gray;
`;
const UlList = styled.ul`
  display: flex;
  width: 75%;
  margin: 0;
  list-style-type: none;
  justify-content: space-around;
`;
const List = styled.li`
  color: #696969;
  cursor: pointer;
  margin: 0 2rem;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  font-size: ${(props) => props.selected && "1.1rem"};
  &:hover {
    color: #000000;
  }
`;
export const Navbar: React.FC<Props> = ({ list }) => {
  const { asPath } = useRouter();
  return (
    <ContainerNavbar>
      <Link href="/">
        <a href="">
          <Logo size="5rem" />
        </a>
      </Link>
      <UlList>
        {list.map((value, index) => (
          <Link
            key={index}
            href={
              value.toLowerCase().includes("docs")
                ? `/${value.toLowerCase()}/Install`
                : `/${value.toLowerCase()}`
            }
          >
            <List selected={asPath.includes(`/${value.toLowerCase()}`)}>
              {value}
            </List>
          </Link>
        ))}
      </UlList>
      <Button
        fontSize="0.9rem"
        bgColor="#0070f3"
        margin="0 0.5rem"
        height="2.3rem"
        width="5rem"
      >
        Learn
      </Button>
      <Image width={50} alt="me" height={50} src="/github.png" />
    </ContainerNavbar>
  );
};
