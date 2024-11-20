// hero.jsx
import React, { useEffect, useState } from 'react';
import './hero.css';

function Hero() {
  const [breatheText, setBreatheText] = useState('breathe in');
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheText(breatheText === 'breathe in' ? 'breathe out' : 'breathe in');
      setExpand(!expand);
    }, 20000); // Change text and animation every 20 seconds

    return () => clearInterval(interval);
  }, [breatheText, expand]);

  return (
    <section className="hero bg-purple-200 min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-6">
        We all have mental health
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-lg">
        Our emotional health can range from thriving to struggling. No matter what you're experiencing, there are ways to take action to support yourself and those around you.
      </p>
      <div className={`breathe-ball ${expand ? 'expand' : 'shrink'} relative`}>
        <span className="breathe-text absolute inset-0 flex justify-center items-center text-red-500 text-xl font-semibold">
          {breatheText}
        </span>
      </div>
    </section>
  );
}

export default Hero;
