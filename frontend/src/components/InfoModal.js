function InfoModal({ toggle }) {
  return (
    <div className="absolute inset-0 flex items-center z-10 flex-col h-full flex-1 bg-slate-800 bg-opacity-90  text-slate-100 justify-between px-5 pb-5">
      <header className="grid grid-cols-3 w-full">
        <div></div>
        <div className="text-2xl text-center align-middle mt-4">semantIQ</div>
        <button onClick={toggle} className="h-8 aspect-square rounded-full text-slate-400 border-2 border-slate-400 justify-center mt-4 text-center scale-150 justify-self-end">x</button>
      </header>
      <main className="flex flex-col grow justify-center gap-4">
        <p>The goal ist to find a word that matches the semantic meaning of the first group of words as well as possible, while having the lowest possible similarity to the second group of words.</p>
        <p>ChatGPT will evaluate your guess and give it a score based on how many of the positive words where matched closer than the negative words.</p>
        <p>A new word set will be published every day. You can try as often as you want, but we'll keep track of how many tries you need to achieve your highscore.</p>
      </main>
      <footer className="grid grid-cols-1 place-items-center font-extralight">
        <div>Created at <a href="https://devpost.com/software/semantiq">HackZurich</a> by <a href='https://www.linkedin.com/in/52808388/' className='font-light'>Fela</a>, <a href='https://github.com/LorisPolenz' className='font-light'>Loris</a> & <a href='https://www.linkedin.com/in/alexmoeri/' className='font-light'>Alex</a></div>
      </footer>
    </div>
  );
}

export default InfoModal;
