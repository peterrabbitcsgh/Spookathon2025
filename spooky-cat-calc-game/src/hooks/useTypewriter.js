import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50, startDelay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      setDisplayText('');
      setIsComplete(false);

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
};

export default useTypewriter;
