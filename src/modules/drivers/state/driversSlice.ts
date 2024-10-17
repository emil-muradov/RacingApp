import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDrivers } from '../services/api-service.ts';
import { Driver } from '../types/api-types.ts';

export const fetchDriversThunk = createAsyncThunk(
  'fetch/drivers',
  ({ page, limit }: { page: number; limit: number }) => fetchDrivers(page, limit),
);

type DriversState = {
  drivers: Driver[];
  total: number;
  loading: boolean;
  error: string | null;
};

const initialState: DriversState = {
  drivers: [],
  total: 0,
  loading: false,
  error: null,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriversThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDriversThunk.fulfilled, (state, action) => {
      state.loading = false;
      const { MRData } = action.payload;
      state.drivers = MRData.DriverTable.Drivers;
      state.total = parseInt(MRData.total, 10);
    });
    builder.addCase(fetchDriversThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export default driversSlice.reducer;
