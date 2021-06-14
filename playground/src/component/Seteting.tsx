import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "../settingsicons.png";
import "../index.css"
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
    <div style={{      display: "flex",
    justifyContent: "flex-end", position:"fixed",top:"0",zIndex:2, right: "0", width: " 100%" }}>
   
       

      { setting&& 
      <>
      <div onClick={()=>setSetting(false)} style={{position:"fixed",height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.7)"}}>S</div>
        <form
            tabIndex={2}
            className={"menu"}
            // style={menu { width: "100%" }}
            // onBlur={() => setSetting(false)}
            onSubmit={handleSubmit2(onSubmit2)}
          >
            <ul
               className="ulmenu"
            >
              <li
                style={{
                  width: "100%",
                  display: "flex",
                  margin: "0.5rem 0",
                  justifyContent: "flex-start",
                }}
              >
                <p style={{ margin: "0 0.5rem" ,width:"4rem"}}>port:</p>
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
                <p style={{ margin: "0 0.5rem" ,width:"4rem"}}>port:</p>
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
                <p style={{ margin: "0 0.5rem" ,width:"4rem"}}>header:</p>
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
                    height: "2rem",
                    right: "-2.5rem",
                    backgroundColor:"#1183ca",
                    border:"none",
                    color:"white",
                    borderRadius:"0.5rem"

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
          className="imagesetting"
          style={setting?{ top:"10rem"}:{top:"0.5rem"}}
          height={25}
          onClick={() => setSetting(!setting)}
          tabIndex={3}
        />
    </div>
  );
};
export default Setting;
