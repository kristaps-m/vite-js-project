import { Dispatch, SetStateAction, useEffect } from "react";

interface ITimerProps {
  isTimeStarted: boolean;
  setTimePassed: Dispatch<SetStateAction<number>>;
  timePassed: number;
}

function TheTimer({
  isTimeStarted: isTimeStarted,
  setTimePassed: setTimePassed,
  timePassed: timePassed,
}: ITimerProps) {
  useEffect(() => {
    let interval: number;

    if (isTimeStarted) {
      interval = setInterval(() => {
        setTimePassed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimeStarted, setTimePassed]);

  return showAmazingTimeHHmmss(timePassed);
}

export default TheTimer;

function showAmazingTimeHHmmss(s: number) {
  return {
    timeString: `${new Date(s * 1000).toISOString().substring(11, 19)}`,
    realSeconds: s,
  };
}
