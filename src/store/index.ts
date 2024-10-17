import { configureStore } from '@reduxjs/toolkit';
import driversReducer from '../modules/drivers/state/driversSlice.ts';

export const store = configureStore({
  reducer: {
    drivers: driversReducer,
  },
});
