import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
const randomItems: string[] = [
  "Microwave",
  "Spaghetti",
  "Refrigerator",
  "T-shirt",
  "Jeans",
  "Apple",
  "Toaster",
  "Blender",
  "Rice",
  "Coffee Maker",
  "Sweater",
  "Pants",
  "Banana",
  "Dishwasher",
  "Oven",
  "Chicken",
  "Washing Machine",
  "Hoodie",
  "Shoes",
  "Broccoli",
  "Vacuum Cleaner",
  "Skirt",
  "Carrots",
  "Jacket",
  "Ice Cream",
  "Air Fryer",
  "Bread",
  "Dress",
  "Pizza",
  "Slow Cooker",
  "Hat",
  "Tomatoes",
  "Iron",
  "Steak",
  "Scarf",
  "Mixer",
  "Soup",
  "Socks",
  "Espresso Machine",
  "Salad",
  "Tie",
  "Grill",
  "Cookies",
  "Fan",
  "Cheese",
  "Sandwich Maker",
  "Berries",
  "Gloves",
  "Electric Kettle",
  "Yogurt"
];


function Daily() {

  return <button className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-8 shadow-sm flex items-center justify-center text-3xl font-bold cursor-pointer transition-colors" onClick={() => window.location.href = '/pages/daily'}>Daily Theme</button>;
}

function Create() {
  
  return <button className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-8 shadow-sm flex items-center justify-center text-3xl font-bold cursor-pointer transition-colors" onClick={() => window.location.href = '/pages/create'}>Create Your Own</button>;
}

function getCurrentDay(): number {
  const now = new Date();
  return now.getDate(); 
}

function Body() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff6b00] to-[#333] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 max-w-6xl w-full">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Daily />
            <Create />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-4 shadow-sm">
            <div className="flex flex-col items-center justify-center mb-4">
              <h2 className="text-2xl font-bold text-white">Today's Theme</h2>
              <p className="text-4xl font-bold">{randomItems[getCurrentDay()]}</p>
            </div>
          </div>
          <div className="bg-[#222] text-white hover:bg-[#333] rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Daily Leaderboard</h2>
              <Link className="text-white hover:underline text-xl" href="#">
                View All
              </Link>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#222] text-white flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">John Doe</div>
                    <div className="text-[#ccc] dark:text-[#aaa] text-lg">Score: 98</div>
                  </div>
                </div>
                <div className="text-[#ccc] dark:text-[#aaa] text-lg">2 days ago</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#222] text-white flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">Jane Smith</div>
                    <div className="text-[#ccc] dark:text-[#aaa] text-lg">Score: 92</div>
                  </div>
                </div>
                <div className="text-[#ccc] dark:text-[#aaa] text-lg">3 days ago</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#222] text-white flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-white text-xl">Michael Johnson</div>
                    <div className="text-[#ccc] dark:text-[#aaa] text-lg">Score: 88</div>
                  </div>
                </div>
                <div className="text-[#ccc] dark:text-[#aaa] text-lg">4 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
  export default Body;