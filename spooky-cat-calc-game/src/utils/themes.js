// Theme system for different visual styles

export const themes = {
  spooky: {
    name: "🎃 Spooky Halloween",
    colors: {
      primary: "from-purple-600 to-orange-600",
      secondary: "from-purple-700 to-orange-700",
      accent: "bg-orange-500",
      text: "text-orange-300",
      jumpscare: "bg-red-600"
    },
    emojis: {
      main: ['🎃', '👻', '💀', '🦇', '🕷️'],
      correct: '✨',
      wrong: '💀',
      winner: '🏆'
    }
  },
  
  ocean: {
    name: "🌊 Underwater Adventure",
    colors: {
      primary: "from-blue-600 to-teal-600",
      secondary: "from-blue-700 to-teal-700",
      accent: "bg-teal-500",
      text: "text-teal-300",
      jumpscare: "bg-blue-900"
    },
    emojis: {
      main: ['🌊', '🐠', '🐚', '🐙', '🦈'],
      correct: '⭐',
      wrong: '🦈',
      winner: '👑'
    }
  },
  
  space: {
    name: "🚀 Space Odyssey",
    colors: {
      primary: "from-indigo-900 to-purple-900",
      secondary: "from-indigo-950 to-purple-950",
      accent: "bg-purple-500",
      text: "text-purple-200",
      jumpscare: "bg-black"
    },
    emojis: {
      main: ['🚀', '🌟', '🛸', '🌌', '👽'],
      correct: '⭐',
      wrong: '💥',
      winner: '🏆'
    }
  },
  
  retro: {
    name: "👾 Retro Arcade",
    colors: {
      primary: "from-pink-500 to-yellow-500",
      secondary: "from-pink-600 to-yellow-600",
      accent: "bg-yellow-400",
      text: "text-pink-300",
      jumpscare: "bg-pink-600"
    },
    emojis: {
      main: ['👾', '🕹️', '💎', '⚡', '🎮'],
      correct: '⭐',
      wrong: '💀',
      winner: '🏆'
    }
  },
  
  forest: {
    name: "🌲 Enchanted Forest",
    colors: {
      primary: "from-green-600 to-emerald-700",
      secondary: "from-green-700 to-emerald-800",
      accent: "bg-emerald-500",
      text: "text-emerald-300",
      jumpscare: "bg-green-900"
    },
    emojis: {
      main: ['🌲', '🍄', '🦌', '🌿', '🧚'],
      correct: '✨',
      wrong: '🍂',
      winner: '👑'
    }
  },
  
  neon: {
    name: "✨ Neon Nights",
    colors: {
      primary: "from-fuchsia-500 via-cyan-500 to-violet-500",
      secondary: "from-fuchsia-600 via-cyan-600 to-violet-600",
      accent: "bg-cyan-500",
      text: "text-fuchsia-300",
      jumpscare: "bg-fuchsia-700"
    },
    emojis: {
      main: ['✨', '💎', '🌈', '⚡', '💫'],
      correct: '✨',
      wrong: '💔',
      winner: '👑'
    }
  }
};

// Get random emoji from theme
export const getRandomEmoji = (theme, type = 'main') => {
  const emojis = themes[theme]?.emojis[type];
  if (Array.isArray(emojis)) {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
  return emojis || '🎃';
};

// Get theme by name
export const getTheme = (themeName) => {
  return themes[themeName] || themes.spooky;
};

// Get all theme names for selector
export const getThemeNames = () => {
  return Object.keys(themes);
};

export default themes;
