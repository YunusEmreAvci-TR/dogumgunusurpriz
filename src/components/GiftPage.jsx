import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/GiftPage.css";
import Rose from "../assets/images/blue.png";
import Hurrem from "../assets/images/maxresdefault.jpg";

const GiftPage = () => {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    image: null,
    countdown: 5,
  });

  const giftMessages = [
    {
      message:
        "Hiç çiçek almadığını söylemiştin o yüzden buraya tekrardan bu çiçeği koyuyorum. Dijital olarak almış oldun",
      image: Rose,
    },
    {
      message: "Hurrem Sultan",
      image: Hurrem,
    },
    {
      message: "You're not just hardworking, you're an inspiration.",
      image: null,
    },
    {
      message: "Your achievements show how strong your soul truly is.",
      image: null,
    },
    {
      message: "Your energy beautifies every place you're in.",
      image: null,
    },
    {
      message: "Success loves to walk beside you.",
      image: null,
    },
    {
      message: "Dangshineun jeongmal mideul su inneun saram-ieyo.",
      image: null,
    },
    {
      message: "Tu as un style qui te va vraiment bien.",
      image: null,
    },
    {
      message: "You're the kind of person who lifts the whole team.",
      image: null,
    },
    {
      message: "Hai un'eleganza naturale.",
      image: null,
    },
    {
      message: "Siempre sabes cómo hacer sentir bien a los demás.",
      image: null,
    },
    {
      message:
        "Joyeux anniversaire ! Heureusement que tu es là. J'espère que tu seras toujours heureux(se).",
      image: null,
    },
    {
      message:
        "Feliz aniversário! Ainda bem que você existe. Espero que você seja sempre feliz.",
      image: null,
    },
    {
      message:
        "Alles Gute zum Geburtstag! Schön, dass es dich gibt. Ich hoffe, du wirst immer glücklich sein.",
      image: null,
    },
    {
      message:
        "Buon compleanno! Sono felice che tu ci sia. Spero che tu sia sempre felice.",
      image: null,
    },
  ];

  useEffect(() => {
    createGifts();
    window.addEventListener("resize", createGifts);
    return () => window.removeEventListener("resize", createGifts);
  }, []);

  useEffect(() => {
    let timer;
    if (notification.open && notification.countdown > 0) {
      timer = setTimeout(() => {
        setNotification((prev) => ({
          ...prev,
          countdown: prev.countdown - 1,
        }));
      }, 1000);
    } else if (notification.countdown === 0) {
      setNotification((prev) => ({ ...prev, open: false }));
    }
    return () => clearTimeout(timer);
  }, [notification.open, notification.countdown]);

  const createGifts = () => {
    const newGifts = [];
    const numGifts = giftMessages.length;
    const giftBoxSize = 100; // Assuming gift box is around 100px (80px width + some margin)
    const verticalPadding = 150; // Increased vertical padding for more centered look

    const availableWidth = window.innerWidth - 2 * 50; // Keep horizontal padding as 50
    const availableHeight = window.innerHeight - 2 * verticalPadding;

    // Calculate number of columns and rows dynamically
    let numColumns = Math.floor(availableWidth / giftBoxSize);
    if (numColumns === 0) numColumns = 1; // Ensure at least one column

    let numRows = Math.ceil(numGifts / numColumns);

    // Adjust numColumns and numRows to fit within available height if necessary
    const maxRowsAllowed = Math.floor(availableHeight / giftBoxSize);
    if (numRows > maxRowsAllowed && maxRowsAllowed > 0) {
      numRows = maxRowsAllowed;
      numColumns = Math.ceil(numGifts / numRows); // Recalculate columns based on adjusted rows
      if (numColumns === 0) numColumns = 1;
    }

    const totalGridWidth = numColumns * giftBoxSize;
    const totalGridHeight = numRows * giftBoxSize;

    const startX = (window.innerWidth - totalGridWidth) / 2;
    const startY = (window.innerHeight - totalGridHeight) / 2;

    const xSpacing =
      numColumns > 1 ? (totalGridWidth - giftBoxSize) / (numColumns - 1) : 0;
    const ySpacing =
      numRows > 1 ? (totalGridHeight - giftBoxSize) / (numRows - 1) : 0;

    for (let i = 0; i < numGifts; i++) {
      const col = i % numColumns;
      const row = Math.floor(i / numColumns);

      const x = startX + col * xSpacing;
      const y = startY + row * ySpacing;

      newGifts.push({
        id: i,
        x: x,
        y: y,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 2,
      });
    }
    setGifts(newGifts);
  };

  const handleGiftClick = (giftId) => {
    const giftMessage = giftMessages[giftId % giftMessages.length];
    setNotification({
      open: true,
      message: giftMessage.message,
      image: giftMessage.image,
      countdown: 5,
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="gift-page-container">
      <div className="navigation-buttons">
        <button className="back-button" onClick={() => navigate("/gallery")}>
          Geri Dön
        </button>
        <button
          className="continue-button "
          onClick={() => navigate("/last-message")}
        >
          Devam Et
        </button>
      </div>

      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="gift-box"
          style={{
            left: `${gift.x}px`,
            top: `${gift.y}px`,
            transform: `rotate(${gift.rotation}deg) scale(${gift.scale})`,
            animationDelay: `${gift.delay}s`,
          }}
          onClick={() => handleGiftClick(gift.id)}
        >
          <span className="gift-emoji">🎁</span>
        </div>
      ))}

      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <Alert
          severity="success"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            width: "100%",
            minWidth: "300px",
            maxWidth: "90vw",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div className="notification-content">
            {notification.image && (
              <div className="notification-image">
                <img src={notification.image} alt="Gift" />
              </div>
            )}
            {notification.message && (
              <div className="notification-message">{notification.message}</div>
            )}
            <div className="countdown">{notification.countdown}</div>
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GiftPage;
