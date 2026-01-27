import { useRadio } from "@/contexts/RadioContext";
import { useTV } from "@/contexts/TVContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, X, Radio, Tv, Loader2, ExternalLink, Move, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence, useDragControls, PanInfo } from "framer-motion";
import { useState, useEffect, useRef, forwardRef } from "react";
import Hls from "hls.js";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import logoRadioEspoir from "@/assets/logo-radio-espoir.png";
import logoRnc from "@/assets/logo-rnc.png";
import logoRadioSanwi from "@/assets/logo-radio-sanwi.png";

const ECCLESIA_TV_STREAM_URL = "https://video1.getstreamhosting.com:1936/8018/8018/playlist.m3u8";

// Logos par station
const RADIO_LOGOS: Record<string, string> = {
  "espoir": logoRadioEspoir,
  "voix-evangile": logoRnc,
  "paix-sanwi": logoRadioSanwi,
};

// Hook for draggable position
const useDraggablePosition = (initialPosition: { x: number; y: number }) => {
  const [position, setPosition] = useState(initialPosition);
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    setPosition(prev => ({
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y
    }));
  };
  
  return { position, setPosition, handleDragEnd };
};

// Composant pour l'aperçu TV flottant avec vidéo en direct
const FloatingTVPlayer = forwardRef<HTMLDivElement, { 
  onClose: () => void; 
  onNavigate: () => void;
}>(({ onClose, onNavigate }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const dragControls = useDragControls();
  const { position, handleDragEnd } = useDraggablePosition({ x: 0, y: 0 });

  // Initialize HLS for mini video preview
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      
      hls.loadSource(ECCLESIA_TV_STREAM_URL);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsVideoReady(true);
        video.play().catch(() => {});
      });
      
      hlsRef.current = hls;
      
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = ECCLESIA_TV_STREAM_URL;
      video.play().catch(() => {});
      setIsVideoReady(true);
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-24 right-6 z-50 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[340px]">
        {/* Drag Handle + Header */}
        <div 
          className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-3 flex items-center justify-between cursor-grab"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <Move className="w-4 h-4 text-white/50" />
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 overflow-hidden">
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
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Mini Video Preview */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            autoPlay
          />
          
          {!isVideoReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1.5 h-7 text-xs"
                onClick={onNavigate}
              >
                <Maximize2 className="w-3 h-3" />
                Plein écran
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 flex items-center justify-between bg-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tv className="w-4 h-4" />
            <span>Diffusion 24h/24</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-7 text-xs"
            onClick={onNavigate}
          >
            <ExternalLink className="w-3 h-3" />
            Voir la TV
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

FloatingTVPlayer.displayName = "FloatingTVPlayer";

// Composant pour le player radio flottant déplaçable
const FloatingRadioPlayer = forwardRef<HTMLDivElement, { 
  onClose: () => void;
  onNavigate: () => void;
}>(({ onClose, onNavigate }, ref) => {
  const {
    isPlaying,
    isLoading,
    volume,
    currentStation,
    currentProgram,
    error,
    toggle,
    setVolume,
  } = useRadio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const dragControls = useDragControls();
  const { position, handleDragEnd } = useDraggablePosition({ x: 0, y: 0 });

  // Get logo for current station
  const currentLogo = currentStation ? RADIO_LOGOS[currentStation.id] || logoRadioEspoir : logoRadioEspoir;

  return (
    <motion.div
      ref={ref}
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-24 left-6 z-50 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[320px]">
        {/* Drag Handle + Header */}
        <div 
          className="bg-gradient-burgundy p-3 flex items-center justify-between cursor-grab"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <Move className="w-4 h-4 text-white/50" />
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
              <img src={currentLogo} alt={currentStation?.name || "Radio"} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-primary-foreground font-bold text-sm">
                {currentStation?.name || "Radio Catholique"}
              </p>
              <div className="flex items-center gap-1.5">
                {isPlaying && <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                <span className="text-primary-foreground/80 text-xs">
                  {currentStation?.frequency || "En direct"}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Visualizer Animation */}
          <div className="flex items-center justify-center gap-1 h-14 mb-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-3">
            {isPlaying ? (
              [...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-primary via-primary to-secondary rounded-full"
                  animate={{
                    height: [6, 16 + Math.random() * 24, 6],
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.03,
                  }}
                />
              ))
            ) : isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span>Connexion...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Radio className="w-5 h-5" />
                <span>En pause</span>
              </div>
            )}
          </div>

          {/* Program info */}
          <div className="bg-muted/50 rounded-xl p-3 mb-4">
            <p className="text-sm font-semibold text-foreground truncate">{currentProgram}</p>
            <p className="text-xs text-muted-foreground">La foi à portée d'écoute</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 mb-3">
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <Button
                variant="burgundy"
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg"
                onClick={() => toggle()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </Button>

              {/* Volume Control */}
              <div 
                className="flex items-center gap-2"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
                >
                  {volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 80, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Slider
                        value={[volume * 100]}
                        onValueChange={([val]) => setVolume(val / 100)}
                        max={100}
                        step={1}
                        className="w-20"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigate to Radio Page */}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-9"
              onClick={onNavigate}
            >
              <Radio className="w-4 h-4" />
              Radio
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

FloatingRadioPlayer.displayName = "FloatingRadioPlayer";

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

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOnRadioPage = location.pathname === "/radio";

  // Determine visibility
  const isRadioActive = isRadioPlaying || isRadioLoading;
  const isTVActive = isTVPlaying;

  const shouldShowRadioFloating = isRadioActive && (hasScrolled || !isOnRadioPage) && !isRadioMinimized;
  const shouldShowTVFloating = isTVActive && (hasScrolled || !isOnRadioPage) && !isTVMinimized;

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
        <FloatingRadioPlayer
          key="radio-floating"
          onClose={closeRadioPlayer}
          onNavigate={goToRadio}
        />
      )}

      {shouldShowTVFloating && (
        <FloatingTVPlayer
          key="tv-floating"
          onClose={closeTVPlayer}
          onNavigate={goToTV}
        />
      )}
    </AnimatePresence>
  );
};

export default FloatingMediaPlayer;
