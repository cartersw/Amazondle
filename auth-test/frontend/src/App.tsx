import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function SignUpButton() {
  const clerk = useClerk();
  return (
    <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
      Sign up
    </button>
  );
}

function SignInButton() {
  const clerk = useClerk();
  return (
    <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
      Sign in
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const { isSignedIn, user } = useUser();

  // Fetch the count from the backend when the user is signed in
  // Update fetch !!!
  const fetchCount = async () => {
    if (isSignedIn && user) {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setCount(data.data.counter);
        } else {
          console.error('Failed to fetch count');
        }
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    }
  };

  // Update the count in the backend or locally based on the user's sign-in state
  // Update fetch !!!
  const updateCount = async () => {
    if (isSignedIn && user) {
      try {
        const response = await fetch(`http://localhost:5000/api/updateCount/${user.id}`, { method: 'POST' });
        if (response.ok) {
          fetchCount(); // Fetch the updated count
        } else {
          console.error('Failed to update count');
        }
      } catch (error) {
        console.error('Error updating count:', error);
      }
    } else {
      // Update count locally for guests (not signed in)
      setCount(count + 1);
    }
  };

  // Use useEffect to fetch the count when the user's sign-in state changes
  useEffect(() => {
    fetchCount();
  }, [isSignedIn, user]);

  return (
    <Router>
      <header className="app-header">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <SignedOut>
          <SignUpButton />
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={updateCount}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
