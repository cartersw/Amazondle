// Home.tsx
import React from 'react';
import { SignedOut, useClerk } from '@clerk/clerk-react';
import backgroundImage from './assets/amazondlebackground.png'; // Ensure path is correct
import logo from './assets/logo.png';

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
                <img src={logo} alt="Logo" className="logo" style={{ width: '30%', height: 'auto', marginTop: '-28%' }} />            
            <SignedOut>
                <SignUpButton />
                <SignInButton />
            </SignedOut>
        </div>
    );
}

export default Home;
