import React from "react";
import styled from "styled-components";
interface Props {
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
}
const ButtonStyle = styled.button`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "gray")};
  color: ${(props) => (props.color ? props.color : "white")};
  border: 0.02rem solid gray;
  border-radius: 0.5rem;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
`;

export const Button: React.FC<Props> = ({
  width,
  children,
  height,
  margin,
  bgColor,
  color,
  fontSize,
}) => {
  return (
    <ButtonStyle
      margin={margin}
      height={height}
      width={width}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
    >
      {children}
    </ButtonStyle>
  );
};