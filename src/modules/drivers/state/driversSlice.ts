import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axios';

export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async (page: number) => {
  const response = await axiosInstance.get(`/drivers.json?limit=10&offset=${page * 10}`);
  console.log('drivers', response.data.MRData.DriverTable.Drivers.map(d => Object.keys(d)));
  return response.data.MRData.DriverTable.Drivers;
});

const driversSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.loading = false;
      state.drivers = action.payload;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default driversSlice.reducer;
