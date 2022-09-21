import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}

export default MyApp;
