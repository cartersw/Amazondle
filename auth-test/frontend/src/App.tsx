// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import AppHeader from './AppHeader';
import About from './pages/about';
import Body from './Body';
import Leaderboard from './pages/Leaderboard';
import { SignedOut, SignedIn } from '@clerk/clerk-react';

function App() {
    return (
        <Router>
           <SignedOut>
                <Home />
           </SignedOut>
           <SignedIn>
                <AppHeader/>
                <Routes>
                    <Route path="/pages/about" element={<About />} />
                    <Route path="/" element={<Body />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
           </SignedIn>
        </Router>
    );
}

export default App;
