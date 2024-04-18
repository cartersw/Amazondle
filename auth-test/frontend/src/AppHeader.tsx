import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import './index.css';

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

    const fetchCount = async () => {
        if (isSignedIn && user) {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCount(data.counter); // Ensure the API returns the counter directly under `data`
                } else {
                    console.error('Failed to fetch count');
                }
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        }
    };

    const updateCount = async () => {
        if (isSignedIn && user) {
            try {
                const response = await fetch(`http://localhost:5000/api/updateCount/${user.id}`, { method: 'POST' });
                if (response.ok) {
                    fetchCount();
                } else {
                    console.error('Failed to update count');
                }
            } catch (error) {
                console.error('Error updating count:', error);
            }
        } else {
            setCount(count + 1);
        }
    };

    useEffect(() => {
        fetchCount();
    }, [isSignedIn, user?.id]); // React to changes in user ID

    return (
      <header className="app-header">
          <div className="header-content">
              <div className="temp-text">About Us</div>
              <h1 className="amazondle">AMAZONDLE</h1>
              <div className="auth-buttons">
                  <SignedOut>
                      <SignUpButton />
                      <SignInButton />
                  </SignedOut>
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