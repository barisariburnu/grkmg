import { useEffect, useRef } from 'react';
import type { NavigationProgressProps } from '@workspace/ui/types/overlays';
import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar';

export function NavigationProgress({
  pending = false,
}: NavigationProgressProps) {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if (pending) {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [pending]);

  return (
    <LoadingBar
      color="var(--muted-foreground)"
      ref={ref}
      shadow={true}
      height={2}
    />
  );
}
