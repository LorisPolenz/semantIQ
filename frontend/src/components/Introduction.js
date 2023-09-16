function Introduction({ puzzle, startGame }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  return (
    <>
      <section>
        <div>Match these words</div>
        <div className="wordGroup">
          {match.map(word => <div className="word match" key={word}>{word}</div>)}
        </div>
      </section>
      <section>
        <button onClick={startGame}>
          Click here to start
        </button>
      </section>
      <section>
        <div className="wordGroup">
          {avoid.map(word => <div className="word avoid" key={word}>{word}</div>)}
        </div>
        <div>Avoid these words</div>
      </section>
    </>
  )
}

export default Introduction;
