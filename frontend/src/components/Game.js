function Game({ puzzle, submit }) {
  const { groupPos: match, groupNeg: avoid } = puzzle;
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(event.target[0].value);
  }

  return (
    <>
      <section>
        <div>Match these words</div>
        <div className="wordGroup">
          {match.map(word => <div className="word match" key={word}>{word}</div>)}
        </div>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <input type="text" autoFocus></input>
          <button type="submit">
            Submit
          </button>
        </form>
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

export default Game;