import { useEffect } from "react";
import WordRow from "../WordRow";

type BoardProps = {
  boardState: string[];
  currentIndex: number;
  handleKeyboard: (e: KeyboardEvent) => void;
};

const Board = ({ boardState, currentIndex, handleKeyboard }: BoardProps) => {
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
          userInput={row}
          rowIndex={i}
          validate={i < currentIndex}
          key={`wordle-row-${currentIndex + i}`}
        />
      ))}
    </div>
  );
};

export default Board;
