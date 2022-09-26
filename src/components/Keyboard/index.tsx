import { MdKeyboardBackspace } from "@react-icons/all-files/md/MdKeyboardBackspace";
import useKeyboardStore from "src/store/useKeyboardStore";
const keycaps = [
  "q,w,e,r,t,y,u,i,o,p",
  "a,s,d,f,g,h,j,k,l,Backspace",
  "z,x,c,v,b,n,m,Enter",
];
const Keyboard = () => {
  const { absent, correct, present } = useKeyboardStore();
  const handleKeypress = (key: string) => {
    window.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  };
  return (
    <div className="flex fixed mx-auto bottom-8 flex-col items-center gap-2">
      {keycaps.map((row, i) => (
        <div className="flex gap-2" key={`keyboard-row-${i}`}>
          {row.split(",").map((keycap) => {
            const keyclass = absent.includes(keycap)
              ? "bg-slate-700 text-white hover:bg-slate-900"
              : correct.includes(keycap)
              ? "bg-green-400 text-white hover:bg-green-600"
              : present.includes(keycap)
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-white";
            return (
              <button
                key={`keyboard-cap-${keycap}`}
                onClick={() => handleKeypress(keycap)}
                className={`border rounded-md font-bold text-lg uppercase font-mono px-2 hover:-translate-y-1 ${keyclass}`}
              >
                {keycap === "Backspace" ? <MdKeyboardBackspace /> : keycap}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
