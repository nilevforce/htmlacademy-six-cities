import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, NameSpace } from '../../constants.ts';

type CityName = typeof CITIES[number];

interface CityState {
  currentCity: CityName;
}

const initialState: CityState = {
  currentCity: CITIES[0]
};

const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.currentCity = action.payload;
    }
  }
});

export default citySlice;
