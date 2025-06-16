import Lottie from "lottie-react";
import animationData from "../assets/intro.json";
import "../styles/IntroAnimation.css";

const IntroAnimation = ({ onComplete }) => {
  return (
    <div className="intro-container">
      <div className="lottie-container">
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default IntroAnimation;
