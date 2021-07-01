import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "../books.svg";
import "../index.css";
interface Props {
  setPort: any;
  setFileChange: any;
  setHeader: any;
  setSetting: any;
  setting: any;
}

const Doc: React.FC<Props> = ({
  setHeader,
  setPort,
  setFileChange,
  setSetting,
  setting,
}) => {
  const { register: register2, handleSubmit: handleSubmit2 } = useForm({});
  const onSubmit2 = (data: any) => {
    console.log(data.header.trim() !== "", data.header);
    try {
      JSON.parse(data.header);
      data.header && setHeader(JSON.parse(data.header));
    } catch (error) {
      data.header.trim() !== "" && alert("Please correct header input");
    }
    data.endPort && setPort(data.endPort);
    setSetting(false);
  };

  const showFile = async (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      // console.log(text);
      setFileChange(text);
      // alert(text)
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        // position: "fixed",
        bottom: "0rem",
        zIndex: 3,
      }}
    >
      <img
        src={Image}
        alt="Picture of the author"
        width={25}
        className={
          setting
            ? "imagesettingopen" + " imagesetting"
            : "imagesettingclose" + " imagesetting"
        }
        // style={setting ? { top: "10rem" } : { top: "0.5rem" }}
        height={25}
        onClick={() => setSetting(!setting)}
        tabIndex={3}
      />
    </div>
  );
};
export default Doc;
