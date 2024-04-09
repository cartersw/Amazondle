import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App()
{
  const [count, setCount] = useState(0);

  const [target] = useState(parseFloat((Math.random() * 100).toFixed(2)));
  const [guess, setGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const updateCount = async () => {
    setCount(count + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    setGuess(value);
  };

  const handleGuess = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key != "Enter" || guess == "") return;

    const numGuess = parseFloat(guess).toFixed(2);

    setGuessList(currentList => [...currentList, numGuess]);

    if (parseFloat(numGuess) === target)
      setResponses(currentList => [...currentList, "Congratulations!"]);
    else if (parseFloat(numGuess) > target)
      setResponses(currentList => [...currentList, "Too high!"]);
    else
      setResponses(currentList => [...currentList, "Too low!"]);

    setGuess("");
    console.log(target);
    console.log(numGuess);
  };

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
            <div>
              <h1>?</h1>

              {guessList.map((g, i) => (
                <p key={i}>{g}: {responses[i]}</p>
              ))}
              <input type="number" value={guess} onChange={handleChange} onKeyDown={handleGuess}/>

            </div>

          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
