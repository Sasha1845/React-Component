import { useState, useEffect, useRef } from "react";

export const useGameTimer = (isActive, initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (initialTime > 0 && time === 0) {
      setTime(initialTime);
    }
  }, [initialTime, time]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]);

  const resetTimer = () => {
    setTime(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { time, resetTimer };
};
