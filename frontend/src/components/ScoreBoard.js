function ScoreBoard({ score, maxScore }) {
  let segments = [];
  for (let i = 0; i < maxScore; i++) {
    if (i < score) segments.push('border-slate-400 bg-slate-400');
    else segments.push('border-slate-400');
  }
  return <div className="w-3/4 flex flex-row flex-fill gap-2">
    {segments.map((segment, index) => <div className={`grow h-8 border-2 rounded ${segment}`} key={index}></div>)}
  </div>
}

export default ScoreBoard;