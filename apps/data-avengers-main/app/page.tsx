'use client';

import * as React from 'react';
import {
  Moon,
  Sun,
  Monitor,
  Check,
  Palette,
  Leaf,
  Waves,
  Sparkles,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@repo/shadcn-next/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@repo/shadcn-next/dropdown-menu';

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

  const themes = [
    {
      name: 'Light',
      value: 'light',
      icon: Sun,
      description: 'Clean light theme',
    },
    {
      name: 'Dark',
      value: 'dark',
      icon: Moon,
      description: 'Easy on the eyes',
    },
    {
      name: 'Data Avengers',
      value: 'data-avengers',
      icon: Palette,
      description: 'Custom orange theme',
    },
    {
      name: 'Ocean',
      value: 'ocean',
      icon: Waves,
      description: 'Custom blue theme',
    },
    {
      name: 'Peace',
      value: 'peace',
      icon: Leaf,
      description: 'Custom green theme',
    },
    {
      name: 'Gold',
      value: 'gold',
      icon: Sparkles,
      description: 'Custom golden theme',
    },
    {
      name: 'System',
      value: 'system',
      icon: Monitor,
      description: 'Use system preference',
    },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
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
        {themes.map((themeOption) => {
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

// Default export required by Next.js for page components
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header with theme selector */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Data Avengers LMS</h2>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              Welcome to Docs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our beautiful theme system with multiple color schemes
              and seamless dark mode support.
            </p>
          </div>

          {/* Theme showcase cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Sun className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Light Theme</h3>
              <p className="text-sm text-muted-foreground">
                Clean and bright interface for daytime productivity
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Moon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Dark Theme</h3>
              <p className="text-sm text-muted-foreground">
                Easy on the eyes for late-night coding sessions
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Palette className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Data Avengers</h3>
              <p className="text-sm text-muted-foreground">
                Bold orange theme with fiery personality
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Leaf className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Peace</h3>
              <p className="text-sm text-muted-foreground">
                Calm green theme for peaceful productivity
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Waves className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Ocean</h3>
              <p className="text-sm text-muted-foreground">
                Deep blue theme inspired by ocean depths
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Gold</h3>
              <p className="text-sm text-muted-foreground">
                Luxurious golden theme for premium experience
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Button size="lg" className="gap-2">
              <Palette className="h-4 w-4" />
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
