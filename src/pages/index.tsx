import type { NextPage } from "next";
import Char from "../components/Char";
import WordRow from "../components/WordRow";

const Home: NextPage = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <WordRow word="teste" rowIndex={0} userInput="teste" validate />
    </div>
  );
};

export default Home;
