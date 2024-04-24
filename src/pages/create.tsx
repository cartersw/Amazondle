import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Component() {
  const [theme, setTheme] = useState(''); 
  const navigate = useNavigate(); 

  const handleEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default to avoid new line
      navigate('/pages/create-game', { state: { theme } }); // Navigate and pass state
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTheme(event.target.value); 
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#ff6b00] to-[#1e1e1e] text-white">
      <div className="max-w-6xl w-full space-y-6 rounded-lg bg-[#1e1e1e] p-24">
        <div className="rounded-lg bg-[#ff6b00] px-12 py-6 text-center font-bold text-4xl">Pick your theme</div>
        <textarea
          className="w-full h-32 p-4 rounded-lg bg-white text-black text-4xl"
          placeholder="Type your theme choice here..."
          onChange={handleChange}
          onKeyDown={handleEnterPress}
          value={theme}
        />
         <p className="text-center text-white text-2xl mt-2">Press Enter to submit</p>
      </div>
    </div>
  );
}