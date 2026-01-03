import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

// Radio Espoir 102.8 MHz - Flux réel
const RADIO_STREAM_URL = "https://dc1.serverse.com/proxy/radioespoir/stream";

export interface RadioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentProgram: string;
  currentHost: string;
  error: string | null;
  isMinimized: boolean;
}

interface RadioContextType extends RadioState {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  setVolume: (volume: number) => void;
  updateProgram: (program: string, host: string) => void;
  setMinimized: (minimized: boolean) => void;
}

const RadioContext = createContext<RadioContextType | null>(null);

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used within RadioProvider");
  }
  return context;
};

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<RadioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.75,
    currentProgram: "Les Échos de la Foi",
    currentHost: "Père Thomas Adjobi",
    error: null,
    isMinimized: true,
  });

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;
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
      await audioRef.current.play();
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
    audioRef.current.pause();
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

  const setMinimized = useCallback((minimized: boolean) => {
    setState(prev => ({ ...prev, isMinimized: minimized }));
  }, []);

  return (
    <RadioContext.Provider value={{
      ...state,
      play,
      pause,
      toggle,
      setVolume,
      updateProgram,
      setMinimized,
    }}>
      {children}
    </RadioContext.Provider>
  );
};
