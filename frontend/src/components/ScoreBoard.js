function ScoreBoard({ score, maxScore }) {
  let segments = [];
  for (let i = 0; i < maxScore; i++) {
    if (i < score) segments.push('bg-slate-400');
    else segments.push(null);
  }
  return <div className="w-3/4 flex flex-row flex-fill gap-2">
    {segments.map(segment => <div className={`grow h-8 border-2 rounded border-slate-400 ${segment}`}></div>)}
  </div>
}

export default ScoreBoard;