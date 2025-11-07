import type { IconComponent } from '@workspace/ui/types/shared';

export type BaseTeam = {
  name: string;
  logo: IconComponent;
  plan: string;
};

export type TeamSwitcherProps<T extends BaseTeam = BaseTeam> = {
  teams: T[];
  onTeamChange?: (team: T) => void;
};
