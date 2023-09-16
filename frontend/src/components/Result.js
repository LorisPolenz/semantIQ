import ScoreBoard from "./ScoreBoard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faRotateLeft } from '@fortawesome/free-solid-svg-icons'


function Result({ puzzle, word, result, startGame }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const { score, topWords } = result;
  const wordGroup = words => <div className="grid grid-cols-2 gap-2 mx-20 text-slate-700">
    {
      words.map(word => {
        let color = 'text-slate-300';
        if (match.includes(word) && topWords.includes(word)) color = 'text-green-700';
        if (avoid.includes(word) && topWords.includes(word)) color = 'text-red-700';
        return <div className={`text-center text-2xl ${color}`} key={word}>{word}</div>
      })
    }
  </div>

  return (
    <>
      <section className="text-center text-slate-400 text-lg">
        results
      </section>
      <section className="pt-8 pb-4">
        {wordGroup(match)}
      </section>
      <section className="grid text-center my-5 text-slate-800 content-center place-items-center">
        <div className="bg-white text-slate-800 border-2 border-slate-400 py-1 px-4 rounded mt-2 text-lg w-2/3 text-center">
          {word}
        </div>

      </section>
      <section className="pt-4 pb-8">
        {wordGroup(avoid)}
      </section>

      <section className="grid text-center my-5 text-slate-800 content-center place-items-center">
        <div className="text-center text-slate-400 text-lg">score</div>
        <ScoreBoard score={score} maxScore={topWords?.length} />
      </section>
      <section className="flex flex-row justify-center gap-4 mt-2">
        <button className="text-slate-100 bg-slate-400 py-1 px-6 rounded text-lg text-center aspect-square">
          <FontAwesomeIcon icon={faShare} size="3x" />
          <p>share</p>
        </button>
        <button onClick={startGame} className="text-slate-100 bg-slate-400 py-1 px-6 rounded text-lg text-center aspect-square">
          <FontAwesomeIcon icon={faRotateLeft} size="3x" />
          <p>retry</p>
        </button>
      </section>

    </>
  )
}

export default Result;
