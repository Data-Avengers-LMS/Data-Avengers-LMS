import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  fetchPreferences,
  patchPreferences,
} from '@thunks/preference.thunk.js';
import { PreferenceState } from '@/types/themePreference.types.js';

export const addThemePreferenceExtraReducers = (
  builder: ActionReducerMapBuilder<PreferenceState>
) => {
  builder
    .addCase(fetchPreferences.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchPreferences.fulfilled, (state, action) => {
      state.userDefaultedTheme = action.payload.theme;
      state.currentTheme = action.payload.theme;
      state.isLoading = false;
      state.error = undefined;
    })
    .addCase(fetchPreferences.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(patchPreferences.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(patchPreferences.fulfilled, (state, action) => {
      state.userDefaultedTheme = action.payload.theme;
      state.isLoading = false;
      state.error = undefined;
    })
    .addCase(patchPreferences.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
};
