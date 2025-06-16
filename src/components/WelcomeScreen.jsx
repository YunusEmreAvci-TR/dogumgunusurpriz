// WelcomeScreen.jsx
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#164e4e] via-[#3b2c3d] to-[#a05065] px-6 relative overflow-hidden">
      {/* Ana içerik */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl gap-8 md:gap-12">
        <h1
          style={{ color: "#fff" }}
          className={`text-5xl md:text-7xl font-extrabold transition-all duration-700 ease-out drop-shadow-2xl !mb-2 md:!mb-4
          ${animate ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
        >
          HOŞGELDİN
        </h1>
        <p
          style={{ color: "#fff", opacity: 0.92 }}
          className={`max-w-xl text-xs md:text-xs leading-relaxed transition-opacity duration-1000 ease-out !mb-2 md:!mb-6
          ${animate ? "opacity-100" : "opacity-0"}`}
        >
          Umarım bu sitede hikayenden bir kaç parça bulabilirsin 😊
        </p>
        <Button
          variant="contained"
          size="medium"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 22, ml: 0.5 }} />}
          onClick={() => navigate("/gallery")}
          sx={{
            borderRadius: 9999,
            px: 3.5,
            py: 1.2,
            minWidth: 0,
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: 0.5,
            background: "linear-gradient(90deg, #fff 0%, #ffe0ea 100%)",
            color: "#3b2c3d",
            boxShadow: "0 2px 12px 0 rgba(160,80,101,0.10)",
            transition: "all 0.2s",
            marginTop: "12px",
            marginBottom: "4px",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #ffe0ea 0%, #fff 100%)",
              transform: "scale(1.05)",
              boxShadow: "0 4px 16px 0 rgba(160,80,101,0.18)",
            },
          }}
          className={animate ? "opacity-100" : "opacity-0"}
        >
          Devam Et
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
