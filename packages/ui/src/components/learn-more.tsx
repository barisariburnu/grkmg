import { type Root, type Content, type Trigger } from '@radix-ui/react-popover';
import { Button } from '@workspace/ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/ui/popover';
import { cn } from '@workspace/ui/lib/utils';
import type { LearnMoreProps } from '@workspace/ui/types/overlays';
import { MessageCircleQuestion } from 'lucide-react';

export function LearnMore({
  children,
  contentProps,
  triggerProps,
  ...props
}: LearnMoreProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger
        asChild
        {...triggerProps}
        className={cn('size-5 rounded-full', triggerProps?.className)}
      >
        <Button variant="outline" size="icon">
          <span className="sr-only">Learn more</span>
          <MessageCircleQuestion className="size-4 [&>circle]:hidden" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        {...contentProps}
        className={cn('text-muted-foreground text-sm', contentProps?.className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
