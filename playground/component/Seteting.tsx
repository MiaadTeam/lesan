import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  setPort: any;
}

const Setting: React.FC<Props> = ({ setPort }) => {
  const { register: register2, handleSubmit: handleSubmit2 } = useForm({});
  const [fileChange, setFileChange] = useState("");
  const [setting, setSetting] = useState(false);
  const onSubmit2 = (data) => {
    console.log(data);
    data && setPort(data.endPort);
    setSetting(false);
  };
  return (
    <div
    // style={{ borderBottom: "1rem solid black" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          margin: "5px 5px 0 0",
        }}
      >
        <Image
          src="/settings.png"
          alt="Picture of the author"
          width={25}
          height={25}
          onClick={() => setSetting(!setting)}
          tabIndex={3}
        />

        {setting && (
          <form
            tabIndex={2}
            onBlur={() => setSetting(false)}
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <ul
              style={{
                width: "17rem",
                position: "absolute",
                top: "10px",
                border: "solid black 0.01rem",
                borderRadius: "0.5rem",
                right: "15px",
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
                <p style={{ margin: "0 0.5rem" }}>header:</p>
                <input
                  onChange={(e: any) => setFileChange(e.target.value)}
                  type="text"
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
