import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addThemePreferenceExtraReducers } from '@extraReducers/themePreference.extraReducers';
import { PreferenceState, ThemeType } from '@/types/themePreference.types';

const initialState: PreferenceState = {
  userDefaultedTheme: 'light',
  currentTheme: 'light',
  isLoading: false,
  error: undefined,
};

const preferenceSlice = createSlice({
  initialState,
  name: 'themePreference',
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
    },
    syncFromLocalStorage: (state, action: PayloadAction<ThemeType>) => {
      state.userDefaultedTheme = action.payload;
      state.currentTheme = action.payload;
    },
  },
  extraReducers: addThemePreferenceExtraReducers,
});

export const { setCurrentTheme, syncFromLocalStorage } =
  preferenceSlice.actions;
export const preferenceReducer = preferenceSlice.reducer;
