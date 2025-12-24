import { useState, useRef, useCallback, useEffect } from "react";

// Simulated radio stream URL - In production, replace with actual stream URL
const RADIO_STREAM_URL = "https://stream.zeno.fm/placeholder"; // Placeholder for 102.8 MHz simulation

export interface RadioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentProgram: string;
  currentHost: string;
  error: string | null;
}

export const useRadioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<RadioPlayerState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.75,
    currentProgram: "Les Échos de la Foi",
    currentHost: "Père Thomas Adjobi",
    error: null,
  });

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;
    
    // Simulating radio stream - in production, use actual stream URL
    audioRef.current.src = RADIO_STREAM_URL;
    
    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Connexion à la radio impossible. Vérifiez votre connexion internet.",
      }));
    };

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isLoading: false, error: null }));
    };

    const handleWaiting = () => {
      setState(prev => ({ ...prev, isLoading: true }));
    };

    const handlePlaying = () => {
      setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
    };

    audioRef.current.addEventListener("error", handleError);
    audioRef.current.addEventListener("canplay", handleCanPlay);
    audioRef.current.addEventListener("waiting", handleWaiting);
    audioRef.current.addEventListener("playing", handlePlaying);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("waiting", handleWaiting);
        audioRef.current.removeEventListener("playing", handlePlaying);
      }
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // For simulation purposes, we'll just toggle the state
      // In production with a real stream, uncomment the line below
      // await audioRef.current.play();
      
      // Simulation: Toggle playing state after a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Impossible de démarrer la lecture.",
      }));
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    
    // audioRef.current.pause(); // Uncomment for production
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState(prev => ({ ...prev, volume }));
  }, []);

  const updateProgram = useCallback((program: string, host: string) => {
    setState(prev => ({ ...prev, currentProgram: program, currentHost: host }));
  }, []);

  return {
    ...state,
    play,
    pause,
    toggle,
    setVolume,
    updateProgram,
  };
};
