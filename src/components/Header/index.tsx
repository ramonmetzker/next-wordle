import { FaRegQuestionCircle } from "@react-icons/all-files/fa/FaRegQuestionCircle";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";
import useWordleConfigStore from "src/store/useWordleConfigStore";
import useWordleStore from "src/store/useWordleStore";
import Image from "next/image";
import Logo from "../../../public/logo.png";

const Header = () => {
  const { won } = useWordleStore();
  return (
    <header className="py-5 text-white font-extrabold text-xl md:text-2xl w-screen flex justify-center items-center font-mono z-50">
      <span className="flex gap-2 items-center">
        <Image src={Logo} alt="NextWordle" width={35} height={35} />
        NextWordle
      </span>
      <div className="absolute right-8 z-50 flex gap-x-3 md:gap-x-6">
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
