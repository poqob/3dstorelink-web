import { useState, useEffect } from 'react';

export default function Typewriter({ text1, text2 }: { text1: string, text2: string }) {
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [isTyping1, setIsTyping1] = useState(true);

  useEffect(() => {
    let timeout: any;
    if (isTyping1) {
      if (displayedText1.length < text1.length) {
        timeout = setTimeout(() => {
          setDisplayedText1(text1.slice(0, displayedText1.length + 1));
        }, 60);
      } else {
        // slight pause before line 2
        timeout = setTimeout(() => setIsTyping1(false), 200);
      }
    } else {
      if (displayedText2.length < text2.length) {
        timeout = setTimeout(() => {
          setDisplayedText2(text2.slice(0, displayedText2.length + 1));
        }, 60);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText1, displayedText2, isTyping1, text1, text2]);

  useEffect(() => {
    setDisplayedText1('');
    setDisplayedText2('');
    setIsTyping1(true);
  }, [text1, text2]);

  return (
    <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-none mb-6">
      <span className="inline-block min-h-[1.2em]">
        {displayedText1}
        {isTyping1 && <span className="animate-pulse border-r-[4px] border-white ml-1"></span>}
      </span>
      <br />
      <span className="inline-block min-h-[1.2em] bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
        {displayedText2}
        {!isTyping1 && displayedText2.length < text2.length && <span className="animate-pulse border-r-[4px] border-gray-400 ml-1"></span>}
        {!isTyping1 && displayedText2.length === text2.length && <span className="animate-pulse border-r-[4px] border-transparent ml-1"></span>}
      </span>
    </h1>
  );
}
