import './App.css';
import { useState, useEffect } from 'react';
import Game from './components/Game'
import Result from './components/Result';
import InfoModal from './components/InfoModal';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const toggleInfoModal = () => setShowInfoModal(!showInfoModal);
  const [state, setState] = useState('game');
  const startGame = () => setState('game');
  const maskString = (str) => {
    const firstChar = str.slice(0, 1);
    const maskedPart = "●".repeat(str.length - 1);
    return firstChar + maskedPart;
  }
  const shareOrCopyText = async (textToShare) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share this text',
          text: textToShare
        });
        console.log('Text successfully shared.');
      } catch (err) {
        console.error('There was an error sharing the text:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(textToShare);
        console.log('Text successfully copied to clipboard.');
        toast.info('Copied to clipboard', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } catch (err) {
        console.error('There was an error copying the text:', err);
      }
    }
  }
  const shareResults = async () => {
    const attempts = cookies['semantiq-attempts'];
    const maskedWord = maskString(word);
    const tries = attempts.attempts === 1 ? 'try' : 'tries';
    const text = `semantiq.app #${puzzle.id}: ${maskedWord} ${result.score}/4 after ${attempts.attempts} ${tries}`;
    shareOrCopyText(text);
  }
  const submit = word => {
    setLoadingResult(true);
    setWord(word);
    const body = {
      puzzle: puzzle,
      word: word,
    }
    fetch('https://semantiq-backend.onrender.com/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((res) => res.json())
      .then((data) => {
        if (data['error'] === "Invalid word") {
          toast.error('I don\'t know this word 😔', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setResult(data);
          setState('result');
          const attempts = cookies['semantiq-attempts'];
          if (attempts === undefined || attempts.puzzleId !== puzzle.id) {
            setCookie('semantiq-attempts', { puzzleId: puzzle.id, attempts: 1, highScore: data.score })
          } else {
            setCookie('semantiq-attempts', { puzzleId: puzzle.id, attempts: attempts.attempts + 1, highScore: Math.max(data.score, attempts.highScore) })
          }
        }
        setLoadingResult(false);
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

  const [cookies, setCookie] = useCookies(['semantiq-attempts']);

  return (
    <div className="flex flex-col h-screen justify-start bg-slate-50">
      <header className="text-lg">
        <button onClick={toggleInfoModal} className="h-8 aspect-square rounded-full text-slate-400 border-2 border-slate-400 justify-center m-4 text-center float-right scale-125">i</button>
      </header>
      <main className='z-0 grow flex flex-col'>
        {showInfoModal ? <InfoModal toggle={toggleInfoModal} /> : null}
        {state === 'game' && <Game puzzle={puzzle} submit={submit} />}
        {state === 'result' && <Result puzzle={puzzle} word={word} result={result} startGame={startGame} shareResults={shareResults}/>}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
