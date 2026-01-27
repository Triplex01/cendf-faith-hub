import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

// Radios disponibles
export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  streamUrl: string;
  logo?: string;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "espoir",
    name: "Radio Espoir",
    frequency: "102.8 FM",
    streamUrl: "https://dc1.serverse.com/proxy/radioespoir/stream",
  },
  {
    id: "voix-evangile",
    name: "La Voix de l'Évangile",
    frequency: "102.5 FM",
    streamUrl: "http://84.16.232.202:7139/stream",
  },
  {
    id: "paix-sanwi",
    name: "Radio Paix Sanwi",
    frequency: "89.2 FM",
    streamUrl: "https://dc1.serverse.com/proxy/rda/stream",
  },
];

export interface RadioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  currentStation: RadioStation | null;
  currentProgram: string;
  currentHost: string;
  error: string | null;
  isMinimized: boolean;
}

interface RadioContextType extends RadioState {
  play: (station?: RadioStation) => Promise<void>;
  pause: () => void;
  toggle: (station?: RadioStation) => void;
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
    currentStation: null,
    currentProgram: "En direct",
    currentHost: "",
    error: null,
    isMinimized: true,
  });

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;
    
    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
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
      setState(prev => ({ ...prev, isLoading: false, isPlaying: true, isMinimized: false }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    audioRef.current.addEventListener("error", handleError);
    audioRef.current.addEventListener("canplay", handleCanPlay);
    audioRef.current.addEventListener("waiting", handleWaiting);
    audioRef.current.addEventListener("playing", handlePlaying);
    audioRef.current.addEventListener("pause", handlePause);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("waiting", handleWaiting);
        audioRef.current.removeEventListener("playing", handlePlaying);
        audioRef.current.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  const play = useCallback(async (station?: RadioStation) => {
    if (!audioRef.current) return;
    
    const targetStation = station || state.currentStation || RADIO_STATIONS[0];
    
    // Si on change de station
    if (state.currentStation?.id !== targetStation.id) {
      audioRef.current.pause();
      audioRef.current.src = targetStation.streamUrl;
      setState(prev => ({ 
        ...prev, 
        currentStation: targetStation,
        currentProgram: `En direct sur ${targetStation.name}`,
        isLoading: true, 
        error: null, 
        isMinimized: false 
      }));
    } else {
      setState(prev => ({ ...prev, isLoading: true, error: null, isMinimized: false }));
    }
    
    try {
      await audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false, isMinimized: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Impossible de démarrer la lecture.",
      }));
    }
  }, [state.currentStation]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const toggle = useCallback((station?: RadioStation) => {
    const targetStation = station || state.currentStation;
    
    // Si on clique sur la même station qui joue, on pause
    if (state.isPlaying && targetStation?.id === state.currentStation?.id) {
      pause();
    } else {
      // Sinon on joue la nouvelle station (ou la même si elle était en pause)
      play(targetStation || RADIO_STATIONS[0]);
    }
  }, [state.isPlaying, state.currentStation, play, pause]);

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
