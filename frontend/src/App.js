import './App.css';
import { useState, useEffect } from 'react';
import Game from './components/Game'
import Introduction from './components/Introduction'
import Result from './components/Result';

function App() {
  const [puzzle, setPuzzle] = useState({
    "groupNeg": [],
    "groupPos": []
  });
  const [loadingPuzzle, setLoadingPuzzle] = useState(true);
  const [result, setResult] = useState({
    score: 0,
    topWords: []
  })
  const [loadingResult, setLoadingResult] = useState(true);
  const [word, setWord] = useState('');
  const [state, setState] = useState('intro');
  const startGame = () => setState('game');
  const submit = word => {
    setLoadingResult(true);
    setWord(word);
    const body = {
      puzzle: puzzle,
      word: word,
    }
    console.log(body)
    fetch('https://semantiq-backend.onrender.com/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        setLoadingResult(false);
        setState('result');
      })
  }

  useEffect(() => {
    fetch('https://semantiq-backend.onrender.com/get_puzzle')
      .then((res) => res.json())
      .then((data) => {
        setPuzzle(data);
        setLoadingPuzzle(false);
      })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        SemantIQ
      </header>
      <main>
        {state === 'intro' && <Introduction puzzle={puzzle} startGame={startGame} />}
        {state === 'game' && <Game puzzle={puzzle} submit={submit} />}
        {state === 'result' && <Result puzzle={puzzle} word={word} result={result} startGame={startGame} />}

      </main>
      <footer>
        <div>Rules</div>
        <div>Created @HackZurich by Fela, Loris & Alex</div>
      </footer>
    </div>
  );
}

export default App;
