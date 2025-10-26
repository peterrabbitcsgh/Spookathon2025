import React, { useState, useEffect } from 'react';
import { Ghost, Clock, Trophy, BookOpen, Crown, Users } from 'lucide-react';

// ==================== DATA ====================

const catAvatars = [
  { id: 1, name: "Shadow", emoji: "🐈‍⬛", color: "bg-gray-800" },
  { id: 2, name: "Pumpkin", emoji: "🐱", color: "bg-orange-500" },
  { id: 3, name: "Whiskers", emoji: "😺", color: "bg-purple-500" },
  { id: 4, name: "Ghost Cat", emoji: "😸", color: "bg-blue-500" },
  { id: 5, name: "Midnight", emoji: "😹", color: "bg-indigo-600" }
];

const categories = {
  power_rule: { name: 'Power Rule', icon: '⚡', color: 'bg-yellow-500' },
  trig: { name: 'Trigonometry', icon: '📐', color: 'bg-blue-500' },
  exponential: { name: 'Exponential', icon: '📈', color: 'bg-green-500' },
  chain_rule: { name: 'Chain Rule', icon: '🔗', color: 'bg-purple-500' },
  product_rule: { name: 'Product Rule', icon: '✖️', color: 'bg-red-500' }
};

const questionBank = [
  {
    id: 1, category: 'power_rule', difficulty: 'easy',
    question: "What is the derivative of f(x) = x³?",
    options: ["3x²", "x²", "3x", "x³"], correct: 0,
    explanation: "Using the power rule d/dx(xⁿ) = n·xⁿ⁻¹, we get 3x²."
  },
  {
    id: 2, category: 'power_rule', difficulty: 'easy',
    question: "What is the derivative of f(x) = 5x?",
    options: ["5", "5x", "x", "0"], correct: 0,
    explanation: "For f(x) = ax, the derivative is just a. So d/dx(5x) = 5."
  },
  {
    id: 3, category: 'power_rule', difficulty: 'easy',
    question: "What is the derivative of f(x) = 7 (a constant)?",
    options: ["0", "7", "1", "7x"], correct: 0,
    explanation: "The derivative of any constant is 0!"
  },
  {
    id: 4, category: 'trig', difficulty: 'easy',
    question: "If f(x) = sin(x), what is f'(x)?",
    options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"], correct: 0,
    explanation: "Fundamental rule: the derivative of sin(x) is cos(x)."
  },
  {
    id: 5, category: 'trig', difficulty: 'easy',
    question: "What is the derivative of f(x) = cos(x)?",
    options: ["-sin(x)", "sin(x)", "-cos(x)", "tan(x)"], correct: 0,
    explanation: "The derivative of cos(x) is -sin(x). Note the negative sign!"
  },
  {
    id: 6, category: 'exponential', difficulty: 'easy',
    question: "What is the derivative of f(x) = eˣ?",
    options: ["eˣ", "xeˣ⁻¹", "ln(x)", "e"], correct: 0,
    explanation: "The exponential eˣ is special: it's its own derivative!"
  },
  {
    id: 7, category: 'exponential', difficulty: 'easy',
    question: "If f(x) = ln(x), what is f'(x)?",
    options: ["1/x", "ln(x)", "x", "e/x"], correct: 0,
    explanation: "The derivative of ln(x) is 1/x."
  },
  {
    id: 8, category: 'power_rule', difficulty: 'medium',
    question: "What is the derivative of f(x) = 4x³ - 2x² + x?",
    options: ["12x² - 4x + 1", "4x² - 2x", "12x² - 4x", "4x³ - 4x"], correct: 0,
    explanation: "Differentiate term by term: 12x² - 4x + 1."
  },
  {
    id: 9, category: 'chain_rule', difficulty: 'hard',
    question: "Using the chain rule, what is d/dx[sin(3x)]?",
    options: ["3cos(3x)", "cos(3x)", "3sin(3x)", "-3cos(3x)"], correct: 0,
    explanation: "Chain rule: d/dx[sin(u)] = cos(u)·du/dx. Here du/dx = 3, so 3cos(3x)."
  },
  {
    id: 10, category: 'product_rule', difficulty: 'hard',
    question: "Using the product rule, what is d/dx[x·sin(x)]?",
    options: ["sin(x) + x·cos(x)", "x·cos(x)", "sin(x)·cos(x)", "cos(x)"], correct: 0,
    explanation: "Product rule: u'v + uv'. Here: (1)·sin(x) + x·cos(x)."
  }
];

