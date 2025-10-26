import { useState, useEffect } from 'react';

export const useTimer = (initialTime, isActive, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft === 0 && onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive, onTimeUp]);

  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime);
  };

  return { timeLeft, resetTimer };
};

export default useTimer;
