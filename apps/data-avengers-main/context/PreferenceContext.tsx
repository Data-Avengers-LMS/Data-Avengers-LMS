'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import {
  useAppDispatch,
  useAppSelector,
} from '@repo/redux-toolkit/hooks/useTypedHooks';
import { ThemeType } from '@repo/redux-toolkit/types/themePreference.types';
import {
  setCurrentTheme,
  syncFromLocalStorage,
} from '@repo/redux-toolkit/slices/themePreference.slice';
import {
  fetchPreferences,
  patchPreferences,
} from '@repo/redux-toolkit/thunks/preference.thunk';

interface PreferencesContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

// Helper functions
const getPersistedTheme = (): ThemeType | null => {
  const persistedState = localStorage.getItem('persist:user-theme');
  const parsed = persistedState ? JSON.parse(persistedState) : null;
  const preferences = parsed
    ? JSON.parse(parsed.themePreference || '{}')
    : null;
  return preferences?.userDefaultedTheme !== 'light'
    ? preferences?.userDefaultedTheme
    : null;
};

const getOppositeTheme = (theme: ThemeType): ThemeType =>
  theme === 'light' ? 'dark' : 'light';

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const { setTheme: setNextTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { userDefaultedTheme, currentTheme } = useAppSelector(
    (state) => state.preferences
  );
  const [isReady, setIsReady] = useState(false);

  // Initialize preferences
  useEffect(() => {
    const initializePreferences = async () => {
      setIsReady(false);
      const persistedTheme = getPersistedTheme();

      persistedTheme
        ? dispatch(syncFromLocalStorage(persistedTheme))
        : await dispatch(fetchPreferences()).catch(() => {});

      setIsReady(true);
    };

    initializePreferences();
  }, [dispatch]);

  // Sync next-themes
  useEffect(() => {
    isReady && setNextTheme(currentTheme);
  }, [isReady, currentTheme, setNextTheme]);

  const toggleTheme = () => {
    const newTheme = getOppositeTheme(currentTheme);

    dispatch(setCurrentTheme(newTheme));
    setNextTheme(newTheme);

    dispatch(patchPreferences({ theme: newTheme }))
      .unwrap()
      .catch(() => {
        dispatch(setCurrentTheme(userDefaultedTheme));
        setNextTheme(userDefaultedTheme);
      });
  };

  return !isReady ? (
    <div className="p-4 text-center">Loading...</div>
  ) : (
    <PreferencesContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('Must be used within PreferencesProvider');
  return context;
};