// ==================== HOOKS ====================

const useTypewriter = (text, speed = 50, startDelay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
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

// ==================== UTILITIES ====================

const calculatePoints = (isCorrect, timeLeft, maxTime = 20) => {
  if (!isCorrect) return 0;
  const timeBonus = Math.floor((timeLeft / maxTime) * 500);
  return Math.max(500, 500 + timeBonus);
};

const generateRoomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const simulateAIPlayers = (players, currentPlayerId, timeLeft, maxTime) => {
  return players.map(p => {
    if (p.id === currentPlayerId) return p;
    const skillLevel = p.skillLevel || 0.65;
    const randomCorrect = Math.random() < skillLevel;
    const randomTimeLeft = Math.floor(Math.random() * (maxTime - 5)) + 5;
    const randomPoints = randomCorrect ? calculatePoints(randomCorrect, randomTimeLeft, maxTime) : 0;
    return {
      ...p,
      score: p.score + randomPoints,
      lastAnswer: randomCorrect,
      lastPoints: randomPoints,
      answers: [...(p.answers || []), { correct: randomCorrect, points: randomPoints }]
    };
  });
};

const analyzePerformance = (player, totalQuestions) => {
  const answers = player.answers || [];
  const correctCount = answers.filter(a => a.correct).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  
  let grade = 'F', gradeColor = 'text-red-600';
  if (accuracy >= 90) { grade = 'A+'; gradeColor = 'text-green-600'; }
  else if (accuracy >= 80) { grade = 'A'; gradeColor = 'text-green-500'; }
  else if (accuracy >= 70) { grade = 'B'; gradeColor = 'text-blue-500'; }
  else if (accuracy >= 60) { grade = 'C'; gradeColor = 'text-yellow-500'; }
  else if (accuracy >= 50) { grade = 'D'; gradeColor = 'text-orange-500'; }
  
  let feedback = '';
  if (accuracy >= 90) feedback = "Outstanding! You're a calculus master! 🏆";
  else if (accuracy >= 80) feedback = "Excellent work! Keep it up! ⭐";
  else if (accuracy >= 70) feedback = "Good job! You're getting there! 👍";
  else if (accuracy >= 60) feedback = "Not bad! Keep practicing! 📚";
  else feedback = "Keep studying! You can do better! 💪";
  
  return { correctCount, accuracy, grade, gradeColor, feedback, totalPoints: player.score };
};

// ==================== COMPONENTS ====================

const IntroScreen = ({ onComplete }) => {
  const line1 = "Welcome to the Haunted Calculus Manor...";
  const { displayText: text1, isComplete: complete1 } = useTypewriter(line1, 50, 0);
  const { displayText: text2, isComplete: complete2 } = useTypewriter("Where derivatives lurk in every shadow...", 50, 2000);
  const { displayText: text3, isComplete: complete3 } = useTypewriter("Choose your feline familiar and begin...", 50, 4000);

  useEffect(() => {
    if (complete3) setTimeout(onComplete, 2000);
  }, [complete3, onComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 text-8xl animate-pulse">🏰</div>
        <div className="space-y-6">
          <p className="text-3xl text-purple-400 font-serif">{text1}{!complete1 && '|'}</p>
          {complete1 && <p className="text-3xl text-orange-400 font-serif">{text2}{!complete2 && '|'}</p>}
          {complete2 && <p className="text-3xl text-green-400 font-serif">{text3}{!complete3 && '|'}</p>}
        </div>
        <div className="mt-12 flex justify-center gap-4 text-4xl">
          {['👻', '🐈‍⬛', '📐', '🎃'].map((e, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AvatarSelection = ({ selectedAvatar, onSelect, onContinue }) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center p-4">
    <div className="max-w-3xl w-full bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-8 border-4 border-purple-500">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-purple-300 mb-2">🐈‍⬛ Choose Your Familiar 🐈‍⬛</h2>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {catAvatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar)}
            className={`${avatar.color} p-6 rounded-2xl transition-all transform hover:scale-110 ${
              selectedAvatar?.id === avatar.id ? 'ring-8 ring-yellow-400 scale-110' : ''
            }`}
          >
            <div className="text-6xl mb-2">{avatar.emoji}</div>
            <div className="text-white font-bold text-sm">{avatar.name}</div>
          </button>
        ))}
      </div>
      {selectedAvatar && (
        <div className="bg-purple-800 bg-opacity-50 p-6 rounded-xl mb-6 text-center">
          <div className="text-5xl mb-2">{selectedAvatar.emoji}</div>
          <div className="text-2xl font-bold text-purple-200">{selectedAvatar.name}</div>
        </div>
      )}
      <button
        onClick={onContinue}
        disabled={!selectedAvatar}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 disabled:scale-100"
      >
        {selectedAvatar ? '✨ Continue ✨' : '🔒 Select First'}
      </button>
    </div>
  </div>
);

const PlayerCard = ({ player, rank }) => (
  <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl flex items-center gap-4">
    <span className="text-3xl font-bold text-purple-400">#{rank}</span>
    <div className="text-5xl">{player.avatar?.emoji || '🐱'}</div>
    <div className="flex-1">
      <div className="text-xl font-bold text-white">{player.name}</div>
      <div className="text-gray-400">{player.score} pts</div>
    </div>
    {player.isHost && <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">HOST</span>}
  </div>
);

const ProgressBar = ({ player, maxScore }) => {
  const percentage = maxScore > 0 ? (player.score / maxScore) * 100 : 0;
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{player.avatar?.emoji || '🐱'}</span>
        <span className="text-lg font-bold text-white flex-1">{player.name}</span>
        <span className="text-xl font-bold text-purple-400">{player.score}</span>
      </div>
      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const Jumpscare = () => (
  <div className="fixed inset-0 z-50 bg-red-600 animate-pulse flex items-center justify-center">
    <div className="text-center">
      <div className="text-9xl mb-6 animate-bounce">💀👻🎃</div>
      <div className="text-8xl font-bold text-white mb-4">WRONG!</div>
      <div className="text-6xl text-white">BOO! 😱</div>
    </div>
  </div>
);

const CemeteryExit = ({ winner, onRestart }) => (
  <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
    <div className="max-w-3xl w-full text-center">
      <div className="mb-8 text-8xl">🪦</div>
      <h1 className="text-6xl font-bold text-purple-300 mb-4">The Manor's Choice</h1>
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-3xl mb-8">
        <div className="text-7xl mb-4">{winner.avatar?.emoji || '👑'}</div>
        <h2 className="text-4xl font-bold text-yellow-400 mb-2">{winner.name}</h2>
        <p className="text-2xl text-gray-300">Score: {winner.score}</p>
      </div>
      <div className="flex justify-center gap-6 text-5xl mb-8">
        {['🌙', '⭐', '🦇', '🕷️'].map((e, i) => (
          <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{e}</span>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-2xl transition-all transform hover:scale-105"
      >
        🔮 Return to Manor 🔮
      </button>
    </div>
  </div>
);

// ==================== MAIN APP ====================

const SpookyCatCalcGame = () => {
  const [gameState, setGameState] = useState('intro');
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerDuration, setTimerDuration] = useState(20);
  const [jumpscare, setJumpscare] = useState(false);
  const [roundResults, setRoundResults] = useState([]);

  const answerColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
  const answerShapes = ['◆', '●', '▲', '■'];

  // Timer effect
  useEffect(() => {
    if (gameState === 'answering' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'answering') {
      submitAnswer(null);
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    if (!playerName.trim() || !selectedAvatar) return;
    const code = generateRoomCode();
    const newPlayer = {
      id: Date.now(),
      name: playerName,
      avatar: selectedAvatar,
      score: 0,
      isHost: true,
      answers: []
    };
    setRoomCode(code);
    setCurrentPlayer(newPlayer);
    setPlayers([newPlayer]);
    setIsHost(true);
    setGameState('lobby');
  };

  const startPlaying = () => {
    const aiPlayers = Array.from({ length: 3 }, (_, i) => ({
      id: `ai-${i}`,
      name: ['MathWhiskers', 'CalculusCat', 'DerivativeDemon'][i],
      avatar: catAvatars[i + 1],
      score: 0,
      isAI: true,
      skillLevel: 0.65,
      answers: []
    }));
    
    const allPlayers = [...players, ...aiPlayers];
    setPlayers(allPlayers);
    
    const gameQuestions = questionBank.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(gameQuestions);
    setQuestionNumber(1);
    loadQuestion(gameQuestions, 0);
  };

  const loadQuestion = (questionList, index) => {
    if (index >= questionList.length) {
      setGameState('cemetery');
      return;
    }
    setCurrentQuestion(questionList[index]);
    setSelectedAnswer(null);
    setTimeLeft(timerDuration);
    setGameState('question');
    setTimeout(() => setGameState('answering'), 2000);
  };

  const submitAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === currentQuestion.correct;
    const points = isCorrect ? calculatePoints(isCorrect, timeLeft, timerDuration) : 0;
    
    const updatedPlayer = {
      ...currentPlayer,
      score: currentPlayer.score + points,
      answers: [...currentPlayer.answers, { correct: isCorrect, points }]
    };
    setCurrentPlayer(updatedPlayer);
    
    const updatedPlayers = players.map(p => p.id === currentPlayer.id ? updatedPlayer : p);
    const allResults = simulateAIPlayers(updatedPlayers, currentPlayer.id, timeLeft, timerDuration);
    
    setPlayers(allResults);
    setRoundResults(allResults);
    
    if (!isCorrect) {
      setJumpscare(true);
      setTimeout(() => {
        setJumpscare(false);
        setTimeout(() => setGameState('results'), 500);
      }, 2000);
    } else {
      setTimeout(() => setGameState('results'), 1500);
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= questions.length) {
      setGameState('cemetery');
    } else {
      setQuestionNumber(questionNumber + 1);
      loadQuestion(questions, questionNumber);
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setPlayerName('');
    setSelectedAvatar(null);
    setPlayers([]);
    setCurrentPlayer(null);
    setQuestionNumber(0);
  };

  // RENDER STATES
  if (jumpscare) return <Jumpscare />;

  if (gameState === 'intro') {
    return <IntroScreen onComplete={() => setGameState('avatar')} />;
  }

  if (gameState === 'avatar') {
    return (
      <AvatarSelection
        selectedAvatar={selectedAvatar}
        onSelect={setSelectedAvatar}
        onContinue={() => setGameState('setup')}
      />
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-8 border-4 border-purple-500">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{selectedAvatar.emoji}</div>
            <h2 className="text-4xl font-bold text-purple-300 mb-2">Calculus Kahoot</h2>
            <p className="text-xl text-gray-300">Enter the Manor</p>
          </div>
          
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 mb-6 text-xl rounded-xl border-2 border-purple-500 bg-gray-800 text-white focus:outline-none focus:border-pink-500"
          />
          
          <div className="mb-6">
            <label className="block text-purple-300 mb-2 font-bold">Time per Question: {timerDuration}s</label>
            <input
              type="range"
              min="10"
              max="60"
              value={timerDuration}
              onChange={(e) => setTimerDuration(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <button
            onClick={startGame}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 disabled:scale-100"
          >
            🎮 Begin Quest 🎮
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-8 border-4 border-purple-500">
          <div className="text-center mb-8">
            <Users size={64} className="mx-auto text-purple-400 mb-4" />
            <h2 className="text-4xl font-bold text-purple-300 mb-4">Manor Lobby</h2>
            <div className="text-3xl font-mono font-bold text-yellow-400 bg-gray-800 py-3 px-6 rounded-xl inline-block">
              {roomCode}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {players.map((player, idx) => (
              <PlayerCard key={player.id} player={player} rank={idx + 1} />
            ))}
          </div>

          {isHost && (
            <button
              onClick={startPlaying}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105"
            >
              🚀 Start Game 🚀
            </button>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'question') {
    const cat = categories[currentQuestion.category];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className="bg-gray-900 rounded-3xl shadow-2xl p-12 mb-6 border-4 border-purple-500">
            <div className={`inline-block ${cat.color} px-6 py-3 rounded-full mb-6`}>
              <span className="text-3xl mr-2">{cat.icon}</span>
              <span className="text-xl font-bold text-white">{cat.name}</span>
            </div>
            <div className="text-2xl text-purple-400 mb-4">Question {questionNumber} of {questions.length}</div>
            <div className="text-3xl text-white font-bold">{currentQuestion.question}</div>
          </div>
          <div className="text-2xl text-purple-300 font-semibold animate-pulse">Get Ready...</div>
        </div>
      </div>
    );
  }

  if (gameState === 'answering') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-gray-900 rounded-2xl shadow-xl p-6 mb-6 border-2 border-purple-500">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock size={32} className="text-purple-400" />
              <span className="text-5xl font-bold text-white">{timeLeft}s</span>
            </div>
            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${(timeLeft / timerDuration) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 mb-6 border-4 border-purple-500">
            <div className="text-3xl font-bold text-white text-center">{currentQuestion.question}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`${answerColors[index]} ${
                  selectedAnswer === index ? 'ring-8 ring-white scale-105' : ''
                } text-white font-bold py-8 px-6 rounded-2xl text-2xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center gap-4`}
              >
                <span className="text-4xl">{answerShapes[index]}</span>
                <span className="flex-1 text-left">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const sortedPlayers = [...roundResults].sort((a, b) => b.score - a.score);
    const maxScore = sortedPlayers[0]?.score || 1;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 mb-4 border-4 border-purple-500">
            <h2 className="text-4xl font-bold text-center text-purple-300 mb-6">
              Question {questionNumber} Results
            </h2>
            
            <div className="bg-green-900 bg-opacity-50 p-6 rounded-xl mb-6">
              <div className="text-xl text-green-300 mb-2">Correct Answer:</div>
              <div className="text-3xl font-bold text-white">
                {currentQuestion.options[currentQuestion.correct]}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sortedPlayers.map((player) => (
                <ProgressBar key={player.id} player={player} maxScore={maxScore} />
              ))}
            </div>
          </div>

          <button
            onClick={() => setGameState('explanation')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 mb-2"
          >
            <BookOpen size={24} />
            See Explanation
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'explanation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 border-4 border-blue-500">
          <div className="text-center mb-6">
            <BookOpen size={64} className="mx-auto text-blue-400 mb-4" />
            <h2 className="text-4xl font-bold text-blue-300 mb-2">Mini Lesson</h2>
          </div>

          <div className="bg-blue-900 bg-opacity-30 p-6 rounded-xl mb-6">
            <div className="text-2xl font-bold text-white mb-3">{currentQuestion.question}</div>
            <div className="text-3xl font-bold text-green-400 mb-4">
              Answer: {currentQuestion.options[currentQuestion.correct]}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h3 className="text-2xl font-bold text-blue-300 mb-3">Explanation:</h3>
            <p className="text-xl text-gray-300 leading-relaxed">{currentQuestion.explanation}</p>
          </div>

          <button
            onClick={nextQuestion}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            {questionNumber >= questions.length ? '🏆 Final Results' : '➡️ Next Question'}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'cemetery') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];
    const performance = analyzePerformance(currentPlayer, questions.length);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <CemeteryExit winner={winner} onRestart={resetGame} />
          
          <div className="mt-8 bg-gray-900 rounded-3xl p-8 border-4 border-purple-500">
            <h3 className="text-3xl font-bold text-purple-300 mb-6 text-center">Your Performance</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-5xl font-bold text-purple-400">{performance.accuracy}%</div>
                <div className="text-gray-400 mt-2">Accuracy</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl text-center">
                <div className={`text-5xl font-bold ${performance.gradeColor}`}>{performance.grade}</div>
                <div className="text-gray-400 mt-2">Grade</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-400">
                  {performance.correctCount}/{questions.length}
                </div>
                <div className="text-gray-400 mt-2">Correct</div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-yellow-400">{performance.totalPoints}</div>
                <div className="text-gray-400 mt-2">Total Points</div>
              </div>
            </div>
            
            <div className="bg-purple-900 bg-opacity-50 p-6 rounded-xl text-center">
              <p className="text-2xl text-purple-200 font-semibold">{performance.feedback}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SpookyCatCalcGame;
