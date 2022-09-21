import { useEffect, useState, memo } from "react";

export type CharStatus = "correct" | "present" | "absent";

type CharProps = {
  char: string;
  valid?: boolean;
  status?: CharStatus;
};

const Char = ({ char, status = undefined, valid = false }: CharProps) => {
  const [animating, setAnimating] = useState(false);

  const charClass = `${
    status === "present"
      ? "bg-yellow-300 border-yellow-300 text-black"
      : status === "correct"
      ? "bg-green-400 border-green-400"
      : "bg-slate-900 border-gray-500"
  }`;

  useEffect(() => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  }, [char]);

  return (
    <div
      className={`w-14 h-14 border-2 text-white font-bold text-lg uppercase flex items-center justify-center select-none ${
        animating ? "animate-scale-up" : ""
      } ${valid ? charClass : ""}`}
    >
      {char}
    </div>
  );
};

export default memo(Char);
