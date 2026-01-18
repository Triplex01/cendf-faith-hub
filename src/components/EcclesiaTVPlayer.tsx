import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize2, Tv } from "lucide-react";
import { motion } from "framer-motion";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";

const ECCLESIA_TV_STREAM_URL = "https://video1.getstreamhosting.com:1936/8018/8018/playlist.m3u8";

const EcclesiaTVPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const hlsRef = useRef<Hls | null>(null);

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
        setIsLoading(false);
      });
      
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError("Impossible de charger le flux. Réessayez plus tard.");
          setIsLoading(false);
        }
      });
      
      hlsRef.current = hls;
      
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS support
      video.src = ECCLESIA_TV_STREAM_URL;
    }
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);

    try {
      await video.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (err) {
      setError("Impossible de lancer la lecture.");
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-primary/30 shadow-2xl"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Header avec logo et badge LIVE */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a 
              href="https://ecclesiatv.ci/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 hover:scale-105 transition-transform"
            >
              <img 
                src={logoEcclesiaTv} 
                alt="Ecclesia TV" 
                className="w-full h-full object-contain"
              />
            </a>
            <div>
              <h3 className="text-white font-display font-bold text-lg">Ecclesia TV</h3>
              <p className="text-white/60 text-xs">Chaîne catholique de Côte d'Ivoire</p>
            </div>
          </div>
          
          {isPlaying && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white text-xs font-bold">EN DIRECT</span>
            </div>
          )}
        </div>
      </div>

      {/* Lecteur vidéo */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted={isMuted}
        />
        
        {/* Overlay de chargement ou erreur */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e]/95 to-[#16213e]/95">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto border-2 border-primary/50">
                <Tv className="w-12 h-12 text-primary" />
              </div>
              
              {error ? (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              ) : (
                <p className="text-white/70 text-sm mb-4">Cliquez pour regarder en direct</p>
              )}
              
              <button
                onClick={handlePlay}
                disabled={isLoading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Regarder en direct
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Contrôles */}
        {isPlaying && showControls && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              
              <button
                onClick={handleFullscreen}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer avec infos */}
      <div className="p-4 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Tv className="w-4 h-4" />
            <span>Diffusion 24h/24</span>
          </div>
          <a 
            href="https://ecclesiatv.ci/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Visiter le site →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default EcclesiaTVPlayer;
