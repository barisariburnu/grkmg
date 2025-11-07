import type { ComponentProps } from 'react';
import { ConfirmDialog } from '@workspace/ui/components/confirm-dialog.js';

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  title?: string;
  desc?: string;
  confirmText?: string;
  destructive?: boolean;
  className?: ComponentProps<typeof ConfirmDialog>['className'];
}

export function SignOutDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Sign out',
  desc = 'Are you sure you want to sign out? You will need to sign in again to access your account.',
  confirmText = 'Sign out',
  destructive = true,
  className,
}: SignOutDialogProps) {
  const handleSignOut = () => {
    onConfirm?.();
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      desc={desc}
      confirmText={confirmText}
      destructive={destructive}
      handleConfirm={handleSignOut}
      className={className ?? 'sm:max-w-sm'}
    />
  );
}
