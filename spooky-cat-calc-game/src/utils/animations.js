// Animation helper utilities

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 }
};

export const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 }
};

export const shakeAnimation = {
  animate: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.5 }
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 1.5 }
  }
};

export const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
  }
};

export const getRandomPosition = () => ({
  x: Math.random() * 100 - 50,
  y: Math.random() * 100 - 50
});

export const ghostFloat = {
  animate: {
    y: [0, -20, 0],
    x: [-5, 5, -5],
    rotate: [-5, 5, -5],
    transition: { 
      repeat: Infinity, 
      duration: 3,
      ease: "easeInOut"
    }
  }
};

export default {
  fadeIn,
  slideUp,
  scaleIn,
  shakeAnimation,
  pulseAnimation,
  floatAnimation,
  ghostFloat
};