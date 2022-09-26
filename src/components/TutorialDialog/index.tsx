import { Dialog } from "@headlessui/react";
import { FiThumbsUp } from "@react-icons/all-files/fi/FiThumbsUp";
import useWordleConfigStore from "src/store/useWordleConfigStore";

const TutorialDialog = () => {
  const { tutorial } = useWordleConfigStore();
  return (
    <Dialog open={tutorial} onClose={() => {}}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-lg w-full rounded bg-white p-4">
          <Dialog.Title className="text-md uppercase font-bold text-center">
            How to Play
          </Dialog.Title>
          <Dialog.Description className="text-sm flex flex-col gap-2 py-3 border-b">
            <p>
              Guess the <span className="uppercase font-bold">Wordle</span> in 6
              tries.
            </p>
            <p>
              Each guess must be a valid 5-letter word. Hit the enter button to
              submit.
            </p>
            <p>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </p>
          </Dialog.Description>
          <div className="py-3 border-b">
            <span className="font-bold text-sm">Examples</span>
            <div className="flex gap-2 items-center py-3">
              {"weary".split("").map((letter, i) => (
                <p
                  key={letter}
                  className={`w-10 h-10 flex items-center justify-center border-2 uppercase font-bold ${
                    i === 0 ? "bg-green-400 border-green-400 text-white" : ""
                  }`}
                >
                  {letter}
                </p>
              ))}
            </div>
            <p className="text-sm">
              The letter <b>W</b> is in the word and in the correct spot.
            </p>
            <div className="flex gap-2 items-center py-3">
              {"pills".split("").map((letter, i) => (
                <p
                  key={letter}
                  className={`w-10 h-10 flex items-center justify-center border-2 uppercase font-bold ${
                    i === 1 ? "bg-yellow-300 border-yellow-300" : ""
                  }`}
                >
                  {letter}
                </p>
              ))}
            </div>
            <p className="text-sm">
              The letter <b>I</b> is in the word but in the wrong spot.
            </p>
            <div className="flex gap-2 items-center py-3">
              {"vague".split("").map((letter, i) => (
                <p
                  key={letter}
                  className={`w-10 h-10 flex items-center justify-center border-2 uppercase font-bold ${
                    i === 3 ? "bg-slate-700 border-slate-700 text-white" : ""
                  }`}
                >
                  {letter}
                </p>
              ))}
            </div>
            <p className="text-sm">
              The letter <b>U</b> is not in the word in any spot.
            </p>
          </div>
          <div className="pt-5 pb-3 flex justify-center">
            <button
              className="px-4 py-2 flex border rounded-md bg-green-600 text-white items-center justify-center gap-2 hover:bg-green-700 transition-all ease-in"
              onClick={() => useWordleConfigStore.setState({ tutorial: false })}
            >
              Begin! <FiThumbsUp />
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TutorialDialog;
