import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LastMessagePage.css";

const LastMessagePage = () => {
  const navigate = useNavigate();
  const [showCake, setShowCake] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const handleCelebration = () => {
    setShowCake(true);
    createConfetti();
  };

  const createConfetti = () => {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];
    const newConfetti = [];

    for (let i = 0; i < 100; i++) {
      const confetti = {
        id: Date.now() + i,
        left: Math.random() * 100 + "vw",
        animationDuration: Math.random() * 3 + 2 + "s",
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5 + "s",
      };
      newConfetti.push(confetti);
    }

    setConfetti((prevConfetti) => [...prevConfetti, ...newConfetti]);
  };

  useEffect(() => {
    let interval;
    if (showCake) {
      interval = setInterval(() => {
        createConfetti();
      }, 2000); // Her 2 saniyede bir yeni konfetiler oluştur
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showCake]);

  return (
    <div className="last-message-container">
      <div className="message-content">
        <h1>Son kutlama efekti</h1>
        <button className="celebration-button" onClick={handleCelebration}>
          Kutlamayı Başlat
        </button>
      </div>

      {showCake && <div className="cake-container">🎂</div>}

      {confetti.map((confetti) => (
        <div
          key={confetti.id}
          className="confetti"
          style={{
            left: confetti.left,
            animationDuration: confetti.animationDuration,
            backgroundColor: confetti.backgroundColor,
            animationDelay: confetti.delay,
          }}
        />
      ))}

      <button className="back-button" onClick={() => navigate("/gift-page")}>
        Geri Dön
      </button>
    </div>
  );
};

export default LastMessagePage;
