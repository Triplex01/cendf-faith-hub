import React, { createContext, useContext, useState, useCallback } from "react";

export interface TVState {
  isPlaying: boolean;
  isMinimized: boolean;
}

interface TVContextType extends TVState {
  play: () => void;
  pause: () => void;
  setMinimized: (minimized: boolean) => void;
  setPlaying: (playing: boolean) => void;
}

const TVContext = createContext<TVContextType | null>(null);

export const useTV = () => {
  const context = useContext(TVContext);
  if (!context) {
    throw new Error("useTV must be used within TVProvider");
  }
  return context;
};

export const TVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TVState>({
    isPlaying: false,
    isMinimized: true,
  });

  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const setMinimized = useCallback((minimized: boolean) => {
    setState(prev => ({ ...prev, isMinimized: minimized }));
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setState(prev => ({ ...prev, isPlaying: playing }));
  }, []);

  return (
    <TVContext.Provider value={{
      ...state,
      play,
      pause,
      setMinimized,
      setPlaying,
    }}>
      {children}
    </TVContext.Provider>
  );
};
