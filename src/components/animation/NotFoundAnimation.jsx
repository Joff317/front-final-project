import React from "react";
import {
  useTrail,
  useChain,
  useSprings,
  animated,
  useSpringRef,
} from "@react-spring/web";

//---------//
// Ici on définit la configuration de l'animation
// coordonnées pour positionner les carrés
const COORDS = [
  [50, 30],
  [90, 30],
  [50, 50],
  [60, 60],
  [70, 60],
  [80, 60],
  [90, 50],
];

// Stroke = on définit l'épaisseur du trait des lignes svg
const STROKE_WIDTH = 0.5;

// Ici on utilise offset pour ajuster les positions des éléments pour éviter tout débordement.
const OFFSET = STROKE_WIDTH / 2;

// Et ici on définit les dimensions maximales du svg
const MAX_WIDTH = 150 + OFFSET * 2;
const MAX_HEIGHT = 100 + OFFSET * 2;

const NotFoundAnimation = () => {
  const gridApi = useSpringRef();

  // Chaque ligne part de zéro et va jusqu'au valeur définit par max width et height.
  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0,
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT,
    },
  });

  const boxApi = useSpringRef();

  const [boxSprings] = useSprings(7, (i) => ({
    ref: boxApi,
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: i * 200,
    config: {
      mass: 2,
      tension: 220,
    },
  }));

  // Use chain est utilisé pour synchroniser les animations des lignes et des carrés.
  // Les références gridApi et boxApi sont passés en premier pour définir l'ordre d'éxécution des animations.
  useChain([gridApi, boxApi], [0, 1], 1500);
  return (
    <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
      <g>
        {gridSprings.map(({ x2 }, index) => (
          <animated.line
            x1={0}
            y1={index * 10 + OFFSET}
            x2={x2}
            y2={index * 10 + OFFSET}
            key={index}
            strokeWidth={STROKE_WIDTH}
            stroke="currentColor"
          />
        ))}
        {gridSprings.map(({ y2 }, index) => (
          <animated.line
            x1={index * 10 + OFFSET}
            y1={0}
            x2={index * 10 + OFFSET}
            y2={y2}
            key={index}
            strokeWidth={STROKE_WIDTH}
            stroke="currentColor"
          />
        ))}
      </g>
      {COORDS.map(([x, y], index) => (
        <animated.rect
          key={index}
          width={10}
          height={10}
          fill="currentColor"
          style={{
            transformOrigin: `${5 + OFFSET * 2}px ${5 + OFFSET * 2}px`,
            transform: `translate(${x + OFFSET}px, ${y + OFFSET}px)`,
          }}
        />
      ))}
    </svg>
  );
};

export default NotFoundAnimation;
