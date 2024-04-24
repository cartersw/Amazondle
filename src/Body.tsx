import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';

function Daily() {

  return <button className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-6 shadow-sm flex items-center justify-center text-xl font-semibold cursor-pointer transition-colors" onClick={() => window.location.href = '/pages/about'}>Daily Item</button>;
}

function Create() {
  
  return <button className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-6 shadow-sm flex items-center justify-center text-xl font-semibold cursor-pointer transition-colors" onClick={() => window.location.href = '/pages/about'}>Create</button>;
}


function Body() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff6b00] to-[#333] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl w-full">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Daily />
            <Create/>
            </div>
          </div>
        </div>
        <div className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Leaderboard</h2>
            <Link className="text-white hover:underline" href="#">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <div className="font-medium text-white">John Doe</div>
                  <div className="text-[#ccc] dark:text-[#aaa] text-sm">Score: 98</div>
                </div>
              </div>
              <div className="text-[#ccc] dark:text-[#aaa] text-sm">2 days ago</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <div className="font-medium text-white">Jane Smith</div>
                  <div className="text-[#ccc] dark:text-[#aaa] text-sm">Score: 92</div>
                </div>
              </div>
              <div className="text-[#ccc] dark:text-[#aaa] text-sm">3 days ago</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <div className="font-medium text-white">Michael Johnson</div>
                  <div className="text-[#ccc] dark:text-[#aaa] text-sm">Score: 88</div>
                </div>
              </div>
              <div className="text-[#ccc] dark:text-[#aaa] text-sm">4 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
  export default Body;