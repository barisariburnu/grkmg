import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { sidebarData } from '@/layout/data/sidebar-data';
import { useTheme } from '@/providers/theme-provider';
import { CommandMenu } from '@workspace/ui/components/command-menu';
import type { SidebarData } from '@workspace/ui/types/command-menu';
import type { Theme } from '@workspace/ui/types/theme';

type SearchContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

type SearchProviderProps = {
  children: React.ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [open, setOpen] = useState(false);
  const navigateRouter = useNavigate();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        navigate={(to: string) => navigateRouter({ to })}
        setTheme={(theme: Theme) => setTheme(theme)}
        sidebarData={sidebarData as SidebarData}
      />
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('useSearch has to be used within SearchProvider');
  }

  return searchContext;
};
