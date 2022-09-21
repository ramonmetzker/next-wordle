import Char, { CharStatus } from "../Char";

type WordRowProps = {
  word: string;
  userInput?: string;
  validate?: boolean;
  rowIndex: number;
};

const WordRow = ({
  word,
  userInput = "",
  validate = false,
  rowIndex,
}: WordRowProps) => {
  const checkStatus = (index: number): CharStatus => {
    let status: CharStatus = "absent";
    if (userInput[index] === word[index]) {
      status = "correct";
    } else if (word.includes(userInput[index])) {
      status = "present";
    }
    return status;
  };

  return (
    <div className="flex gap-2">
      {[...new Array(5)].map((_, i) => (
        <Char
          char={userInput[i]}
          valid={validate}
          status={checkStatus(i)}
          key={`row-${rowIndex}-letter-${i}`}
        />
      ))}
    </div>
  );
};

export default WordRow;
