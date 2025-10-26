import React, { useState, useEffect } from 'react';
import { Ghost, Skull, Users, Crown, Timer, Trophy, BookOpen, Volume2, VolumeX, Settings } from 'lucide-react';
import { getGameQuestions } from './data/questions';
import { playSound, toggleMute, isMuted, preloadSounds, playBackgroundMusic } from './utils/sounds';
import { getTheme, getRandomEmoji, getThemeNames } from './utils/themes';
import { 
  generateRoomCode, 
  calculatePoints, 
  simulateOtherPlayers, 
  generateAIPlayers,
  formatTime,
  getPerformanceAnalysis,
  avatars
} from './utils/gameLogic';

const SpookyCalculusKahoot = () => {
  // Game state
  const [gameState, setGameState] = useState('setup');
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [roomCode, setRoomCode] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);
  
  // Game settings
  const [difficulty, setDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [aiPlayerCount, setAIPlayerCount] = useState(5);
  const [currentTheme, setCurrentTheme] = useState('spooky');
  const [muted, setMuted] = useState(false);
  
  // Question state
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [jumpscare, setJumpscare] = useState(false);
  const [roundResults, setRoundResults] = useState([]);

  const theme = getTheme(currentTheme);
  const answerColors = ['bg-red-500 hover:bg-red-600', 'bg-blue-500 hover:bg-blue-600', 'bg-green-500 hover:bg-green-600', 'bg-yellow-500 hover:bg-yellow-600'];
  const answerShapes = ['◆', '●', '▲', '■'];

  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  // Timer logic
  useEffect(() => {
    if (gameState === 'answering' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 6) {
          playSound('timerWarning', 0.3);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'answering') {
      submitAnswer(null);
    }
  }, [timeLeft, gameState]);

  const createRoom = () => {
    if (!playerName.trim()) return;
    
    playSound('gameStart');
    
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

  const startGame = () => {
    if (players.length < 1) return;
    
    playSound('gameStart');
    playBackgroundMusic(0.15);
    
    // Add AI players
    const aiPlayers = generateAIPlayers(aiPlayerCount);
    const allPlayers = [...players, ...aiPlayers];
    setPlayers(allPlayers);
    
    // Get questions based on settings
    const gameQuestions = getGameQuestions(questionCount, difficulty);
    setQuestions(gameQuestions);
    
    setQuestionNumber(1);
    loadQuestion(gameQuestions, 0);
  };

  const loadQuestion = (questionList, index) => {
    if (index >= questionList.length) {
      setGameState('finalScores');
      return;
    }
    
    setCurrentQuestion(questionList[index]);
    setSelectedAnswer(null);
    setTimeLeft(timePerQuestion);
    setGameState('question');
    
    setTimeout(() => {
      playSound('tick', 0.5);
      setGameState('answering');
    }, 3000);
  };

  const submitAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correct;
    const points = isCorrect ? calculatePoints(isCorrect, timeLeft, timePerQuestion) : 0;
    
    // Play sound
    playSound(isCorrect ? 'correct' : 'wrong');
    
    const updatedPlayer = {
      ...currentPlayer,
      score: currentPlayer.score + points,
      answers: [...currentPlayer.answers, { correct: isCorrect, points }]
    };
    setCurrentPlayer(updatedPlayer);
    
    // Simulate other players
    const allResults = simulateOtherPlayers(
      players.map(p => p.id === currentPlayer.id ? updatedPlayer : p),
      currentPlayer.id,
      isCorrect
    );
    
    setPlayers(allResults);
    setRoundResults(allResults);
    
    if (!isCorrect) {
      playSound('jumpscare', 0.7);
      setJumpscare(true);
      setTimeout(() => {
        setJumpscare(false);
        setTimeout(() => setGameState('results'), 500);
      }, 2000);
    } else {
      setTimeout(() => setGameState('results'), 1500);
    }
  };

  const showExplanation = () => {
    setGameState('explanation');
  };

  const nextQuestion = () => {
    if (questionNumber >= questions.length) {
      setGameState('finalScores');
    } else {
      setQuestionNumber(questionNumber + 1);
      loadQuestion(questions, questionNumber);
    }
  };

  const handleMuteToggle = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers([]);
    setCurrentPlayer(null);
    setQuestionNumber(0);
    setQuestions([]);
    setRoundResults([]);
  };

  // JUMPSCARE SCREEN
  if (jumpscare) {
    return (
      <div className={`fixed inset-0 z-50 ${theme.colors.jumpscare} animate-pulse flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-9xl mb-6 animate-bounce">
            {theme.emojis.wrong}{theme.emojis.wrong}{theme.emojis.wrong}
          </div>
          <div className="text-8xl font-bold text-white mb-4 animate-shake">
            WRONG!
          </div>
          <div className="text-6xl text-white">BOO! 😱</div>
        </div>
      </div>
    );
  }

  // SETUP SCREEN
  if (gameState === 'setup') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center p-4`}>
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          {/* Mute button */}
          <button
            onClick={handleMuteToggle}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {theme.emojis.main.map((e, i) => <span key={i}>{e}</span>)}
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Calculus Kahoot!
            </h1>
            <p className="text-xl text-gray-600">Derivatives Edition</p>
          </div>

          {/* Theme Selector */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={currentTheme}
              onChange={(e) => setCurrentTheme(e.target.value)}
              className="w-full p-3 text-lg rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
            >
              {getThemeNames().map(name => (
                <option key={name} value={name}>
                  {getTheme(name).name}
                </option>
              ))}
            </select>
          </div>

          {/* Player Name */}
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 mb-4 text-xl rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
          />

          {/* Avatar Selector */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map(avatar => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`p-4 rounded-xl text-4xl transition-all ${
                    selectedAvatar.id === avatar.id
                      ? 'ring-4 ring-purple-500 bg-purple-100 scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Game Settings */}
          <div className="bg-gray-50 p-6 rounded-xl mb-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings size={24} />
              Game Settings
            </h3>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Difficulty: {difficulty === 'all' ? 'Mixed' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Mixed (All Levels)</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Number of Questions: {questionCount}
              </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>20</span>
                </div>
            </div>

            {/* Time per Question */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Time per Question: {formatTime(timePerQuestion)}
              </label>
              <input
                type="range"
                min="10"
                max="180"
                step="5"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10s</span>
                <span>3min</span>
              </div>
            </div>

            {/* AI Players */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                AI Players: {aiPlayerCount}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={aiPlayerCount}
                onChange={(e) => setAIPlayerCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>20</span>
              </div>
            </div>
          </div>

          <button
            onClick={createRoom}
            disabled={!playerName.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 disabled:scale-100"
          >
            Start Game! 🎮
          </button>
        </div>
      </div>
    );
  }

  // LOBBY SCREEN
  if (gameState === 'lobby') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center p-4`}>
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Users size={64} className="mx-auto text-purple-600 mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Lobby</h2>
            <div className="text-3xl font-mono font-bold text-purple-600 bg-purple-100 py-3 px-6 rounded-xl inline-block">
              {roomCode}
            </div>
            <p className="text-gray-600 mt-2">Share this code with friends!</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Game Settings</h3>
            <div className="space-y-2 text-gray-700">
              <p>📊 <strong>Difficulty:</strong> {difficulty === 'all' ? 'Mixed' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
              <p>❓ <strong>Questions:</strong> {questionCount}</p>
              <p>⏱️ <strong>Time per Question:</strong> {formatTime(timePerQuestion)}</p>
              <p>🤖 <strong>AI Players:</strong> {aiPlayerCount}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Players ({players.length})
            </h3>
            <div className="space-y-2">
              {players.map(player => (
                <div key={player.id} className="bg-gray-100 p-4 rounded-xl flex items-center gap-3">
                  <span className="text-3xl">{player.avatar?.emoji || '👤'}</span>
                  <span className="text-lg font-semibold text-gray-800">{player.name}</span>
                  {player.isHost && (
                    <span className="ml-auto bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      Host
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <button
              onClick={startGame}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105"
            >
              Start Game! 🚀
            </button>
          )}
        </div>
      </div>
    );
  }

  // QUESTION PREVIEW SCREEN
  if (gameState === 'question') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center p-4`}>
        <div className="max-w-4xl w-full text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 mb-6">
            <div className="text-6xl mb-6">
              {getRandomEmoji(currentTheme, 'main')}
            </div>
            <div className="text-2xl text-gray-600 mb-4">
              Question {questionNumber} of {questions.length}
            </div>
            <div className="text-3xl text-gray-700">
              {currentQuestion.question}
            </div>
          </div>
          <div className="text-2xl text-white font-semibold animate-pulse">
            Get Ready...
          </div>
        </div>
      </div>
    );
  }

  // ANSWERING STATE
  if (gameState === 'answering') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex flex-col items-center justify-center p-4`}>
        <div className="max-w-4xl w-full">
          {/* Timer */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Timer size={32} className="text-gray-800" />
              <span className="text-5xl font-bold text-gray-800">{timeLeft}s</span>
            </div>
            <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 5 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Question {questionNumber} of {questions.length}
            </div>
            <div className="text-3xl font-bold text-gray-800 text-center">
              {currentQuestion.question}
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => submitAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`${answerColors[index]} ${
                  selectedAnswer === index ? 'ring-8 ring-white scale-105' : ''
                } text-white font-bold py-8 px-6 rounded-2xl text-2xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed flex items-center gap-4`}
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

  // RESULTS SCREEN
  if (gameState === 'results') {
    const sortedPlayers = [...roundResults].sort((a, b) => b.score - a.score);
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center p-4`}>
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Question {questionNumber} Results
            </h2>
            
            <div className="bg-gray-100 p-6 rounded-xl mb-6">
              <div className="text-xl text-gray-700 mb-3">
                <strong>Correct Answer:</strong>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {currentQuestion.options[currentQuestion.correct]}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sortedPlayers.map((player, idx) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-xl flex items-center justify-between ${
                    player.lastAnswer ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-600">#{idx + 1}</span>
                    <span className="text-2xl">{player.avatar?.emoji || '👤'}</span>
                    <div>
                      <div className="font-bold text-gray-800 text-lg">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.lastAnswer ? `+${player.lastPoints} pts` : '+0 pts'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl">{player.lastAnswer ? '✅' : '❌'}</div>
                    <div className="font-bold text-xl text-gray-800">{player.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={showExplanation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <BookOpen size={24} />
            See Explanation
          </button>
        </div>
      </div>
    );
  }

  // EXPLANATION SCREEN
  if (gameState === 'explanation') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.secondary} flex items-center justify-center p-4`}>
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <BookOpen size={64} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Mini Lesson</h2>
            <div className="text-xl text-gray-600">Why the answer is correct</div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-3">
              Question: {currentQuestion.question}
            </div>
            <div className="text-3xl font-bold text-green-600 mb-4">
              Answer: {currentQuestion.options[currentQuestion.correct]}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Explanation:</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>

          <button
            onClick={nextQuestion}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            {questionNumber >= questions.length ? 'See Final Scores' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  // FINAL SCORES
  if (gameState === 'finalScores') {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];
    const playerAnalysis = getPerformanceAnalysis(currentPlayer, questions.length);
    
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} flex items-center justify-center p-4`}>
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
            <div className="text-center mb-8">
              <Trophy size={96} className="mx-auto text-yellow-500 mb-4" />
              <h1 className="text-5xl font-bold text-gray-800 mb-2">Game Over!</h1>
              <div className="text-3xl text-gray-600 mb-2">Winner:</div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl">{winner.avatar?.emoji || '👑'}</span>
                <span className="text-4xl font-bold text-purple-600">{winner.name}</span>
              </div>
              <div className="text-2xl text-gray-600">{winner.score} points</div>
            </div>

            {/* Your Performance */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Your Performance
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-purple-600">{playerAnalysis.accuracy}%</div>
                  <div className="text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">{playerAnalysis.grade}</div>
                  <div className="text-gray-600">Grade</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{playerAnalysis.correctCount}/{questions.length}</div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">{playerAnalysis.avgPoints}</div>
                  <div className="text-gray-600">Avg Points</div>
                </div>
              </div>
              <p className="text-center text-lg text-gray-700 mt-4 font-semibold">
                {playerAnalysis.feedback}
              </p>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-4">Final Standings</h3>
              {sortedPlayers.map((player, idx) => (
                <div key={player.id} className="bg-gray-100 p-5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : getRandomEmoji(currentTheme, 'main')}
                    </span>
                    <span className="text-2xl">{player.avatar?.emoji || '👤'}</span>
                    <span className="text-2xl font-bold text-gray-800">{player.name}</span>
                    {player.isAI && (
                      <span className="text-sm bg-gray-300 px-2 py-1 rounded">AI</span>
                    )}
                  </div>
                  <span className="text-3xl font-bold text-purple-600">{player.score}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            Play Again 🎮
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SpookyCalculusKahoot;