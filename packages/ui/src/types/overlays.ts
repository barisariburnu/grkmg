import type { Root, Content, Trigger } from '@radix-ui/react-popover';

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  disabled?: boolean;
  desc: React.JSX.Element | string;
  cancelBtnText?: string;
  confirmText?: React.ReactNode;
  destructive?: boolean;
  handleConfirm: () => void;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export type LearnMoreProps = React.ComponentProps<typeof Root> & {
  contentProps?: React.ComponentProps<typeof Content>;
  triggerProps?: React.ComponentProps<typeof Trigger>;
};

export type LongTextProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export type NavigationProgressProps = {
  pending?: boolean;
};
