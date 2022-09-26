import { useEffect, useState } from "react";
type TimerProps = {
  className?: string;
};
const Timer = ({ className }: TimerProps) => {
  const [timer, setTimer] = useState("0:00:00");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      let d = new Date(new Date().setDate(new Date().getDate() + 1));
      let hours = 24 - d.getHours();
      let mins = (60 - d.getMinutes()).toString().padStart(2, "0");
      let secs = (60 - d.getSeconds()).toString().padStart(2, "0");

      setTimer(hours + ":" + mins + ":" + secs);
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });
  return <p className={className}>{timer}</p>;
};

export default Timer;
