export type ThemeType = 'light' | 'dark' | 'system';

export interface PreferenceState {
  userDefaultedTheme: ThemeType; // persisted theme
  currentTheme: ThemeType; // ephemeral theme for UI
  isLoading: boolean;
  error?: string | undefined;
}
