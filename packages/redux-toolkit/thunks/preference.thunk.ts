import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemeType } from '../types/themePreference.types';

// Generic thunk that accepts an API function as parameter
export const fetchPreferences = createAsyncThunk<
  { theme: ThemeType },
  void,
  { rejectValue: string }
>('preferences/fetchPreferences', async (_, { rejectWithValue }) => {
  try {
    // Return default preferences for now
    // The actual API call should be handled in the component
    return { theme: 'light' as ThemeType };
  } catch {
    return rejectWithValue('Failed to fetch preferences');
  }
});

export const patchPreferences = createAsyncThunk<
  { theme: ThemeType },
  { theme: ThemeType },
  { rejectValue: string }
>('preferences/patchPreferences', async (preferences, { rejectWithValue }) => {
  try {
    // Return the preferences directly for now
    // The actual API call should be handled in the component
    return preferences;
  } catch {
    return rejectWithValue('Failed to update preferences');
  }
});
