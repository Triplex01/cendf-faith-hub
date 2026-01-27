import { useRadio } from "@/contexts/RadioContext";
import { useTV } from "@/contexts/TVContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, X, Radio, Tv, Loader2, ExternalLink, Move, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence, useDragControls, PanInfo } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Hls from "hls.js";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import logoRadioEspoir from "@/assets/logo-radio-espoir.png";

const ECCLESIA_TV_STREAM_URL = "https://video1.getstreamhosting.com:1936/8018/8018/playlist.m3u8";

// Hook for draggable position
const useDraggablePosition = (initialPosition: { x: number; y: number }) => {
  const [position, setPosition] = useState(initialPosition);
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  const handleDragEnd = (_: any, info: PanInfo) => {
    setPosition(prev => ({
      x: prev.x + info.offset.x,
      y: prev.y + info.offset.y
    }));
  };
  
  return { position, setPosition, handleDragEnd, constraintsRef };
};

// Composant pour l'aperçu TV flottant avec vidéo en direct
const FloatingTVPlayer = ({ 
  onClose, 
  onNavigate 
}: { 
  onClose: () => void; 
  onNavigate: () => void;
}) => {
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
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-24 right-6 z-50 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[340px]">
        {/* Drag Handle + Header */}
        <div 
          className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-3 flex items-center justify-between"
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
};

// Composant pour le player radio flottant déplaçable
const FloatingRadioPlayer = ({ 
  onClose,
  onNavigate 
}: { 
  onClose: () => void;
  onNavigate: () => void;
}) => {
  const {
    isPlaying,
    isLoading,
    volume,
    currentProgram,
    error,
    toggle,
    setVolume,
  } = useRadio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const dragControls = useDragControls();
  const { position, handleDragEnd } = useDraggablePosition({ x: 0, y: 0 });

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      exit={{ y: 100, opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-24 left-6 z-50 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-elegant overflow-hidden w-[300px]">
        {/* Drag Handle + Header */}
        <div 
          className="bg-gradient-burgundy p-3 flex items-center justify-between"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-3">
            <Move className="w-4 h-4 text-white/50" />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <img src={logoRadioEspoir} alt="Radio Espoir" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <p className="text-primary-foreground font-bold text-sm">Radio Espoir</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-primary-foreground/80 text-xs">102.8 FM</span>
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
          <div className="flex items-center justify-center gap-1 h-12 mb-4 bg-muted/30 rounded-lg p-2">
            {isPlaying ? (
              [...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-primary to-primary/60 rounded-full"
                  animate={{
                    height: [8, 20 + Math.random() * 20, 8],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }}
                />
              ))
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Radio className="w-4 h-4" />
                <span>En pause</span>
              </div>
            )}
          </div>

          {/* Program info */}
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-sm font-medium text-foreground truncate">{currentProgram}</p>
            <p className="text-xs text-muted-foreground">La foi à portée d'écoute</p>
          </div>

          {error && (
            <p className="text-xs text-destructive mb-3">{error}</p>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="burgundy"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggle}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>

              <div 
                className="flex items-center gap-2"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                {showVolumeSlider && (
                  <div className="w-16">
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

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-8 text-xs"
              onClick={onNavigate}
            >
              <Radio className="w-3 h-3" />
              Radio
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
