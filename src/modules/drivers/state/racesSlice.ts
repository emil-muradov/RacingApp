import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store.ts';
import { fetchRaces } from '../services/api-service.ts';
import { Race } from '../types/api-types.ts';

export const fetchRacesThunk = createAsyncThunk('fetch/races', fetchRaces);

const racesAdapter = createEntityAdapter<{ races: Race[]; driverId: string }, string>({
  selectId: (races) => races.driverId,
});

const initialState = racesAdapter.getInitialState({
  loading: false,
  error: null,
});

const racesSlice = createSlice({
  name: 'races',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRacesThunk.fulfilled, (state, action) => {
      const { MRData } = action.payload;
      racesAdapter.addOne(state, { driverId: MRData.RaceTable.driverId, races: MRData.RaceTable.Races });
    });
  },
});

export const { selectById: selectRacesById } = racesAdapter.getSelectors<RootState>((state) => state.races);

export default racesSlice.reducer;
