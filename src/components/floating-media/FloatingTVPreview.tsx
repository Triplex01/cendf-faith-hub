import { useRef, useState, useEffect, forwardRef } from "react";
import { useDragControls } from "framer-motion";
import { X, Volume2, VolumeX, Tv, Loader2, Maximize2, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import logoEcclesiaTv from "@/assets/logo-ecclesia-tv.png";
import ResizableContainer from "./ResizableContainer";

const ECCLESIA_TV_STREAM_URL = "https://video1.getstreamhosting.com:1936/8018/8018/playlist.m3u8";

interface FloatingTVPreviewProps {
  onClose: () => void;
  onNavigate: () => void;
}

export const FloatingTVPreview = forwardRef<HTMLDivElement, FloatingTVPreviewProps>(
  ({ onClose, onNavigate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

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
      <ResizableContainer position="right" initialSize="small">
        <div 
          ref={ref}
          className="bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-elegant overflow-hidden w-full"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-2 flex items-center justify-between cursor-grab">
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3 text-white/50" />
              <div className="w-5 h-5 rounded bg-white p-0.5 overflow-hidden">
                <img src={logoEcclesiaTv} alt="Ecclesia TV" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-white font-bold text-[10px] sm:text-xs">Ecclesia TV</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                  <span className="text-white/70 text-[8px] sm:text-[10px]">Direct</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-white/70 hover:text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          {/* Video Preview */}
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
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleMute}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 text-white" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-white" />
                  )}
                </button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1 h-5 text-[8px] sm:text-[10px] px-1.5"
                  onClick={onNavigate}
                >
                  <Maximize2 className="w-2.5 h-2.5" />
                  Plein écran
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-1.5 flex items-center justify-between bg-card">
            <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-muted-foreground">
              <Tv className="w-3 h-3" />
              <span>24h/24</span>
            </div>
          </div>
        </div>
      </ResizableContainer>
    );
  }
);

FloatingTVPreview.displayName = "FloatingTVPreview";

export default FloatingTVPreview;
