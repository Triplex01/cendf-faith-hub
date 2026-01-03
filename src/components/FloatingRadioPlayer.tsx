import { useRadio } from "@/contexts/RadioContext";
import { Play, Pause, Volume2, VolumeX, X, Radio, Loader2, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FloatingRadioPlayer = () => {
  const {
    isPlaying,
    isLoading,
    volume,
    currentProgram,
    currentHost,
    error,
    isMinimized,
    toggle,
    setVolume,
    setMinimized,
    pause,
  } = useRadio();

  const [showVolume, setShowVolume] = useState(false);

  // Ne pas afficher si la radio n'a jamais été jouée
  if (!isPlaying && !isLoading && isMinimized) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-24 right-6 z-50"
      >
        {isMinimized ? (
          // Version mini flottante
          <motion.div 
            className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-elegant p-3 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {/* Radio indicator */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-burgundy flex items-center justify-center">
                <Radio className="w-5 h-5 text-primary-foreground" />
              </div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>

            {/* Info */}
            <div className="max-w-[140px]">
              <p className="text-xs font-medium text-foreground truncate">
                Radio Espoir
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentProgram}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggle}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMinimized(false)}
              >
                <ChevronUp className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  pause();
                  setMinimized(true);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ) : (
          // Version étendue
          <motion.div 
            className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-elegant p-4 w-[320px]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-burgundy flex items-center justify-center">
                  <Radio className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Radio Espoir 102.8</p>
                  <p className="text-xs text-secondary">En direct</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMinimized(true)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Program info */}
            <div className="bg-muted/50 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-foreground">{currentProgram}</p>
              <p className="text-xs text-muted-foreground">Animé par {currentHost}</p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-destructive mb-3">{error}</p>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
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

              {/* Volume */}
              <div className="flex-1 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => setVolume(volume > 0 ? 0 : 0.75)}
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={[volume * 100]}
                  onValueChange={([val]) => setVolume(val / 100)}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Live indicator */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                En cours de lecture
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingRadioPlayer;
