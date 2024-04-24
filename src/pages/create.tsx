
import './create.css'; // Assuming you will create a separate CSS file for styles
import React, { useState } from 'react';




export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#ff6b00] to-[#1e1e1e] text-white">
      <div className="max-w-6xl w-full space-y-6 rounded-lg bg-[#1e1e1e] p-24">
        <div className="rounded-lg bg-[#ff6b00] px-12 py-6 text-center font-bold text-4xl">Pick your theme</div>
        
        {}
        <textarea
          className="w-full h-32 p-4 rounded-lg bg-white text-black text-4xl"
          placeholder="Type your theme choice here..."
        ></textarea>
        
      </div>
    </div>
  )
}