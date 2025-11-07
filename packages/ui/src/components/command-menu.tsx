import React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@workspace/ui/components/ui/command';
import { ScrollArea } from '@workspace/ui/components/ui/scroll-area';
import type {
  SidebarLink,
  SidebarSection,
  SidebarItem,
  CommandNavGroup,
  SidebarData,
  CommandMenuProps,
} from '@workspace/ui/types/command-menu';
import type { Theme } from '@workspace/ui/types/theme';
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from 'lucide-react';

export function CommandMenu({
  open,
  onOpenChange,
  navigate,
  setTheme,
  sidebarData,
}: CommandMenuProps) {
  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange],
  );

  return (
    <CommandDialog modal open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea type="hover" className="h-72 pe-1">
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group: CommandNavGroup) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem: SidebarItem, i: number) => {
                if ('url' in navItem)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate(navItem.url));
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  );

                return (navItem as SidebarSection).items?.map(
                  (subItem: SidebarLink, j: number) => (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${j}`}
                      value={`${navItem.title}-${subItem.url}`}
                      onSelect={() => {
                        runCommand(() => navigate(subItem.url));
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="text-muted-foreground/80 size-2" />
                      </div>
                      {navItem.title} <ChevronRight /> {subItem.title}
                    </CommandItem>
                  ),
                );
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              onSelect={() => runCommand(() => setTheme('light' as Theme))}
            >
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setTheme('dark' as Theme))}
            >
              <Moon className="scale-90" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setTheme('system' as Theme))}
            >
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
