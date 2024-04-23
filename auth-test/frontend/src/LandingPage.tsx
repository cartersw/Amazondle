// Home.tsx
import React from 'react';
import { SignedOut, useClerk } from '@clerk/clerk-react';
import backgroundImage from './assets/amazondlebackground.png'; // Ensure path is correct
import logo from './assets/logo.png';
import './index.css'

function SignUpButton() {
    const { openSignUp } = useClerk();
    return <button className="sign-up-btn" onClick={() => openSignUp({ redirectTo: '/app' })}>Sign up</button>;
}

function SignInButton() {
    const { openSignIn } = useClerk();
    return <button className="sign-in-btn" onClick={() => openSignIn({ redirectTo: '/app' })}>Sign in</button>;
}

function Home() {
    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
                <img src={logo} alt="Logo" className="landing-logo" />            
            <SignedOut>
                <div className="clerk-buttons">
                    <SignUpButton />
                    <SignInButton />
                </div>
                <div className="github">
                    <p><a href="https://github.com/cartersw/Amazondle" target="_blank" rel="noreferrer">GitHub</a></p>
                </div>
            </SignedOut>
        </div>
    );
}

export default Home;
