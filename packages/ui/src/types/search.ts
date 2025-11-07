import type { ComponentProps } from 'react';
import type { Button } from '@workspace/ui/components/ui/button';

export type SearchProps = {
  className?: string;
  placeholder?: string;
  onOpen?: () => void;
  buttonProps?: ComponentProps<typeof Button>;
};
