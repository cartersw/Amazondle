import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './AppHeader';
import './body';


export const Home = () =>{
    return(
        <div>
            <heading />
            <body />
            
        </div>

    );
}