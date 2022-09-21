import { Word } from "src/types/word";
import create from "zustand";
import { persist } from "zustand/middleware";

interface WordleStore {
  word: string;
  currentIndex: number;
  error?: string;
  guesses: string[];
  guess: () => void;
  handleKeyboard: (e: KeyboardEvent) => void;
  init: () => void;
  won: () => boolean;
  lost: () => boolean;
  shareText: () => string;
}

interface PersistedWordleStore {
  boardState: string[] | null;
  lastIndex: number;
}

const usePersistedWordleStore = create<PersistedWordleStore>()(
  persist(
    (set) => ({
      boardState: null,
      lastIndex: 0,
    }),
    { name: "next-wordle" }
  )
);

const useWordleStore = create<WordleStore>((set, get) => ({
  init: async () => {
    const word = await fetch("/api/word", {
      headers: { "x-api-key": process.env.API_KEY || "" },
    })
      .then((res) => res.json())
      .then((res: Word) => res.word);
    const { lastIndex, boardState } = usePersistedWordleStore.getState();

    if (boardState) {
      set(() => ({ word, guesses: boardState, currentIndex: lastIndex }));
    } else {
      set(() => ({ word, guesses: new Array(6).fill(""), currentIndex: 0 }));
    }
  },
  currentIndex: 0,
  guess: async () => {
    const valid: boolean = await fetch(
      `/api/word/${get().guesses[get().currentIndex]}`
    )
      .then((res) => res.json())
      .then((res) => res.valid);
    if (valid) {
      set((state) => ({ currentIndex: state.currentIndex + 1, error: "" }));
      usePersistedWordleStore.setState({ lastIndex: get().currentIndex });
    } else {
      set(() => ({ error: "This is not a valid word" }));
      setTimeout(() => {
        set(() => ({ error: "" }));
      }, 5000);
    }
  },
  handleKeyboard: (e) => {
    if (get().won() || get().lost()) {
      return;
    }

    if (e.key === "Enter" && get().guesses[get().currentIndex].length === 5) {
      return get().guess();
    }

    if (e.key === "Backspace") {
      let guesses = get().guesses;
      guesses[get().currentIndex] = guesses[get().currentIndex].slice(
        0,
        guesses[get().currentIndex].length - 1
      );
      set(() => ({ guesses }));
      usePersistedWordleStore.setState({ boardState: guesses });
      return;
    }

    if (
      get().guesses[get().currentIndex].length < 5 &&
      e.key.match(/^[A-z]$/)
    ) {
      let guesses = get().guesses;
      guesses[get().currentIndex] =
        guesses[get().currentIndex] + e.key.toLowerCase();
      set(() => ({ guesses }));
      usePersistedWordleStore.setState({ boardState: guesses });
      return;
    }
  },
  lost: () => {
    return get().currentIndex === 6;
  },
  won: () => {
    return get().guesses[get().currentIndex - 1] === get().word;
  },
  shareText: () => "",
  word: "",
  guesses: [],
}));

export default useWordleStore;
