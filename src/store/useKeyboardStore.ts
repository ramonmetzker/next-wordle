import create from "zustand";
import { persist } from "zustand/middleware";

interface KeyboardStore {
  present: string;
  absent: string;
  correct: string;
}

const useKeyboardStore = create<KeyboardStore>()(
  persist(
    () => ({
      present: "",
      absent: "",
      correct: "",
    }),
    { name: "next-wordle-keyboard" }
  )
);

export default useKeyboardStore;
