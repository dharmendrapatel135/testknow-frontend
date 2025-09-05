import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
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

import storage from 'redux-persist/lib/storage'; // uses localStorage by default

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCounterReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedCounterReducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
