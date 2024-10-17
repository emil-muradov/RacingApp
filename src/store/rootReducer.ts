import { combineReducers } from 'redux';
import driversReducer from '../modules/drivers/state/driversSlice.ts';
import racesReducer from '../modules/drivers/state/racesSlice.ts';

export const rootReducer = combineReducers({
  drivers: driversReducer,
  races: racesReducer,
});
