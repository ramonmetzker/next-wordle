import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={1000} position="top-center" />
    </>
  );
}

export default MyApp;
