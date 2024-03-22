import React, { useEffect } from "react";

const AnimatedTitle = () => {
  useEffect(() => {
    const title = document.getElementById("animated-title");
    const letters = title.textContent.split("");

    title.innerHTML = "";
    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.opacity = 0; // Ici on Cache initialement chaque lettre
      title.appendChild(span);

      // Animation pour faire apparaître progressivement chaque lettre
      setTimeout(() => {
        span.style.opacity = 1;
      }, index * 100); // Augmenter progressivement le délai pour chaque lettre
    });
  }, []);

  return (
    <h1
      id="animated-title"
      className="sm:text-3xl text-xl uppercase h2 mb-4 font-pacifico"
    >
      Social Watch
    </h1>
  );
};
export default AnimatedTitle;
