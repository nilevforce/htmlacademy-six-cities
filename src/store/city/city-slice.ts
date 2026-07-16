import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../constants.ts';
import type { CityState } from '../../types/state.ts';

const initialState: CityState = {
  currentCity: CITIES[0]
};

const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityState['currentCity']>) => {
      state.currentCity = action.payload;
    }
  }
});

export default citySlice;
