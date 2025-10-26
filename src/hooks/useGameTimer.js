import { useState, useEffect, useRef } from "react";

export const useGameTimer = (isActive) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const resetTimer = () => {
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return { time, resetTimer };
};
