import { Button } from '@workspace/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/ui/dropdown-menu';
import { cn } from '@workspace/ui/lib/utils';
import { Menu } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { NavLinkActive as NavLinkItem } from '@workspace/ui/types/nav';

// NavLinkItem type centralized in @workspace/ui/types/nav as NavLinkActive

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: NavLinkItem[];
  onLinkClick?: (href: string, link: NavLinkItem) => void;
  mobileButtonProps?: ComponentProps<typeof Button>;
};

export function TopNav({ className, links, onLinkClick, mobileButtonProps, ...props }: TopNavProps) {
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="md:size-7" {...mobileButtonProps}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {links.map(({ title, url, isActive, disabled }) => (
              <DropdownMenuItem key={`${title}-${url}`} asChild>
                {onLinkClick ? (
                  <button
                    type="button"
                    className={!isActive ? 'text-muted-foreground' : ''}
                    onClick={() => onLinkClick(url, { title, url, isActive, disabled })}
                    disabled={disabled}
                  >
                    {title}
                  </button>
                ) : (
                  <a
                    href={url}
                    className={!isActive ? 'text-muted-foreground' : ''}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    onClick={(e) => {
                      if (disabled) e.preventDefault();
                    }}
                  >
                    {title}
                  </a>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6',
          className,
        )}
        {...props}
      >
        {links.map(({ title, url, isActive, disabled }) => (
          onLinkClick ? (
            <button
              key={`${title}-${url}`}
              type="button"
              disabled={disabled}
              onClick={() => onLinkClick(url, { title, url, isActive, disabled })}
              className={`hover:text-primary text-sm font-medium transition-colors ${isActive ? '' : 'text-muted-foreground'}`}
            >
              {title}
            </button>
          ) : (
            <a
              key={`${title}-${url}`}
              href={url}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              onClick={(e) => {
                if (disabled) e.preventDefault();
              }}
              className={`hover:text-primary text-sm font-medium transition-colors ${isActive ? '' : 'text-muted-foreground'}`}
            >
              {title}
            </a>
          )
        ))}
      </nav>
    </>
  );
}
