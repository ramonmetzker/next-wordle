import type { NextPage } from "next";
import Board from "@components/Board";
import useWordleStore from "src/store/useWordleStore";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import KeyboardWidget from "@components/KeyboardWidget";
import Keyboard from "@components/Keyboard";
import Header from "@components/Header";
import Wrapper from "@components/Wrapper";
import useWordleConfigStore from "src/store/useWordleConfigStore";
import Head from "next/head";

const Tutorial = dynamic(() => import("../components/TutorialDialog"));
const Final = dynamic(() => import("../components/FinalDialog"));

const Home: NextPage = () => {
  const { currentIndex, guesses, handleKeyboard, init } = useWordleStore();
  const { keyboard } = useWordleConfigStore();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>NextWordle</title>
        <meta
          name="description"
          content="A fullstack Next.js clone of the famous Wordle from The New York Times"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Wrapper>
        <Board
          boardState={guesses}
          currentIndex={currentIndex}
          handleKeyboard={handleKeyboard}
        />
        {keyboard && <Keyboard />}
        <KeyboardWidget />
        <Tutorial />
        <Final />
      </Wrapper>
    </>
  );
};

export default Home;
