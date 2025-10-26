// Room code generation
export const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const calculatePoints = (isCorrect, timeLeft, maxTime = 20) => {
  if (!isCorrect) return 0;
  const timeBonus = Math.floor((timeLeft / maxTime) * 500);
  return Math.max(500, 500 + timeBonus);
};

export default {
  generateRoomCode,
  calculatePoints
};
