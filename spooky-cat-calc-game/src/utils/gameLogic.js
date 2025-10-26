// Game utility functions

export const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const calculatePoints = (isCorrect, timeLeft, maxTime = 20) => {
  if (!isCorrect) return 0;
  // More points for faster answers
  const timeBonus = Math.floor((timeLeft / maxTime) * 500);
  return Math.max(500, 500 + timeBonus);
};

export const simulateOtherPlayers = (players, currentPlayerId, isCorrect) => {
  return players.map(p => {
    if (p.id === currentPlayerId) return p;
    
    // AI players have varying skill levels
    const aiSkillLevel = p.skillLevel || 0.65; // 65% correct rate by default
    const randomCorrect = Math.random() < aiSkillLevel;
    const randomTimeLeft = Math.floor(Math.random() * 15) + 5; // 5-20 seconds
    const randomPoints = randomCorrect ? calculatePoints(randomCorrect, randomTimeLeft) : 0;
    
    return {
      ...p,
      score: p.score + randomPoints,
      lastAnswer: randomCorrect,
      lastPoints: randomPoints
    };
  });
};

export const generateAIPlayers = (count) => {
  const funnyNames = [
    'MathWizard', 'DerivativeDemon', 'CalculusKing', 'NumberNinja',
    'AlgebraAce', 'TrigTitan', 'IntegralHero', 'FunctionPhantom',
    'EquationExpert', 'ProofPro', 'LimitLord', 'TheoremThrasher',
    'AxiomAvenger', 'FormulaFiend', 'GraphGuru', 'SlopeSamurai',
    'TangentTornado', 'ChainRuleChamp', 'ProductPrince', 'QuotientQueen'
  ];
  
  const skillLevels = [0.5, 0.6, 0.65, 0.7, 0.75, 0.8]; // Varying difficulty
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ai-${Date.now()}-${i}`,
    name: funnyNames[Math.floor(Math.random() * funnyNames.length)],
    score: 0,
    isAI: true,
    skillLevel: skillLevels[Math.floor(Math.random() * skillLevels.length)],
    lastAnswer: null,
    lastPoints: 0
  }));
};

export const formatTime = (seconds) => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getPerformanceAnalysis = (player, totalQuestions) => {
  const correctCount = player.answers?.filter(a => a.correct).length || 0;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const avgPoints = Math.round(player.score / totalQuestions);
  
  let grade = 'F';
  if (accuracy >= 90) grade = 'A+';
  else if (accuracy >= 80) grade = 'A';
  else if (accuracy >= 70) grade = 'B';
  else if (accuracy >= 60) grade = 'C';
  else if (accuracy >= 50) grade = 'D';
  
  let feedback = '';
  if (accuracy >= 90) feedback = 'Outstanding! You\'re a calculus master! 🏆';
  else if (accuracy >= 80) feedback = 'Excellent work! Keep it up! ⭐';
  else if (accuracy >= 70) feedback = 'Good job! You\'re getting there! 👍';
  else if (accuracy >= 60) feedback = 'Not bad! Keep practicing! 📚';
  else feedback = 'Keep studying! You can do better! 💪';
  
  return {
    correctCount,
    accuracy,
    avgPoints,
    grade,
    feedback
  };
};

export const avatars = [
  { id: 1, emoji: '🎃', name: 'Pumpkin' },
  { id: 2, emoji: '👻', name: 'Ghost' },
  { id: 3, emoji: '💀', name: 'Skeleton' },
  { id: 4, emoji: '🦇', name: 'Bat' },
  { id: 5, emoji: '🐱', name: 'Black Cat' },
  { id: 6, emoji: '🧛', name: 'Vampire' },
  { id: 7, emoji: '🧟', name: 'Zombie' },
  { id: 8, emoji: '🕷️', name: 'Spider' }
];

export default {
  generateRoomCode,
  calculatePoints,
  simulateOtherPlayers,
  generateAIPlayers,
  formatTime,
  getPerformanceAnalysis,
  avatars
};
