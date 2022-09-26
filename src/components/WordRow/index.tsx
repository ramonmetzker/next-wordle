import useWordleStore from "src/store/useWordleStore";
import Char, { CharStatus } from "../Char";

type WordRowProps = {
  userInput?: string;
  validate?: boolean;
  rowIndex: number;
};

const WordRow = ({
  userInput = "",
  validate = false,
  rowIndex,
}: WordRowProps) => {
  const { validations } = useWordleStore();

  return (
    <div className="flex gap-2">
      {[...new Array(5)].map((_, i) => {
        return (
          <Char
            char={userInput[i]}
            valid={validate}
            status={validations?.[rowIndex]?.[i]}
            key={`row-${rowIndex}-letter-${i}`}
          />
        );
      })}
    </div>
  );
};

export default WordRow;
