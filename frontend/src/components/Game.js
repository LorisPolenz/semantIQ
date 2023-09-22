import LoadingIcons from 'react-loading-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function Game({ puzzle, submit, loadingPuzzle, loadingResult, input, change }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.target[0].value);
  }
  const wordPair = (w1, w2) =>
    <div className="space-x-6 text-center"><span>{w1}</span><span>{w2}</span></div>
  const wordGroup = words => <div className="content-center text-2xl text-slate-700 leading-tight">
    {wordPair(words[0], words[1])}
    <div className="space-x-6 text-center"><span>{words[2]}</span></div>
  </div>

  return (
    <>
      <section className="pt-6 pb-4">
        <div className="text-center text-slate-400 text-lg">stay close to</div>
        {wordGroup(match)}
      </section>
      <section className="text-center my-5 text-slate-800 mt-0 mb-0 max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="place-items-center text-center">
          <input onChange={change} value={input} type="text" autoFocus placeholder="find a word..." className="text-2xl w-2/3 text-center rounded py-1 mr-1 border-2 border-slate-400 focus-visible:border-slate-400 outline-none focus:outline-none focus-visible:outline-none " />
          <button type="submit" disabled={input === "" || loadingResult} className={`bg-slate-400 hover:bg-slate-600 active:bg-slate-600 text-slate-100 border-2 border-slate-400 hover:border-slate-600 active:border-slate-600 py-1 px-4 rounded inline-flex items-center relative top-2 ${input === "" || loadingResult ? 'bg-slate-300 hover:bg-slate-300 border-slate-300 hover:border-slate-300' : null}`}>
            {loadingResult ? <LoadingIcons.Rings height="32" width="24" /> : <FontAwesomeIcon icon={faPlay} size="2xl" />}
          </button>
        </form>
      </section>
      <section className="pt-5 pb-8">
        <div className="text-center text-slate-400 text-lg">and far from</div>
        {wordGroup(avoid)}
      </section>
    </>
  )
}

export default Game;