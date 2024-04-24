import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-12 bg-gradient-to-b from-[#ff6b00] to-[#333]">
    <div className="instructions mx-auto my-6 p-6 max-w-2xl rounded-lg shadow-md text-gray-700 bg-white">
      <h1 className="text-3xl text-center font-semibold mb-4">📋 How to Play Amazondle</h1>
      <p>Welcome to Amazondle, the game where you guess the prices of popular Amazon items! 🛒</p>
      <ol className="list-decimal list-inside">
        <li>Start the game to see an Amazon item with a hidden price. 🔍</li>
        <li>Enter your price guess in the provided input field. 💸</li>
        <li>Submit your guess to see if you’re right. 🎯</li>
        <li>If your guess is incorrect, you’ll be given a hint whether the actual price is higher or lower. ⬆️⬇️</li>
        <li>Keep guessing - the game will tell you if you need to guess higher or lower each time. 🔄</li>
        <li>You win when you guess the correct price! 🏆</li>
      </ol>
      <p>Each item will provide a new challenge, so put your pricing skills to the test and have fun! 🎉</p>
    </div>
    </div>
  );
};

export default Instructions;
