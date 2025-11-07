import { createContext, useContext, useState } from 'react';
import { SettingsManager } from '@/lib/user-settings';

export type Collapsible = 'offcanvas' | 'icon' | 'none';
export type Variant = 'inset' | 'sidebar' | 'floating';

// Default values
const DEFAULT_VARIANT = 'inset';
const DEFAULT_COLLAPSIBLE = 'icon';

type LayoutContextType = {
  resetLayout: () => void;

  defaultCollapsible: Collapsible;
  collapsible: Collapsible;
  setCollapsible: (collapsible: Collapsible) => void;

  defaultVariant: Variant;
  variant: Variant;
  setVariant: (variant: Variant) => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

type LayoutProviderProps = {
  children: React.ReactNode;
};

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [collapsible, _setCollapsible] = useState<Collapsible>(() => {
    const saved = SettingsManager.get<Collapsible>('layout.collapsible');
    return (saved as Collapsible) || DEFAULT_COLLAPSIBLE;
  });

  const [variant, _setVariant] = useState<Variant>(() => {
    const saved = SettingsManager.get<Variant>('layout.variant');
    return (saved as Variant) || DEFAULT_VARIANT;
  });

  const setCollapsible = (newCollapsible: Collapsible) => {
    _setCollapsible(newCollapsible);
    SettingsManager.set('layout.collapsible', newCollapsible);
  };

  const setVariant = (newVariant: Variant) => {
    _setVariant(newVariant);
    SettingsManager.set('layout.variant', newVariant);
  };

  const resetLayout = () => {
    SettingsManager.reset('layout.collapsible');
    SettingsManager.reset('layout.variant');
    setCollapsible(DEFAULT_COLLAPSIBLE);
    setVariant(DEFAULT_VARIANT);
  };

  const contextValue: LayoutContextType = {
    resetLayout,
    defaultCollapsible: DEFAULT_COLLAPSIBLE,
    collapsible,
    setCollapsible,
    defaultVariant: DEFAULT_VARIANT,
    variant,
    setVariant,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

// Define the hook for the provider
export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
