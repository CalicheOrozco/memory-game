import { useRef, useCallback, useEffect, useState } from "react";
import "../App.css";
import Card from "../components/Card";
import ReactCanvasConfetti from "react-canvas-confetti";

const cards = {
  1: {
    name: "Deer",
    image: "/cards/001.png",
    flipped: false,
  },
  2: {
    name: "Polar Bear",
    image: "/cards/002.png",
    flipped: false,
  },
  3: {
    name: "Weasel",
    image: "/cards/003.png",
    flipped: false,
  },
  4: {
    name: "White fox",
    image: "/cards/004.png",
    flipped: false,
  },
  5: {
    name: "Bird",
    image: "/cards/005.png",
    flipped: false,
  },
  6: {
    name: "hummingbird",
    image: "/cards/006.png",
    flipped: false,
  },
  7: {
    name: "Seal",
    image: "/cards/007.png",
    flipped: false,
  },
  8: {
    name: "Seagull",
    image: "/cards/008.png",
    flipped: false,
  },
  9: {
    name: "Whale",
    image: "/cards/009.png",
    flipped: false,
  },
};

// Fireworks
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}
// Function to generate random Cards
const randomCards = () => {
  const randomCards = [];
  while (randomCards.length < 18) {
    const random = Math.floor(Math.random() * 9) + 1;
    if (
      randomCards.filter((card) => card.name === cards[random].name).length < 2
    ) {
      randomCards.push(Object.assign({}, cards[random]));
    }
  }
  return randomCards;
};

function GameTable({ name }) {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [final, setFinal] = useState(false);

  // Animation
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  // Function to compare if the cards match
  const isMatch = (id) => {
    const clickedCard = deck.find((card) => deck.indexOf(card) === id);
    const flippedCard = flipped.map((id) =>
      deck.find((card) => deck.indexOf(card) === id)
    )[0];

    return flippedCard.name === clickedCard.name;
  };

  // funtion to reset the cards
  const resetCards = () => {
    setDeck(
      deck.map((card) => {
        if (solved.includes(deck.indexOf(card))) {
          card.flipped = true;
        } else {
          card.flipped = false;
        }
        return card;
      })
    );

    setFlipped([]);
  };

  const handleClick = (i) => {
    // change the state of the selected card
    setDeck(
      deck.map((card, index) => {
        if (index === i) {
          card.flipped = true;
        }
        return card;
      })
    );

    if (flipped.length === 0) {
      setFlipped([i]);
    } else {
      if (isMatch(i)) {
        setSolved([...solved, flipped[0], i]);
        resetCards();
      } else {
        setTimeout(resetCards, 500);
      }
    }
  };

  const suffleCards = () => {
    setDeck(randomCards());
    setSolved([]);
    setFinal(false);
    stopAnimation();
  };

  useEffect(() => {
    setDeck(randomCards());
  }, []);

  useEffect(() => {
    if (solved.length === 18) {
      startAnimation();
      setFinal(true);
      setDeck((deck) =>
        deck.map((card) => {
          if (solved.includes(deck.indexOf(card))) {
            card.flipped = true;
          } else {
            card.flipped = false;
          }
          return card;
        })
      );
    }

    if (solved.length > 0 && solved.length < 18) {
      startAnimation();
      setTimeout(() => {
        stopAnimation();
      }, 2000);
      setDeck((deck) =>
        deck.map((card) => {
          if (solved.includes(deck.indexOf(card))) {
            card.flipped = true;
          } else {
            card.flipped = false;
          }
          return card;
        })
      );
    }
  }, [solved]);

  return (
    <>
      {!final ? (
        <h2 className="text-2xl text-center text-white font-bold">Find the pairs</h2>
      ) : (
        <>
          <h2 className="text-2xl text-center text-white font-bold">{`Congratulations ${name} you won!`}</h2>
          <button
            onClick={() => {
              suffleCards();
            }}
            class="bg-red-600 hover:bg-green-500 text-white font-bold py-2 px-4 border border-red-600 rounded my-3">
            Suffle Cards
          </button>
        </>
      )}

      <div className="flex justify-around pt-5">
        <h1 className="text-xl capitalize font-bold text-white">{`Player: ${name}`}</h1>
        <h1 className="text-xl font-bold text-white">{`Cards found: ${ solved.length / 2 }/9`}</h1>
      </div>
      {deck ? (
        <div className="flex flex-wrap gap-3 justify-center py-5 shadow-2xl ">
          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
          {deck.map((card, index) =>
            card.flipped ? (
              <Card
                id={index}
                key={index}
                name={card.name}
                image={card.image}
              />
            ) : (
              <div
                className="card cursor-pointer hover:border-8 rounded-3xl border-green-500"
                onClick={() => { handleClick(index); }}
                key={index}
              >
                <Card
                  id={index}
                  key={index}
                  name={card.name}
                  image="/cards/cover.png"
                />
              </div>
            )
          )}
        </div>
      ) : (
        <h1 className="text-6xl text-black">Loading...</h1>
      )}
    </>
  );
}

export default GameTable;
