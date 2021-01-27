import { Navbar } from "../component/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar list={["Docs", "Showcase", "Blog", "Analytics", "Releases"]} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
