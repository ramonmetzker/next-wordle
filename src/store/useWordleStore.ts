import { CharStatus } from "@components/Char";
import { Word } from "src/types/word";
import create from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import useKeyboardStore from "./useKeyboardStore";

const KEY = process.env.API_KEY || "";

interface WordleStore {
  word: string;
  currentIndex: number;
  guesses: string[];
  validations: CharStatus[][];
  guess: () => void;
  handleKeyboard: (e: KeyboardEvent) => void;
  init: () => void;
  won: () => boolean;
  lost: () => boolean;
  shareText: () => string;
  ended: boolean;
  showDialog: boolean;
  reset: () => void;
}

interface PersistedWordleStore {
  boardState: string[] | null;
  boardValidation: CharStatus[][];
  lastIndex: number;
  lastDate: string;
  solution: string;
}

const usePersistedWordleStore = create<PersistedWordleStore>()(
  persist(
    (set) => ({
      boardState: null,
      boardValidation: [],
      lastIndex: 0,
      lastDate: "",
      solution: "",
    }),
    { name: "next-wordle" }
  )
);

const useWordleStore = create<WordleStore>((set, get) => ({
  init: async () => {
    const word = await fetch("/api/word", {
      headers: { "x-api-key": KEY },
    })
      .then((res) => res.json())
      .then((res: Word) => res.word);
    const { lastIndex, boardState, lastDate, boardValidation } =
      usePersistedWordleStore.getState();
    const today = `${new Date().getDate().toString().padStart(2, "0")}/${(
      new Date().getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${new Date().getFullYear()}`;

    if (boardState && today === lastDate) {
      set(() => ({
        word,
        guesses: boardState,
        currentIndex: lastIndex,
        validations: boardValidation,
      }));
      if (get().won() || get().lost())
        set(() => ({ ended: true, showDialog: true }));
    } else {
      set(() => ({
        word,
        guesses: new Array(6).fill(""),
        currentIndex: 0,
      }));
      usePersistedWordleStore.setState({
        boardState: new Array(6).fill(""),
        lastDate: today,
        lastIndex: 0,
        boardValidation: [],
      });
      get().reset();
    }
  },
  reset: () => {
    useKeyboardStore.setState({ correct: "", absent: "", present: "" });
  },
  ended: false,
  showDialog: false,
  validations: [],
  currentIndex: 0,
  guess: async () => {
    const valid: boolean = await fetch(
      `/api/word/${get().guesses[get().currentIndex]}`
    )
      .then((res) => res.json())
      .then((res) => res.valid);
    if (valid) {
      const word = get().guesses[get().currentIndex];
      const validations = get().validations;
      validations[get().currentIndex] = new Array(5).fill("correct");
      if (word === get().word) {
        set(() => ({ validations }));
        usePersistedWordleStore.setState(() => ({ solution: get().word }));
        word.split("").map((letter) => {
          useKeyboardStore.setState((state) => ({
            correct: state.correct.includes(letter)
              ? state.correct
              : state.correct + letter,
          }));
        });
      } else {
        const line = word.split("").map((letter, i) => {
          if (get().word[i] === letter) {
            useKeyboardStore.setState((state) => ({
              correct: !state.correct.includes(letter)
                ? state.correct + letter
                : state.correct,
            }));
            return "correct";
          } else if (get().word.includes(letter)) {
            useKeyboardStore.setState((state) => ({
              present: !state.present.includes(letter)
                ? state.present + letter
                : state.present,
            }));
            return "present";
          } else {
            useKeyboardStore.setState((state) => ({
              absent: !state.absent.includes(letter)
                ? state.absent + letter
                : state.absent,
            }));
            return "absent";
          }
        });
        validations[get().currentIndex] = line;
      }
      set((state) => ({
        currentIndex: state.currentIndex + 1,
        error: "",
        validations,
      }));
      usePersistedWordleStore.setState({
        lastIndex: get().currentIndex,
        boardValidation: validations,
      });
    } else {
      toast("Invalid word", {
        type: "error",
        hideProgressBar: true,
        closeButton: false,
      });
    }
    setTimeout(() => {
      if (get().won() || get().lost())
        set(() => ({ ended: true, showDialog: true }));
    }, 1000);
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
  shareText: () => {
    let text = `I've finished NextWordle - ${get().currentIndex}/6\n\n`;
    get().validations.forEach((row) => {
      row.forEach((letter) => {
        text +=
          letter === "correct" ? "🟩" : letter === "present" ? "🟨" : "⬜";
      });
      text += `\n`;
    });
    return text + `\nTry it too! ${process.env.APP_URL}`;
  },
  word: "",
  guesses: [],
}));

export default useWordleStore;
