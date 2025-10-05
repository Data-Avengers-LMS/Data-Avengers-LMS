import { Monitor, Moon, Palette, Sparkles, Sun } from 'lucide-react';

export const themesAvailable: Array<Record<string, any>> = [
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

export const themes = themesAvailable.map((t) => t.value);
