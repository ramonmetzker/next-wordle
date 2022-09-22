import type { NextPage } from "next";
import Board from "@components/Board";
import useWordleStore from "src/store/useWordleStore";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { currentIndex, word, guesses, handleKeyboard, error, init } =
    useWordleStore();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Board
        word={word}
        boardState={guesses}
        currentIndex={currentIndex}
        handleKeyboard={handleKeyboard}
      />
    </>
  );
};

export default Home;
