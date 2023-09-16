function Game({ puzzle, submit }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.target[0].value);
  }
  const wordGroup = words => <div className="grid grid-cols-2 gap-2 mx-20 text-slate-700">
    {words.map(word => <div className="text-center text-2xl" key={word}>{word}</div>)}</div>

  return (
    <>
      <section className="pt-8 pb-4">
        <div className="text-center text-slate-400 text-lg">match these words</div>
        {wordGroup(match)}
      </section>
      <section className="text-center my-5 text-slate-800">
        <form onSubmit={handleSubmit} className="place-items-center text-center">
          <input type="text" autoFocus placeholder="Type your best guess..." className="w-2/3 text-center rounded py-1 mr-1 border-2 border-slate-400 focus-visible:border-slate-400" ></input>
          <button type="submit" className="bg-slate-400 hover:bg-slate-600 text-slate-100 border border-slate-400 py-1 px-4 rounded inline-flex items-center mt-2">
            ▶
          </button>
        </form>
      </section>
      <section className="pt-4 pb-8">
        {wordGroup(avoid)}
        <div className="text-center text-slate-400 text-lg">avoid these words</div>
      </section>
    </>
  )
}

export default Game;