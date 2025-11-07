import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';
import { Button } from '@workspace/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@workspace/ui/components/ui/dropdown-menu';
import type { ComponentProps } from 'react';

interface ProfileDropdownProps {
  username: string;
  email: string;
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: string;
  buttonProps?: ComponentProps<typeof Button>;
  onProfileClick?: () => void;
  onBillingClick?: () => void;
  onSettingsClick?: () => void;
  onNewTeamClick?: () => void;
  onSignOutClick?: () => void;
}

export function ProfileDropdown({
  username,
  email,
  avatarSrc = '/avatars/01.png',
  avatarAlt = '@user',
  avatarFallback = 'US',
  buttonProps,
  onProfileClick,
  onBillingClick,
  onSettingsClick,
  onNewTeamClick,
  onSignOutClick,
}: ProfileDropdownProps) {

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full" {...buttonProps}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarSrc} alt={avatarAlt} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm leading-none font-medium">{username}</p>
              <p className="text-muted-foreground text-xs leading-none">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onProfileClick}>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onBillingClick}>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onNewTeamClick}>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={onSignOutClick}>
            Sign out
            <DropdownMenuShortcut className="text-current">
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
