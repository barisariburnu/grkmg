import type { IconComponent } from '@workspace/ui/types/shared';

export type NavLink = {
  title: string;
  url: string;
  icon?: IconComponent;
  badge?: string;
  disabled?: boolean;
};

export type NavCollapsible = {
  title: string;
  url: string;
  icon?: IconComponent;
  badge?: string;
  items: NavLink[];
};

export type NavItem = NavLink | NavCollapsible;

export type NavLinkActive = NavLink & { isActive: boolean };

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type NavGroupProps = NavGroup & {
  currentHref: string;
  onNavigate?: (href: string, item: NavLink) => void;
};
