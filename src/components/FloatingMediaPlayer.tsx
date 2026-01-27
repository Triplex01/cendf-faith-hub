import { useRadio } from "@/contexts/RadioContext";
import { useTV } from "@/contexts/TVContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, X, Radio, Tv, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import logoRadioEspoir from "@/assets/logo-radio-espoir.png";

const FloatingMediaPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    isPlaying: isRadioPlaying,
    isLoading: isRadioLoading,
    volume,
    currentProgram,
    error: radioError,
    isMinimized: isRadioMinimized,
    toggle: toggleRadio,
    setVolume,
    setMinimized: setRadioMinimized,
    pause: pauseRadio,
  } = useRadio();

  const {
    isPlaying: isTVPlaying,
    isMinimized: isTVMinimized,
    setMinimized: setTVMinimized,
    pause: pauseTV,
  } = useTV();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Detect scroll to show floating player
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we're on the radio page
  const isOnRadioPage = location.pathname === "/radio";

  // Determine which media is active
  const isRadioActive = isRadioPlaying || isRadioLoading;
  const isTVActive = isTVPlaying;

  // Show floating player conditions
  const shouldShowRadioFloating = isRadioActive && (hasScrolled || !isOnRadioPage) && !isRadioMinimized;
  const shouldShowTVFloating = isTVActive && (hasScrolled || !isOnRadioPage) && !isTVMinimized;

  // Handle navigation to radio page
  const goToRadio = () => {
    navigate("/radio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle navigation to radio page (TV section)
  const goToTV = () => {
    navigate("/radio");
    setTimeout(() => {
      const tvSection = document.getElementById("ecclesia-tv-section");
      if (tvSection) {
        tvSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Close radio floating player
  const closeRadioPlayer = () => {
    pauseRadio();
    setRadioMinimized(true);
  };

  // Close TV floating player
  const closeTVPlayer = () => {
    pauseTV();
    setTVMinimized(true);
  };

  return (
    <AnimatePresence>
      {/* Radio Floating Player */}
      {shouldShowRadioFloating && (
        <motion.div
          key="radio-floating"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-24 right-6 z-50"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[320px]">
            {/* Header */}
            <div className="bg-gradient-burgundy p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  <img src={logoRadioEspoir} alt="Radio Espoir" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-primary-foreground font-bold text-sm">Radio Espoir 102.8</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-primary-foreground/80 text-xs">En direct</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                onClick={closeRadioPlayer}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Program info */}
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-foreground truncate">{currentProgram}</p>
                <p className="text-xs text-muted-foreground">La foi à portée d'écoute</p>
              </div>

              {/* Error */}
              {radioError && (
                <p className="text-xs text-destructive mb-3">{radioError}</p>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {/* Play/Pause */}
                  <Button
                    variant="burgundy"
                    size="icon"
                    className="h-12 w-12 rounded-full"
                    onClick={toggleRadio}
                    disabled={isRadioLoading}
                  >
                    {isRadioLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isRadioPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </Button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                    >
                      {volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    {showVolumeSlider && (
                      <div 
                        className="w-20"
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <Slider
                          value={[volume * 100]}
                          onValueChange={([val]) => setVolume(val / 100)}
                          max={100}
                          step={1}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Go to Radio page */}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={goToRadio}
                >
                  <Radio className="w-4 h-4" />
                  Aller à la radio
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TV Floating Player */}
      {shouldShowTVFloating && (
        <motion.div
          key="tv-floating"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`fixed bottom-24 z-50 ${shouldShowRadioFloating ? 'right-[350px]' : 'right-6'}`}
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[320px]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white p-1 overflow-hidden">
                  <img src={logoEcclesiaTv} alt="Ecclesia TV" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Ecclesia TV</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-white/70 text-xs">En direct</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                onClick={closeTVPlayer}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Info */}
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-foreground">Diffusion en cours</p>
                <p className="text-xs text-muted-foreground">Chaîne catholique de Côte d'Ivoire</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tv className="w-4 h-4" />
                  <span>Lecture en cours...</span>
                </div>

                {/* Go to TV section */}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={goToTV}
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir la TV
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingMediaPlayer;
