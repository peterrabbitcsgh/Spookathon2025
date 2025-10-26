// Complete question bank organized by difficulty
export const questionBank = [
  // EASY QUESTIONS
  {
    id: 1,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = x³?",
    options: ["3x²", "x²", "3x", "x³"],
    correct: 0,
    explanation: "Using the power rule d/dx(xⁿ) = n·xⁿ⁻¹, we bring down the exponent 3 and multiply by x raised to (3-1). So d/dx(x³) = 3x²."
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = 5x?",
    options: ["5", "5x", "x", "0"],
    correct: 0,
    explanation: "For any linear function f(x) = ax, the derivative is just the coefficient a. So d/dx(5x) = 5."
  },
  {
    id: 3,
    difficulty: 'easy',
    question: "What is the derivative of a constant, f(x) = 7?",
    options: ["0", "7", "1", "7x"],
    correct: 0,
    explanation: "The derivative of any constant is always 0, because constants don't change!"
  },
  {
    id: 4,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = x?",
    options: ["1", "x", "0", "2x"],
    correct: 0,
    explanation: "The derivative of x is 1. Think of it as x¹, using power rule: 1·x⁰ = 1."
  },
  {
    id: 5,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = x²?",
    options: ["2x", "x", "2", "x²"],
    correct: 0,
    explanation: "Using the power rule: d/dx(x²) = 2·x¹ = 2x."
  },
  {
    id: 6,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = 3x²?",
    options: ["6x", "3x", "6x²", "3"],
    correct: 0,
    explanation: "Power rule plus constant multiple: d/dx(3x²) = 3·2x = 6x."
  },
  {
    id: 7,
    difficulty: 'easy',
    question: "What is the derivative of f(x) = x⁴?",
    options: ["4x³", "x³", "4x", "x⁴"],
    correct: 0,
    explanation: "Power rule: d/dx(x⁴) = 4·x³ = 4x³."
  },

  // MEDIUM QUESTIONS
  {
    id: 8,
    difficulty: 'medium',
    question: "What is the derivative of f(x) = 5x² + 3x - 7?",
    options: ["10x + 3", "5x + 3", "10x² + 3x", "5x - 7"],
    correct: 0,
    explanation: "We differentiate each term separately: d/dx(5x²) = 10x, d/dx(3x) = 3, and d/dx(-7) = 0. Result: 10x + 3."
  },
  {
    id: 9,
    difficulty: 'medium',
    question: "If f(x) = sin(x), what is f'(x)?",
    options: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"],
    correct: 0,
    explanation: "This is a fundamental derivative rule: the derivative of sin(x) is cos(x)."
  },
  {
    id: 10,
    difficulty: 'medium',
    question: "What is the derivative of f(x) = eˣ?",
    options: ["eˣ", "xeˣ⁻¹", "ln(x)", "e"],
    correct: 0,
    explanation: "The exponential function eˣ is unique because it's its own derivative! d/dx(eˣ) = eˣ."
  },
  {
    id: 11,
    difficulty: 'medium',
    question: "What is the derivative of f(x) = x⁻²?",
    options: ["-2x⁻³", "2x⁻³", "-2x⁻¹", "x⁻³"],
    correct: 0,
    explanation: "Using the power rule with negative exponents: d/dx(x⁻²) = -2·x⁻³ = -2x⁻³."
  },
  {
    id: 12,
    difficulty: 'medium',
    question: "If f(x) = ln(x), what is f'(x)?",
    options: ["1/x", "ln(x)", "x", "e/x"],
    correct: 0,
    explanation: "The derivative of the natural logarithm ln(x) is 1/x."
  },
  {
    id: 13,
    difficulty: 'medium',
    question: "What is the derivative of f(x) = cos(x)?",
    options: ["-sin(x)", "sin(x)", "-cos(x)", "tan(x)"],
    correct: 0,
    explanation: "The derivative of cos(x) is -sin(x). Notice the negative sign!"
  },
  {
    id: 14,
    difficulty: 'medium',
    question: "What is the derivative of f(x) = 4x³ - 2x² + x?",
    options: ["12x² - 4x + 1", "4x² - 2x", "12x² - 4x", "4x³ - 4x"],
    correct: 0,
    explanation: "Differentiate term by term: d/dx(4x³) = 12x², d/dx(-2x²) = -4x, d/dx(x) = 1. Result: 12x² - 4x + 1."
  },

  // HARD QUESTIONS
  {
    id: 15,
    difficulty: 'hard',
    question: "Using the chain rule, what is d/dx[sin(3x)]?",
    options: ["3cos(3x)", "cos(3x)", "3sin(3x)", "-3cos(3x)"],
    correct: 0,
    explanation: "Using the chain rule: d/dx[sin(u)] = cos(u)·du/dx. Here u = 3x, so du/dx = 3. Therefore: d/dx[sin(3x)] = 3cos(3x)."
  },
  {
    id: 16,
    difficulty: 'hard',
    question: "Using the product rule, what is d/dx[x·sin(x)]?",
    options: ["sin(x) + x·cos(x)", "x·cos(x)", "sin(x)·cos(x)", "cos(x)"],
    correct: 0,
    explanation: "Product rule: d/dx[u·v] = u'v + uv'. Here u = x (u' = 1) and v = sin(x) (v' = cos(x)). Result: sin(x) + x·cos(x)."
  },
  {
    id: 17,
    difficulty: 'hard',
    question: "What is d/dx[x² · eˣ] using the product rule?",
    options: ["2x·eˣ + x²·eˣ", "2x·eˣ", "x²·eˣ", "2xeˣ⁻¹"],
    correct: 0,
    explanation: "Product rule: u = x² (u' = 2x) and v = eˣ (v' = eˣ). Result: 2x·eˣ + x²·eˣ = eˣ(2x + x²)."
  },
  {
    id: 18,
    difficulty: 'hard',
    question: "Using the quotient rule, what is d/dx[x/(x+1)]?",
    options: ["1/(x+1)²", "1/(x+1)", "x/(x+1)²", "0"],
    correct: 0,
    explanation: "Quotient rule: d/dx[u/v] = (u'v - uv')/v². Here u = x, v = x+1. Result: [(1)(x+1) - x(1)]/(x+1)² = 1/(x+1)²."
  },
  {
    id: 19,
    difficulty: 'hard',
    question: "What is d/dx[e^(x²)]?",
    options: ["2x·e^(x²)", "e^(x²)", "x²·e^(x²)", "2xe^x"],
    correct: 0,
    explanation: "Chain rule: d/dx[e^u] = e^u·du/dx. Here u = x², so du/dx = 2x. Result: 2x·e^(x²)."
  },
  {
    id: 20,
    difficulty: 'hard',
    question: "What is d/dx[ln(x²)]?",
    options: ["2/x", "1/x²", "2x", "1/x"],
    correct: 0,
    explanation: "Chain rule: d/dx[ln(u)] = (1/u)·du/dx. Here u = x², so du/dx = 2x. Result: (1/x²)·2x = 2/x."
  }
];

// Filter questions by difficulty
export const getQuestionsByDifficulty = (difficulty) => {
  return questionBank.filter(q => q.difficulty === difficulty);
};

// Get mixed difficulty questions
export const getMixedQuestions = (count, difficulties = ['easy', 'medium', 'hard']) => {
  const filtered = questionBank.filter(q => difficulties.includes(q.difficulty));
  return filtered.sort(() => Math.random() - 0.5).slice(0, count);
};

// Get questions for game (random selection)
export const getGameQuestions = (count, difficulty = 'all') => {
  let pool = questionBank;
  
  if (difficulty !== 'all') {
    pool = getQuestionsByDifficulty(difficulty);
  }
  
  return pool.sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
};
