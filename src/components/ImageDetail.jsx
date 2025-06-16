import React, { useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ImageDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  console.log("Initial isFlipped state:", isFlipped);

  console.log("Image object:", image);
  if (image) {
    console.log("Image URL:", image.url);
  }

  if (!image) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-white text-2xl mb-6">Görsel bulunamadı</div>
          <button
            className="px-4 py-2 fixed top-4 left-4 bg-white/10 border border-white/20 rounded-md text-white text-sm cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-md shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:bg-white/15 z-50"
            onClick={() => navigate("/gallery")}
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-24 flex items-center justify-center overflow-hidden">
      <button
        className="fixed top-4 left-4 px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-md shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:bg-white/15 z-50"
        onClick={() => navigate("/gallery")}
      >
        Geri Dön
      </button>

      <div className="w-full max-w-6xl px-8 flex flex-col items-center justify-center">
        <div className="relative w-[400px] h-[500px] perspective-1000">
          <motion.div
            className="relative w-full h-full transition-transform duration-700 transform-style-3d"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of the card (Image) */}
            <div
              className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white shadow-xl"
              style={{ backfaceVisibility: "hidden" }}
            >
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={image.url}
                alt={image.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                className="absolute bottom-4 right-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
                onClick={handleFlip}
              >
                Arkaya Çevir
              </button>
            </div>

            {/* Back of the card (Description) */}
            <div
              className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col justify-center items-center text-center text-white shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {image.title}
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {image.description}
              </p>
              <p className="text-purple-400 italic text-lg border-t border-gray-700 pt-4 w-full">
                Fotoğraf: {image.photographer}
              </p>
              <button
                className="mt-8 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
                onClick={handleFlip}
              >
                Görsele Dön
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
