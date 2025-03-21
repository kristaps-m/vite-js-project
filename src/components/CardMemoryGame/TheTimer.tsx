import { useEffect, useState } from "react";

interface ITimerProps {
  isTimeStarted: boolean;
}

function TheTimer({ isTimeStarted: isTimeStarted }: ITimerProps) {
  const [timePassed, setTimePassed] = useState(0);

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
  }, [isTimeStarted]);

  return showAmazingTimeHHmmss(timePassed);
}

export default TheTimer;

function showAmazingTimeHHmmss(s: number) {
  return {
    timeString: `${new Date(s * 1000).toISOString().substring(11, 19)}`,
    realSeconds: s,
  };
}
