import { createContext, useContext, useEffect, useState } from 'react';
import { SettingsManager } from '@/lib/user-settings';

export type Direction = 'ltr' | 'rtl';

const DEFAULT_DIRECTION = 'ltr';

type DirectionContextType = {
  defaultDir: Direction;
  dir: Direction;
  setDir: (dir: Direction) => void;
  resetDir: () => void;
};

const DirectionContext = createContext<DirectionContextType | null>(null);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [dir, _setDir] = useState<Direction>(() => {
    const saved = SettingsManager.get<Direction>('direction');
    return saved ?? DEFAULT_DIRECTION;
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', dir);
  }, [dir]);

  const setDir = (dir: Direction) => {
    _setDir(dir);
    SettingsManager.set('direction', dir);
  };

  const resetDir = () => {
    _setDir(DEFAULT_DIRECTION);
    SettingsManager.reset('direction');
  };

  return (
    <DirectionContext.Provider
      value={{
        defaultDir: DEFAULT_DIRECTION,
        dir,
        setDir,
        resetDir,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
}
