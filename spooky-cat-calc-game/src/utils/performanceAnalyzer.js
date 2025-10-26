// Analyze player performance
export const analyzePerformance = (player, totalQuestions) => {
  const answers = player.answers || [];
  const correctAnswers = answers.filter(a => a.correct);
  const correctCount = correctAnswers.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  
  // Calculate average time taken
  const totalPoints = player.score || 0;
  const avgPoints = totalQuestions > 0 ? Math.round(totalPoints / totalQuestions) : 0;
  
  // Determine grade
  let grade = 'F';
  let gradeColor = 'text-red-600';
  
  if (accuracy >= 90) {
    grade = 'A+';
    gradeColor = 'text-green-600';
  } else if (accuracy >= 85) {
    grade = 'A';
    gradeColor = 'text-green-500';
  } else if (accuracy >= 80) {
    grade = 'A-';
    gradeColor = 'text-green-400';
  } else if (accuracy >= 75) {
    grade = 'B+';
    gradeColor = 'text-blue-500';
  } else if (accuracy >= 70) {
    grade = 'B';
    gradeColor = 'text-blue-400';
  } else if (accuracy >= 65) {
    grade = 'B-';
    gradeColor = 'text-blue-300';
  } else if (accuracy >= 60) {
    grade = 'C+';
    gradeColor = 'text-yellow-500';
  } else if (accuracy >= 55) {
    grade = 'C';
    gradeColor = 'text-yellow-400';
  } else if (accuracy >= 50) {
    grade = 'C-';
    gradeColor = 'text-orange-500';
  } else if (accuracy >= 45) {
    grade = 'D';
    gradeColor = 'text-orange-600';
  }
  
  // Feedback messages
  let feedback = '';
  let emoji = '';
  
  if (accuracy >= 90) {
    feedback = "Outstanding! You're a calculus master!";
    emoji = '🏆';
  } else if (accuracy >= 80) {
    feedback = "Excellent work! Keep it up!";
    emoji = '⭐';
  } else if (accuracy >= 70) {
    feedback = "Good job! You're getting there!";
    emoji = '👍';
  } else if (accuracy >= 60) {
    feedback = "Not bad! Keep practicing!";
    emoji = '📚';
  } else if (accuracy >= 50) {
    feedback = "You can do better! More practice needed.";
    emoji = '💪';
  } else {
    feedback = "Keep studying! Don't give up!";
    emoji = '🎯';
  }
  
  // Streak calculation
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  
  answers.forEach(answer => {
    if (answer.correct) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });
  
  // Check if last answers were correct
  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i].correct) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  return {
    correctCount,
    totalQuestions,
    accuracy,
    grade,
    gradeColor,
    feedback,
    emoji,
    avgPoints,
    currentStreak,
    maxStreak,
    totalPoints
  };
};

export const getSpeedRating = (avgPoints) => {
  if (avgPoints >= 900) return { rating: 'Lightning Fast', emoji: '⚡', color: 'text-yellow-500' };
  if (avgPoints >= 800) return { rating: 'Very Quick', emoji: '🚀', color: 'text-blue-500' };
  if (avgPoints >= 700) return { rating: 'Fast', emoji: '🏃', color: 'text-green-500' };
  if (avgPoints >= 600) return { rating: 'Moderate', emoji: '🚶', color: 'text-gray-500' };
  return { rating: 'Careful', emoji: '🐢', color: 'text-orange-500' };
};

export default analyzePerformance;
