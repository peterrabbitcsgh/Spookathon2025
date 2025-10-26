import React from 'react';
import { catAvatars } from '../data/avatars';

const AvatarSelection = ({ selectedAvatar, onSelect, onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-8 border-4 border-purple-500">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-purple-300 mb-2">
            🐈‍⬛ Choose Your Familiar 🐈‍⬛
          </h2>
          <p className="text-xl text-gray-300">
            Select a mystical cat companion for your journey
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {catAvatars.map(avatar => (
            <button
              key={avatar.id}
              onClick={() => onSelect(avatar)}
              className={`${avatar.color} p-6 rounded-2xl transition-all transform hover:scale-110 ${
                selectedAvatar?.id === avatar.id
                  ? 'ring-8 ring-yellow-400 scale-110 shadow-2xl'
                  : 'hover:ring-4 hover:ring-purple-400'
              }`}
            >
              <div className="text-6xl mb-2">{avatar.emoji}</div>
              <div className="text-white font-bold text-sm">{avatar.name}</div>
            </button>
          ))}
        </div>

        {selectedAvatar && (
          <div className="bg-purple-800 bg-opacity-50 p-6 rounded-xl mb-6 text-center animate-pulse">
            <div className="text-5xl mb-2">{selectedAvatar.emoji}</div>
            <div className="text-2xl font-bold text-purple-200 mb-1">
              {selectedAvatar.name}
            </div>
            <div className="text-gray-300 italic">
              {selectedAvatar.description}
            </div>
          </div>
        )}

        <button
          onClick={onContinue}
          disabled={!selectedAvatar}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl text-2xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {selectedAvatar ? '✨ Continue Your Quest ✨' : '🔒 Select a Familiar First'}
        </button>
      </div>
    </div>
  );
};

export default AvatarSelection;
