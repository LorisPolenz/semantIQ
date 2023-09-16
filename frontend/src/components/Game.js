function Game({ puzzle, submit }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.target[0].value);
  }
  const wordPair = (w1, w2) =>
    <div className="space-x-6 text-center"><span>{w1}</span><span>{w2}</span></div>
  const wordGroup = words => <div className="content-center text-3xl font-bold leading-tight">
    {wordPair(words[0], words[1])}
    {wordPair(words[2], words[3])}
  </div>

  return (
    <>
      <section className="pt-11 pb-0">
        <div className="text-center text-xl text-slate-500">stay close to</div>
        <div className="text-green-800">
        {wordGroup(match)}
        </div>
      </section>
      <section className="text-center my-5 text-slate-800 mt-2">
        <form onSubmit={handleSubmit} className="place-items-center text-center">
          <input type="text" autoFocus placeholder="Find a word..." className="w-2/3 text-center rounded py-1 mr-1 border-2 border-slate-400 focus-visible:border-slate-400" ></input>
          <button type="submit" className="text-xl bg-slate-400 hover:bg-slate-600 text-slate-100 border border-slate-400 py-1 px-4 rounded inline-flex items-center mt-2">
            ▶
          </button>
        </form>
      </section>

      <div className="text-center text-xl text-slate-500">and far from</div>
      <section className="pt-1 pb-0">
        <div className="text-red-800">
        {wordGroup(avoid)}
        </div>
      </section>
    </>
  )
}

export default Game;