// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import AppHeader from './AppHeader';
import About from './pages/about';
import Home from './Home';
import { SignedOut, SignedIn } from '@clerk/clerk-react';

function App() {
    return (
        <Router>
           <SignedOut>
                <LandingPage />
           </SignedOut>
           <SignedIn>
                <AppHeader/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/app" />} />
                    <Route path="/app" element={<Home />} />
                    <Route path="/pages/about" element={<About />} />
                </Routes>
           </SignedIn>
        </Router>
    );
}

export default App;
