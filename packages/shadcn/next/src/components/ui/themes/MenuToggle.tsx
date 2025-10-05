'use client';

import { themesAvailable } from '@repo/zod-schemas/constants/themes';
import { Check, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '../button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="animate-pulse">
        <div className="h-[1.2rem] w-[1.2rem] bg-muted rounded" />
      </Button>
    );
  }

  const currentTheme = themesAvailable.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 px-3 gap-2 min-w-[120px] justify-start"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {currentTheme?.name || 'Theme'}
          </span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Choose your theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themesAvailable.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;

          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{themeOption.name}</span>
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {themeOption.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
