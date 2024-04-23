// src/components/HomePage.tsx

import React from 'react';
import { UserButton, UserProfile, useUser, useAuth } from '@clerk/clerk-react';

const Home = () => {
    const { user: userFromUserHook } = useUser();
    const { userId } = useAuth();
    const username = userFromUserHook?.username;
   
    

  return (
    <div>
      <h1>Welcome, {username}!</h1>

      <button onClick={() => window.location.href = '/pages/about'}>About Us</button>
      <button onClick={() => window.location.href = '/leaderboard'}>Leaderboard</button>
    </div>
  );
};

export default Home;
