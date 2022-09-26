import { FaRegQuestionCircle } from "@react-icons/all-files/fa/FaRegQuestionCircle";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";
import useWordleConfigStore from "src/store/useWordleConfigStore";
import useWordleStore from "src/store/useWordleStore";

const Header = () => {
  const { won } = useWordleStore();
  return (
    <header className="py-5 text-white font-extrabold text-2xl w-screen flex justify-center items-center font-mono z-50">
      Wordle
      <div className="absolute right-8 z-50 flex gap-x-6">
        <button
          className="hover:scale-125 ease-in transition-all duration-75 hover:text-yellow-600 disabled:hover:text-slate-600 disabled:text-slate-600 disabled:hover:scale-100"
          onClick={() => useWordleStore.setState({ showDialog: true })}
          disabled={!won()}
        >
          <FaTrophy />
        </button>
        <button
          className="hover:scale-125 ease-in transition-all duration-75"
          onClick={() => useWordleConfigStore.setState({ tutorial: true })}
        >
          <FaRegQuestionCircle />
        </button>
      </div>
    </header>
  );
};

export default Header;
