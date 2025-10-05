import { ThemeType } from '@repo/redux-toolkit/types/themePreference.types';
import apiClient from './client';

export const preferencesApi = {
  getPreferences: () =>
    apiClient.get<{ theme: ThemeType }>('/user/preferences'),
  updatePreferences: (preferences: { theme: ThemeType }) =>
    apiClient.patch<{ theme: ThemeType }>('/user/preferences', preferences),
};
