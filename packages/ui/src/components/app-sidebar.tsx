import { AppTitle } from '@workspace/ui/components/app-title';
import { NavGroup } from '@workspace/ui/components/nav-group';
import { NavUser } from '@workspace/ui/components/nav-user';
import { TeamSwitcher } from '@workspace/ui/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@workspace/ui/components/ui/sidebar';
import type { NavGroup as NavGroupType } from '@workspace/ui/types/nav';
import type { BaseTeam } from '@workspace/ui/types/team';

type AppSidebarProps<T extends BaseTeam = BaseTeam> = {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  navGroups: NavGroupType[];
  user?: { name: string; email: string; avatar: string } | undefined;
  teams?: T[] | undefined;
  title?: string;
  subtitle?: string;
  homeHref?: string;
  currentHref?: string;
  onNavigate?: (href: string, item: { title: string; url: string }) => void;
};

export function AppSidebar<T extends BaseTeam = BaseTeam>({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  navGroups,
  user,
  teams = [],
  title = 'App',
  subtitle,
  homeHref = '/',
  currentHref = '',
  onNavigate,
}: AppSidebarProps<T>) {
  const showTeamSwitcher = Array.isArray(teams) && teams.length > 1;

  return (
    <Sidebar side={side} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        {showTeamSwitcher ? (
          <TeamSwitcher teams={teams} />
        ) : (
          <AppTitle title={title} subtitle={subtitle} href={homeHref} />
        )}
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavGroup
            key={group.title}
            title={group.title}
            items={group.items}
            currentHref={currentHref}
            onNavigate={onNavigate}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
