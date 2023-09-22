function InfoModal({ toggle }) {
  return (
    <div className="absolute inset-0 flex items-center z-10 flex-col h-full flex-1 bg-slate-800 bg-opacity-90  text-slate-100 justify-between px-7 pb-5">
      <header className="grid grid-cols-3 w-full">
        <div></div>
        <div className="text-2xl text-center align-middle mt-4">semantIQ</div>
        <button onClick={toggle} className="h-8 aspect-square rounded-full text-slate-400 border-2 border-slate-400 justify-center mt-4 text-center items-center scale-125 justify-self-end relative left-2">
          <span className="relative bottom-0.5">x</span>
        </button>
      </header>
      <main className="flex flex-col grow justify-center gap-4 font-light">
        <p>This is a word association game. Your challenge is to come up with a word that is closely related to the first set of words, but not to the second set.</p>
        <p>ChatGPT will evaluate your guess by sorting all words based on their relevance to your chosen word. The top three most relevant words will be selected. You'll earn points based on how many of these top three words belong to the first group.</p>
        <p>A fresh set of words will be introduced daily. Feel free to try as many times as you'd like. Just note that if you decide to share your results, the number of attempts will also be included. And if you can't wait for the next one, just try to play the the current one inverted - scoring 0 points is just as hard as scoring 3.</p>
      </main>
      <footer className="grid grid-cols-1 place-items-center font-extralight">
        <div>Created at <a href="https://devpost.com/software/semantiq">HackZurich</a> by <a href='https://github.com/fela' className='font-light'>Fela</a>, <a href='https://github.com/LorisPolenz' className='font-light'>Loris</a> & <a href='https://www.linkedin.com/in/alexmoeri/' className='font-light'>Alex</a></div>
      </footer>
    </div>
  );
}

export default InfoModal;
