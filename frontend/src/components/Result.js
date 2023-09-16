function Result({ puzzle, word, result, startGame }) {
  const { score, topWords } = result;
  return (
    <>
      <section>
        You've scored {score}/{topWords.length}
      </section>
      <section>
        The {topWords.length} closest words were:<br />
        {topWords.map(word => <div key={word}>{word}</div>)}
      </section>
      <section>
        <button>Share</button>
        <button onClick={startGame}>Try again</button>
      </section>
      
    </>
  )
}

export default Result;
