import Timer from "@components/Timer";
import { Dialog } from "@headlessui/react";
import useWordleStore from "src/store/useWordleStore";
import { FaShareAlt } from "@react-icons/all-files/fa/FaShareAlt";
import { toast } from "react-toastify";

const FinalDialog = () => {
  const { showDialog, ended, won, currentIndex, shareText } = useWordleStore();

  const texts = {
    description: won()
      ? "You have correctly guessed today's word! Take the next challenge in"
      : "You failed to guess today's word... But you can try it again in",
    status: won()
      ? `It took you ${currentIndex} attempt${
          currentIndex === 1 ? "" : "s"
        } to guess the word! `
      : "You used all of your 6 attempts and still couldn't guess the correct word.",
  };

  return (
    <Dialog
      open={ended && showDialog}
      onClose={() => useWordleStore.setState({ showDialog: false })}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-4 md:mx-auto max-w-lg w-full rounded bg-white p-4">
          <Dialog.Title
            className={
              won()
                ? "text-2xl font-bold text-center text-green-600"
                : "text-2xl font-bold text-center text-red-600"
            }
          >
            {won() ? "You did it!" : "It was close..."}
          </Dialog.Title>
          <p className="text-sm text-center mt-4">{texts.description}</p>
          <Timer className="text-center text-2xl font-bold my-4" />
          <p className="text-sm text-center mt-4">{texts.status}</p>
          {won() && (
            <div className="flex items-center justify-end mt-5 border-t pt-5">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(shareText()).then(() => {
                    toast("Text copied to clipboard", {
                      position: toast.POSITION.TOP_CENTER,
                      type: "success",
                      closeButton: false,
                      hideProgressBar: true,
                      style: {},
                    });
                  });
                }}
                className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm text-slate-600 hover:text-white hover:bg-slate-600 transition-all ease-in"
              >
                <FaShareAlt /> Share your results!
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FinalDialog;
