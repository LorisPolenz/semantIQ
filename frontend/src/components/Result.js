import ScoreBoard from "./ScoreBoard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faRotateLeft } from '@fortawesome/free-solid-svg-icons'


function Result({ puzzle, word, result, startGame, shareResults }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const { score, topWords } = result;

  const wordPair = (w1, w2) =>
    <div className="space-x-6 text-center"><span className={topWords.includes(w1) ? match.includes(w1) ? 'text-green-700' : avoid.includes(w1) ? 'text-red-700' : null : null}>{w1}</span><span className={topWords.includes(w2) ? match.includes(w2) ? 'text-green-700' : avoid.includes(w2) ? 'text-red-700' : null : null}>{w2}</span></div>
  const wordGroup = words => <div className="content-center text-2xl text-slate-700 leading-tight">
    {wordPair(words[0], words[1])}
    <div className="space-x-6 text-center">
      <span className={topWords.includes(words[2]) ? match.includes(words[2]) ? 'text-green-700' : avoid.includes(words[2]) ? 'text-red-700' : null : null}>{words[2]}</span></div>
  </div>

  return (
    <>
      <section >

      </section>
      <section className="pt-6 pb-4">
        <p className="text-center text-slate-400 text-lg">results</p>
        {wordGroup(match)}
      </section>
      <section className="grid text-center text-slate-800 content-center place-items-center">
        <div className="bg-white text-slate-800 border-2 border-slate-400 py-1 px-4 rounded mt-2 text-2xl w-2/3 text-center">
          {word}
        </div>

      </section>
      <section className="pt-4 pb-6">
        {wordGroup(avoid)}
      </section>

      <section className="grid text-center mb-6 text-slate-800 content-center place-items-center">
        <div className="text-center text-slate-400 text-lg mb-1">score</div>
        <ScoreBoard score={score} maxScore={topWords?.length} />
      </section>
      <section className="flex flex-row justify-center gap-4 mt-2 px-10">
        <button onClick={shareResults} className="text-slate-100 bg-slate-400 hover:bg-slate-600 active:bg-slate-600 py-1 px-6 rounded text-lg text-center aspect-square">
          <FontAwesomeIcon icon={faShare} size="3x" />
          <p>share score</p>
        </button>
        <button onClick={startGame} className="text-slate-100 bg-slate-400 hover:bg-slate-600 active:bg-slate-600 py-1 px-7 rounded text-lg text-center">
          <FontAwesomeIcon icon={faRotateLeft} size="3x" />
          <p>play again</p>
        </button>
      </section>

    </>
  )
}

export default Result;
