import { useRadio } from "@/contexts/RadioContext";
import { useTV } from "@/contexts/TVContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FloatingRadioPreview, FloatingTVPreview } from "./floating-media";

const FloatingMediaPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isPlaying: isRadioPlaying,
    isLoading: isRadioLoading,
    isMinimized: isRadioMinimized,
    pause: pauseRadio,
    setMinimized: setRadioMinimized,
  } = useRadio();

  const {
    isPlaying: isTVPlaying,
    isMinimized: isTVMinimized,
    setMinimized: setTVMinimized,
    pause: pauseTV,
  } = useTV();

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOnRadioPage = location.pathname === "/radio";
  const isOnHomePage = location.pathname === "/";

  // Determine visibility - show on homepage and other pages
  const isRadioActive = isRadioPlaying || isRadioLoading;
  const isTVActive = isTVPlaying;

  // Show floating players when:
  // 1. On homepage after scrolling OR
  // 2. On any page except radio page (or on radio page after scrolling)
  const shouldShowFloating = (isActive: boolean, isMinimized: boolean) => {
    if (!isActive || isMinimized) return false;
    
    if (isOnHomePage) {
      return hasScrolled;
    }
    
    if (isOnRadioPage) {
      return hasScrolled;
    }
    
    return true;
  };

  const shouldShowRadioFloating = shouldShowFloating(isRadioActive, isRadioMinimized);
  const shouldShowTVFloating = shouldShowFloating(isTVActive, isTVMinimized);

  const goToRadio = () => {
    navigate("/radio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToTV = () => {
    navigate("/radio");
    setTimeout(() => {
      const tvSection = document.getElementById("ecclesia-tv-section");
      if (tvSection) {
        tvSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const closeRadioPlayer = () => {
    pauseRadio();
    setRadioMinimized(true);
  };

  const closeTVPlayer = () => {
    pauseTV();
    setTVMinimized(true);
  };

  return (
    <AnimatePresence>
      {shouldShowRadioFloating && (
        <FloatingRadioPreview
          key="radio-floating"
          onClose={closeRadioPlayer}
          onNavigate={goToRadio}
        />
      )}

      {shouldShowTVFloating && (
        <FloatingTVPreview
          key="tv-floating"
          onClose={closeTVPlayer}
          onNavigate={goToTV}
        />
      )}
    </AnimatePresence>
  );
};

export default FloatingMediaPlayer;
