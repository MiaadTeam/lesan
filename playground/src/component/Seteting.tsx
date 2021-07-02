import { useForm } from "react-hook-form";
import Image from "../gear.svg";
import "../index.css";
interface Props {
  setPort: any;
  setFileChange: any;
  setHeader: any;
  setSetting: any;
  setting: any;
}

const Setting: React.FC<Props> = ({
  setHeader,
  setPort,
  setFileChange,
  setSetting,
  setting,
}) => {
  const { register: register2, handleSubmit: handleSubmit2 } = useForm({});
  const onSubmit2 = (data: any) => {
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
        bottom: "0rem",
        zIndex: 3,
      }}
    >
      {
        <>
          <form
            tabIndex={2}
            className={setting ? "menu" : "closemenu"}
            // style={menu { width: "100%" }}
            // onBlur={() => setSetting(false)}
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <div
              onClick={() => setSetting(false)}
              className={setting ? "openbtn" : "closebtn"}
            >
              X
            </div>
            <ul className={setting ? "ulmenu" : "closeulmenu"}>
              <li className={setting ? "listsetting" : "closelistsetting"}>
                <p style={{ margin: "0 0.5rem", width: "9rem" }}>port:</p>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  {...register2("endPort")}
                />
              </li>
              <li className={setting ? "listsetting" : "closelistsetting"}>
                <p style={{ margin: "0 0.5rem", width: "9rem" }}>
                  FastestValidation:
                </p>
                <input
                  id="file"
                  accept=".json"
                  type="file"
                  onChange={(e) => showFile(e)}
                />
              </li>
              <li className={setting ? "listsetting" : "closelistsetting"}>
                <p style={{ margin: "0 0.5rem", width: "9rem" }}>header:</p>
                <textarea
                  // onChange={(e: any) => setFileChange(e.target.value)}
                  {...register2("header")}
                  // type="text"
                  style={{ width: "100%" }}
                />
              </li>
              <li
                className={
                  setting ? "listsetting listsetting-btn" : "closelistsetting"
                }
              >
                <input
                  style={{
                    width: "5rem",
                    height: "2rem",
                    right: "-2.5rem",
                    backgroundColor: "#1183ca",
                    border: "none",
                    color: "white",
                    borderRadius: "0.5rem",
                  }}
                  type="submit"
                  value="submit"
                />
              </li>
            </ul>
          </form>
        </>
      }
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
export default Setting;
