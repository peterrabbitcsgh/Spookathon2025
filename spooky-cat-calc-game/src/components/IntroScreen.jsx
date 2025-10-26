import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const IntroScreen = ({ onComplete }) => {
  const line1 = "Welcome to the Haunted Calculus Manor...";
  const line2 = "Where derivatives lurk in every shadow...";
  const line3 = "Choose your feline familiar and begin your journey...";
  
  const { displayText: text1, isComplete: complete1 } = useTypewriter(line1, 50, 0);
  const { displayText: text2, isComplete: complete2 } = useTypewriter(line2, 50, 2000);
  const { displayText: text3, isComplete: complete3 } = useTypewriter(line3, 50, 4000);

  React.useEffect(() => {
    if (complete3) {
      setTimeout(onComplete, 2000);
    }
  }, [complete3, onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 text-8xl animate-pulse">
          🏰
        </div>
        
        <div className="space-y-6">
          <p className="text-3xl text-purple-400 font-serif min-h-[3rem]">
            {text1}
            {!complete1 && <span className="animate-pulse">|</span>}
          </p>
          
          {complete1 && (
            <p className="text-3xl text-orange-400 font-serif min-h-[3rem]">
              {text2}
              {!complete2 && <span className="animate-pulse">|</span>}
            </p>
          )}
          
          {complete2 && (
            <p className="text-3xl text-green-400 font-serif min-h-[3rem]">
              {text3}
              {!complete3 && <span className="animate-pulse">|</span>}
            </p>
          )}
        </div>

        <div className="mt-12 flex justify-center gap-4 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>👻</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🐈‍⬛</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>📐</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎃</span>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
