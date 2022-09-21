import WordRow from "../WordRow";

const Board = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...new Array(6)].map((_, i) => (
        <WordRow key={`wordle-row-${i}`} rowIndex={i} word="" />
      ))}
    </div>
  );
};

export default Board;
