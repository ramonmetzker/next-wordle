import { useEffect } from "react";
import WordRow from "../WordRow";

type BoardProps = {
  word: string;
  boardState: string[];
  currentIndex: number;
  handleKeyboard: (e: KeyboardEvent) => void;
};

const Board = ({
  boardState,
  currentIndex,
  handleKeyboard,
  word,
}: BoardProps) => {
  useEffect(() => {
    window.addEventListener("keyup", handleKeyboard);

    return () => {
      window.removeEventListener("keyup", handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {boardState.map((row, i) => (
        <WordRow
          word={word}
          userInput={row}
          rowIndex={currentIndex}
          validate={i < currentIndex}
          key={`wordle-row-${currentIndex + i}`}
        />
      ))}
    </div>
  );
};

export default Board;
