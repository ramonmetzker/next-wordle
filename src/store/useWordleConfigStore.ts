import create from "zustand";
import { persist } from "zustand/middleware";

interface WordleConfigStore {
  tutorial: boolean;
  keyboard: boolean;
}

const useWordleConfigStore = create<WordleConfigStore>()(
  persist(
    (set) => ({
      tutorial: true,
      keyboard: false,
    }),
    {
      name: "next-wordle-config",
    }
  )
);

export default useWordleConfigStore;
