function Introduction({ puzzle, startGame }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const wordGroup = words => <div className="grid grid-cols-2 gap-y-2 mx-20 text-slate-700">
    {words.map(word => <div className="text-center" key={word}>{word}</div>)}
  </div>
  return (
    <>
      <section>
        <div className="text-center text-slate-400">match these words</div>
        {wordGroup(match)}
      </section>
      <section className="text-center my-5 text-lg text-slate-800">
        <button onClick={startGame}>
          Click here to start
        </button>
      </section>
      <section>
        {wordGroup(avoid)}
        <div className="text-center text-slate-400">avoid these words</div>
      </section>
    </>
  )
}

export default Introduction;
