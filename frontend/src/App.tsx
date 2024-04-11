import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App()
{
  const [target] = useState(parseFloat((Math.random() * 100).toFixed(2)));
  const [guess, setGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

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

  const getColor = (value: number, ideal: number, range: number): string => {
    const distance = Math.abs(value - ideal);
    const normalizedDistance = Math.min(distance / range, 1);

    let color = "red";

    if (normalizedDistance < 0.1)
    {
      color = "green";
    }
    else if (normalizedDistance < 0.5)
    {
      const ratio = (normalizedDistance - 0.05) / 0.15;
      const green = 255;
      const red = Math.round(255 * ratio);
      color = `rgb(${red}, ${green}, 0)`;
    }
    else
    {
      const ratio = (normalizedDistance - 0.2) / 0.8;
      const green = Math.round(255 * (1 - ratio));
      const red = 255;
      color = `rgb(${red}, ${green}, 0)`;
    }

    return color;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div>
              <h1>?</h1>

              {guessList.map((g, i) => (
                <p key={i} style={{"backgroundColor": getColor(parseFloat(g), target, target * 2)}}>{g}: {responses[i]}</p>
              ))}
              <input value={guess} onChange={handleChange} onKeyDown={handleGuess}/>
            </div>
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
