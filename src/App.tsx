// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import AppHeader from './AppHeader';
import About from './pages/about';
import Body from './Body';
import Daily from './pages/daily';
import Create from './pages/create';
import CreateGame from './pages/create-game';
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
                    <Route path="/pages/daily" element={<Daily />} />
                    <Route path="/pages/create" element={<Create />} />
                    <Route path="/pages/create-game" element={<CreateGame />} />
                </Routes>
           </SignedIn>
        </Router>
    );
}

export default App;
