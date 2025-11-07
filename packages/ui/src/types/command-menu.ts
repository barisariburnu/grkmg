import type { IconComponent } from '@workspace/ui/types/shared';
import type { BaseTeam } from '@workspace/ui/types/team';
import type { Theme } from '@workspace/ui/types/theme';

export type SidebarLink = {
  title: string;
  url: string;
  icon?: IconComponent;
  badge?: string;
};

export type SidebarSection = { title: string; items: SidebarLink[] };
export type SidebarItem = SidebarLink | SidebarSection;
export type CommandNavGroup = { title: string; items: SidebarItem[] };

export type UserInfo = { name: string; email: string; avatar: string };

export type SidebarData = {
  navGroups: CommandNavGroup[];
  user?: UserInfo;
  teams?: BaseTeam[];
};

export type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navigate: (to: string) => void;
  setTheme: (theme: Theme) => void;
  sidebarData: SidebarData;
};
