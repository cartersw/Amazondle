import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

import './index.css';
import logo from './assets/logo.png';

function SignUpButton() {
    const clerk = useClerk();
    return <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>Sign up</button>;
}

function SignInButton() {
    const clerk = useClerk();
    return <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>Sign in</button>;
}




function AppHeader() {
    const { isSignedIn, user } = useUser();
    const [count, setCount] = useState(0);

  
    

    useEffect(() => {
        
    }, [isSignedIn, user?.id]); // React to changes in user ID

    return (
      <header className="app-header">
          <div className="header-content">
          <div className="left-content"> {/* New div for left-aligned buttons */}
          <button onClick={() => window.location.href = '/'}>Home</button>
          <button onClick={() => window.location.href = '/pages/about'}>About Us</button>
         
          
        </div>
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
              <div className="auth-buttons">
                  
                  <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                  </SignedIn>
              </div>
          </div>
          <div className="header-underline"></div>
      </header>
  );
}

export default AppHeader;