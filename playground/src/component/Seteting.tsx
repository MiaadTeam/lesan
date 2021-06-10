import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "../settings.png";
interface Props {
  setPort: any;
  setFileChange: any;
  setHeader: any;
}

const Setting: React.FC<Props> = ({ setHeader, setPort, setFileChange }) => {
  const { register: register2, handleSubmit: handleSubmit2 } = useForm({});
  const [setting, setSetting] = useState(false);
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
    <div style={{ position: "absolute", right: "0", width: " 100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          margin: "5px",
        }}
      >
        <img
          src={Image}
          alt="Picture of the author"
          width={25}
          height={25}
          onClick={() => setSetting(!setting)}
          tabIndex={3}
        />

        {setting && (
          <form
            tabIndex={2}
            // style={{ width: "100%" }}
            // onBlur={() => setSetting(false)}
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <ul
              style={{
                position: "absolute",
                zIndex: 2,
                backgroundColor: "white",
                top: "10px",
                border: "solid black 0.01rem",
                borderRadius: "0.5rem",
                right: "10px",
                left: "5px",
                boxShadow: "5px 5px 3px grey",
                padding: "0.5rem",
              }}
            >
              <li
                style={{
                  width: "100%",
                  display: "flex",
                  margin: "0.5rem 0",
                  justifyContent: "flex-start",
                }}
              >
                <p style={{ margin: "0 0.5rem" }}>port:</p>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  {...register2("endPort")}
                />
              </li>
              <li
                style={{
                  width: "100%",
                  display: "flex",
                  margin: "0.5rem 0",
                  justifyContent: "flex-start",
                }}
              >
                <p style={{ margin: "0 0.5rem" }}>port:</p>
                <input
                  id="file"
                  // accept=".css"
                  type="file"
                  onChange={(e) => showFile(e)}
                />
              </li>
              <li
                style={{
                  width: "100%",
                  display: "flex",
                  margin: "0.5rem 0",
                  justifyContent: "flex-start",
                }}
              >
                <p style={{ margin: "0 0.5rem" }}>header:</p>
                <textarea
                  // onChange={(e: any) => setFileChange(e.target.value)}
                  {...register2("header")}
                  // type="text"
                  style={{ width: "100%" }}
                />
              </li>
              <li
                style={{
                  width: "100%",
                  display: "flex",

                  margin: "0.5rem 0",
                  justifyContent: "center",
                }}
              >
                <input
                  style={{
                    width: "5rem",
                    height: "2  rem",
                    right: "-2.5rem",
                  }}
                  type="submit"
                  value="submit"
                />
              </li>
            </ul>
          </form>
        )}
      </div>
    </div>
  );
};
export default Setting;
