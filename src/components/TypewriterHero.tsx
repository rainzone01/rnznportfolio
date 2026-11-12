import React, { useState, useEffect } from 'react';

const words = [
  "Computer Programmer @ LGU Bobon",
  "Full Stack Web Developer",
  "Next.js & React Frontend Builder",
  "Node.js & Express API Developer",
  "PHP & MySQL Systems Specialist",
  "BSIT Graduate (UEP)"
];

export default function TypewriterHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const word = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(word.substring(0, currentText.length + 1));
        setTypingSpeed(70 + Math.random() * 40);

        if (currentText === word) {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setCurrentText(word.substring(0, currentText.length - 1));
        setTypingSpeed(35);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <div className="inline-flex items-center font-mono text-neutral-900 font-semibold text-lg sm:text-2xl md:text-3xl min-h-[2.5rem]">
      <span>{currentText}</span>
      <span className="w-2 h-5 sm:h-7 bg-neutral-900 ml-1.5 inline-block animate-pulse"></span>
    </div>
  );
}
