import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X, Radio, Loader2, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useRadio } from "@/contexts/RadioContext";
import ResizableContainer from "./ResizableContainer";

import logoRadioEspoir from "@/assets/logo-radio-espoir.png";
import logoRnc from "@/assets/logo-rnc.png";
import logoRadioSanwi from "@/assets/logo-radio-sanwi.png";

const RADIO_LOGOS: Record<string, string> = {
  "espoir": logoRadioEspoir,
  "voix-evangile": logoRnc,
  "paix-sanwi": logoRadioSanwi,
};

interface FloatingRadioPreviewProps {
  onClose: () => void;
  onNavigate: () => void;
}

export const FloatingRadioPreview = forwardRef<HTMLDivElement, FloatingRadioPreviewProps>(
  ({ onClose, onNavigate }, ref) => {
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
    const currentLogo = currentStation ? RADIO_LOGOS[currentStation.id] || logoRadioEspoir : logoRadioEspoir;

    return (
      <ResizableContainer position="left" initialSize="small">
        <div 
          ref={ref}
          className="bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-elegant overflow-hidden w-full"
        >
          {/* Header */}
          <div className="bg-gradient-burgundy p-2 flex items-center justify-between cursor-grab">
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3 text-primary-foreground/50" />
              <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center overflow-hidden p-0.5">
                <img src={currentLogo} alt={currentStation?.name || "Radio"} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-primary-foreground font-bold text-[10px] sm:text-xs truncate max-w-[80px] sm:max-w-[120px]">
                  {currentStation?.name || "Radio"}
                </p>
                <div className="flex items-center gap-1">
                  {isPlaying && <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />}
                  <span className="text-primary-foreground/80 text-[8px] sm:text-[10px]">
                    {currentStation?.frequency || "Direct"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
              onClick={onClose}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          {/* Visualizer */}
          <div className="flex items-center justify-center gap-0.5 h-8 sm:h-10 bg-gradient-to-r from-primary/10 to-secondary/10 p-2">
            {isPlaying ? (
              [...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary via-primary to-secondary rounded-full"
                  animate={{
                    height: [4, 10 + Math.random() * 14, 4],
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
              <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
                <Loader2 className="w-3 h-3 animate-spin text-primary" />
                <span>Connexion...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
                <Radio className="w-3 h-3" />
                <span>Pause</span>
              </div>
            )}
          </div>

          {/* Program info */}
          <div className="bg-muted/50 p-1.5 mx-1.5 my-1 rounded-lg">
            <p className="text-[9px] sm:text-[10px] font-semibold text-foreground truncate">{currentProgram}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded mx-1.5 p-1 mb-1">
              <p className="text-[8px] text-destructive truncate">{error}</p>
            </div>
          )}

          {/* Controls */}
          <div className="p-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="burgundy"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg"
                onClick={() => toggle()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </Button>

              {/* Volume */}
              <div
                className="flex items-center gap-1"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
                >
                  {volume === 0 ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3" />
                  )}
                </Button>
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 50, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Slider
                        value={[volume * 100]}
                        onValueChange={([val]) => setVolume(val / 100)}
                        max={100}
                        step={1}
                        className="w-12"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigate */}
            <Button
              variant="outline"
              size="sm"
              className="gap-1 h-6 text-[8px] sm:text-[10px] px-1.5"
              onClick={onNavigate}
            >
              <Radio className="w-2.5 h-2.5" />
              Radio
            </Button>
          </div>
        </div>
      </ResizableContainer>
    );
  }
);

FloatingRadioPreview.displayName = "FloatingRadioPreview";

export default FloatingRadioPreview;
