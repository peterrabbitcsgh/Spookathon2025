import React from 'react';

const GameSettings = ({ questionCount, setQuestionCount }) => {
	return (
		<div className="bg-gray-900 bg-opacity-80 rounded-2xl p-8 max-w-md mx-auto mt-10 shadow-xl border-4 border-purple-500">
			<h2 className="text-3xl font-bold text-purple-300 mb-4 text-center">Game Settings</h2>
			<div className="mb-6">
				<label htmlFor="questionCount" className="block text-lg text-gray-200 mb-2 font-semibold">
					Number of Questions
				</label>
				<input
					type="range"
					id="questionCount"
					min={1}
					max={20}
					value={questionCount}
					onChange={e => setQuestionCount(Number(e.target.value))}
					className="w-full accent-purple-500"
				/>
				<div className="flex justify-between items-center mt-2">
					<span className="text-gray-400">1</span>
					<input
						type="number"
						min={1}
						max={20}
						value={questionCount}
						onChange={e => {
							let val = Number(e.target.value);
							if (val < 1) val = 1;
							if (val > 20) val = 20;
							setQuestionCount(val);
						}}
						className="w-16 text-center bg-gray-800 text-purple-200 font-bold rounded border border-purple-400"
					/>
					<span className="text-gray-400">20</span>
				</div>
			</div>
		</div>
	);
};

export default GameSettings;
