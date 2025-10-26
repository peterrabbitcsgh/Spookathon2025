// Spooky cat avatars for players
export const catAvatars = [
  {
    id: 1,
    name: "Shadow",
    emoji: "🐈‍⬛",
    color: "bg-gray-800",
    description: "The mysterious black cat"
  },
  {
    id: 2,
    name: "Pumpkin",
    emoji: "🐱",
    color: "bg-orange-500",
    description: "The Halloween spirit"
  },
  {
    id: 3,
    name: "Whiskers",
    emoji: "😺",
    color: "bg-purple-500",
    description: "The friendly feline"
  },
  {
    id: 4,
    name: "Ghost Cat",
    emoji: "😸",
    color: "bg-blue-500",
    description: "The playful phantom"
  },
  {
    id: 5,
    name: "Midnight",
    emoji: "😹",
    color: "bg-indigo-600",
    description: "The laughing shadow"
  }
];

export const getCatAvatar = (id) => {
  return catAvatars.find(avatar => avatar.id === id) || catAvatars[0];
};

export default catAvatars;