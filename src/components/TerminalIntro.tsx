import { useEffect, useState } from 'react';

const TerminalIntro = () => {
  const sentences = [
    'Frontend.',
    'Backend.',
    'All of it.',
  ];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 50 : 100;
    const current = sentences[index];
    let timer: NodeJS.Timeout;

    if (!isDeleting && text.length < current.length) {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && text === current) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % sentences.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, sentences]);

  return (
<section
  className="h-screen flex items-center justify-center text-white"
  style={{
    backgroundImage: `
      linear-gradient(to bottom, black, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, black),
      linear-gradient(to right, #1034A6, #D3212D)
    `,
    backgroundBlendMode: 'multiply',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <h1 className="text-4xl md:text-6xl font-mono text-center">
    {text}
    <span className="animate-pulse">|</span>
  </h1>
</section>







  );
};

export default TerminalIntro;
