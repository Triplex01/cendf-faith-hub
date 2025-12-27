import { Play, Pause, Volume2, VolumeX, Loader2, Radio as RadioIcon } from "lucide-react";
import { useRadioPlayer } from "@/hooks/useRadioPlayer";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
interface RadioPlayerProps {
  variant?: "full" | "compact" | "mini";
  className?: string;
}
const RadioPlayer = ({
  variant = "full",
  className
}: RadioPlayerProps) => {
  const {
    isPlaying,
    isLoading,
    volume,
    currentProgram,
    currentHost,
    error,
    toggle,
    setVolume
  } = useRadioPlayer();
  if (variant === "mini") {
    return <div className={cn("flex items-center gap-3", className)}>
        <button onClick={toggle} disabled={isLoading} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all">
          {isLoading ? <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" /> : isPlaying ? <Pause className="w-5 h-5 text-primary-foreground" /> : <Play className="w-5 h-5 text-primary-foreground ml-0.5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span className="text-sm font-medium">102.8 FM</span>
        </div>
      </div>;
  }
  if (variant === "compact") {
    return <div className={cn("bg-card rounded-xl p-4 border border-border shadow-card", className)}>
        <div className="flex items-center gap-4">
          <button onClick={toggle} disabled={isLoading} className="w-14 h-14 rounded-full bg-gradient-burgundy flex items-center justify-center hover:shadow-burgundy transition-all flex-shrink-0">
            {isLoading ? <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" /> : isPlaying ? <Pause className="w-6 h-6 text-primary-foreground" /> : <Play className="w-6 h-6 text-primary-foreground ml-1" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                En Direct • 102.8 FM
              </span>
            </div>
            <p className="font-display font-bold text-foreground truncate">
              {currentProgram}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {currentHost}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-28">
            {volume === 0 ? <VolumeX className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
            <Slider value={[volume * 100]} onValueChange={([v]) => setVolume(v / 100)} max={100} step={1} className="flex-1" />
          </div>
        </div>
        
        {error && <p className="text-xs text-destructive mt-2">{error}</p>}
      </div>;
  }

  // Full variant
  return <div className={cn("bg-gradient-to-br from-primary to-primary-glow rounded-2xl p-8 shadow-elegant text-primary-foreground", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
        <span className="text-sm font-medium uppercase tracking-wider">En Direct</span>
        <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs font-bold">
          102.8 FM
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <button onClick={toggle} disabled={isLoading} className="w-24 h-24 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-all group">
          {isLoading ? <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" /> : isPlaying ? <Pause className="w-10 h-10 text-primary-foreground group-hover:scale-110 transition-transform" /> : <Play className="w-10 h-10 text-primary-foreground ml-1 group-hover:scale-110 transition-transform" />}
        </button>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-display text-3xl font-bold mb-2">Radio Espoir</h2>
          <p className="text-primary-foreground/80 text-lg mb-1">
            Programme en cours : <strong>{currentProgram}</strong>
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Animé par {currentHost}
          </p>
          {error && <p className="text-secondary text-sm mt-2">{error}</p>}
        </div>

        <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-full px-6 py-3">
          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          <div className="w-24 h-2 bg-primary-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all" style={{
            width: `${volume * 100}%`
          }} />
          </div>
        </div>
      </div>

      {/* Frequency indicator */}
      <div className="mt-6 pt-6 border-t border-primary-foreground/20">
        <div className="flex items-center justify-center gap-4">
          <RadioIcon className="w-5 h-5 text-secondary" />
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold">102.8</span>
            <span className="text-lg font-medium text-primary-foreground/70">MHz FM</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <div key={i} className={cn("w-1 rounded-full bg-secondary transition-all", isPlaying ? "animate-pulse" : "")} style={{
            height: `${8 + i * 4}px`,
            animationDelay: `${i * 0.1}s`
          }} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default RadioPlayer;