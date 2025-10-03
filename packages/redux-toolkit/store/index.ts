import { configureStore } from '@reduxjs/toolkit';
import { preferenceReducer } from '@slices/themePreference.slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'user-theme',
  storage,
  whitelist: ['themePreference'],
};

const persistedPreferencesReducer = persistReducer(
  persistConfig,
  preferenceReducer
);

export const store = configureStore({
  reducer: {
    preferences: persistedPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
