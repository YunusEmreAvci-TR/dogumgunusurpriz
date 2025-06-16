import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GalleryPage from "./components/GalleryPage";
import IntroAnimation from "./components/IntroAnimation";
import { Routes, Route, useLocation } from "react-router-dom";
import ImageDetail from "./components/ImageDetail";
import GiftPage from "./components/GiftPage";
import LastMessagePage from "./components/LastMessagePage";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  // Sadece ana sayfada intro göster
  if (location.pathname === "/" && showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/image-detail" element={<ImageDetail />} />
      <Route path="/gift-page" element={<GiftPage />} />
      <Route path="/last-message" element={<LastMessagePage />} />
    </Routes>
  );
}

export default App;
