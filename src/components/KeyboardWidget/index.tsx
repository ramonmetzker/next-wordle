import { FaRegKeyboard } from "@react-icons/all-files/fa/FaRegKeyboard";
import useWordleConfigStore from "src/store/useWordleConfigStore";

const KeyboardWidget = () => {
  return (
    <button
      className="fixed bottom-8 right-8 text-slate-800 bg-white p-3 rounded-lg hover:-translate-y-1 transition-all ease-in"
      onClick={() =>
        useWordleConfigStore.setState((state) => ({
          keyboard: !state.keyboard,
        }))
      }
    >
      <FaRegKeyboard size={24} />
    </button>
  );
};

export default KeyboardWidget;
