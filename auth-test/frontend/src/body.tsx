import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';


function Body(){
    return (
        <div>
        <p>Game page</p>
     </div>
    );
  }
  
  export default Body;