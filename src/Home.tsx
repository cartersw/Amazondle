// Home.tsx
import React from 'react';
import { SignedOut, useClerk } from '@clerk/clerk-react';
import backgroundImage from './assets/amazondlebackground.png'; // Ensure path is correct
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

function SignUpButton() {
    const { openSignUp } = useClerk();
    return <button className="inline-flex flex-1 h-16 items-center justify-center rounded-lg bg-[#ff6b00] px-8 text-sm font-bold text-white shadow transition-colors hover:bg-[#e65c00] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6b00] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#ff6b00] dark:text-white dark:hover:bg-[#e65c00] dark:focus-visible:ring-[#ff6b00]" onClick={() => openSignUp({ redirectTo: '/app' })}>Sign up</button>;
}

function SignInButton() {
    const { openSignIn } = useClerk();
    return <button className="inline-flex flex-1 h-16 items-center justify-center rounded-lg border border-[#404040] bg-[#1a1a1a] px-8 text-sm font-bold text-[#b3b3b3] shadow-sm transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6b00] disabled:pointer-events-none disabled:opacity-50 dark:border-[#404040] dark:bg-[#1a1a1a] dark:hover:bg-[#333333] dark:hover:text-white dark:focus-visible:ring-[#ff6b00]" onClick={() => openSignIn({ redirectTo: '/app' })}>Sign in</button>;
}
function Home() {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen py-12 px-4 bg-gradient-to-br from-[#1a1a1a] to-[#ff6b00]">
      <div className="space-y-8 max-w-md mx-auto text-left">
        <div className="space-y-4">
          <img
            alt="Amazondle"
            className="mx-auto"
            
            src="/logo.png"
            style={{
              objectFit: "contain",
              width: "100%", 
              height: "auto" 
            }}
            
          />
          <p className="text-[#b3b3b3] text-xl">Guess the price of Amazon products and test your shopping skills.</p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
        <SignInButton />
        <SignUpButton />
        </div>
        <a
            className="inline-flex w-full h-16 items-center rounded-lg border border-[#404040] bg-[#1a1a1a] px-8 text-sm font-medium text-[#b3b3b3] shadow-sm justify-center transition-colors hover:bg-[#333333] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6b00] disabled:pointer-events-none disabled:opacity-50 dark:border-[#404040] dark:bg-[#1a1a1a] dark:hover:bg-[#333333] dark:hover:text-white dark:focus-visible:ring-[#ff6b00]"
            href="https://github.com/cartersw/Amazondle"
          >
            View on GitHub
          </a>
      </div>
      <div className="hidden md:block">
        <img
          alt="Amazondle"
          className="aspect-[3/2] object-cover rounded-lg"
          height={533}
          src="/amazondlebackground.png"
          width={800}
        />
      </div>
    </div>
  )
}
export default Home;


