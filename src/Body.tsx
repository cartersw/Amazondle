import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import axios from "axios";
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
  "Toaster Stroodle",
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

function Instructions() {
  
  return <button className="bg-[#ffffff] text-black hover:bg-[#ababab] rounded-lg p-8 shadow-sm flex items-center justify-center text-3xl font-bold cursor-pointer transition-colors" onClick={() => window.location.href = '/pages/instructions'}>How to play</button>;
}


function getCurrentDay(): number {
  
  const now = new Date();
  return now.getDate(); 
}

function Body() {

  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://c9a1-69-109-176-86.ngrok-free.app/api/user/${user.username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 404) {
          setError("User not found");
        } else {
          setError("An error occurred while fetching user data");
        }
      }
    };

    if (user && user.username) {
      fetchUserData();
    }
  }, [user.username]);

  // Before using userData, check if it exists and has data
  if (!userData || !userData.data) {
    return <div>Loading...</div>; // or some other placeholder
  }

  const { username, gamesPlayed, attemptsCorrect, attemptsWrong } = userData.data;
  

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff6b00] to-[#333] flex flex-col items-center justify-center px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 max-w-6xl w-full">
    
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-6">
          <div className="w-full flex justify-center">
          <Instructions />
        </div>
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
            <div className="flex flex-col items-center justify-center mb-6">
              <h2 className="text-2xl font-bold text-white">Player Stats</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold flex items-center">
                  <CheckIcon className="h-6 w-6 mr-2 text-green-500" />
                  {attemptsCorrect}
                </div>
                <div className="text-lg text-[#ccc] dark:text-[#aaa]">Correct Guesses</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold flex items-center">
                  <XIcon className="h-6 w-6 mr-2 text-red-500" />
                  {attemptsWrong}
                </div>
                <div className="text-lg text-[#ccc] dark:text-[#aaa]">Incorrect Guesses</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold flex items-center">
                  <PercentIcon className="h-6 w-6 mr-2" />
                  {(attemptsWrong / attemptsCorrect).toFixed(2)}
                </div>
                <div className="text-lg text-[#ccc] dark:text-[#aaa]">Average Guesses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}


function PercentIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
  export default Body;