function Game({ puzzle, submit }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.target[0].value);
  }
  const wordPair = (w1, w2) =>
    <div className="space-x-6 text-center"><span>{w1}</span><span>{w2}</span></div>
  const wordGroup = words => <div className="content-center text-2xl text-slate-700 leading-tight">
    {wordPair(words[0], words[1])}
    {wordPair(words[2], words[3])}
  </div>

  return (
    <>
      <section className="pt-8 pb-4">
        <div className="text-center text-slate-400 text-lg">stay close to</div>
        {wordGroup(match)}
      </section>
      <section className="text-center my-5 text-slate-800 mt-0 mb-0">
        <form onSubmit={handleSubmit} className="place-items-center text-center">
          <input type="text" autoFocus placeholder="find a word..." className="text-2xl w-2/3 text-center rounded py-1 mr-1 border-2 border-slate-400 focus-visible:border-slate-400" ></input>
          <button type="submit" className="text-2xl bg-slate-400 hover:bg-slate-600 text-slate-100 border-2 border-slate-400 py-1 px-4 rounded inline-flex items-center mt-2">
            ▶
          </button>
        </form>
      </section>
      <section className="pt-4 pb-8">
        <div className="text-center text-slate-400 text-lg">and far from</div>
        {wordGroup(avoid)}
      </section>
    </>
  )
}

export default Game;