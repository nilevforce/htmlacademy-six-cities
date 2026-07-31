import { CITIES } from '../../../constants.ts';
import citySlice from '../city-slice.ts';
import { changeCity } from '../city-actions.ts';

describe('City reducer', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentCity: CITIES[0]
    };

    const result = citySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentCity: CITIES[0]
    };

    const result = citySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set currentCity to the provided city', () => {
    const expectedState = {
      currentCity: CITIES[1]
    };

    const result = citySlice.reducer(undefined, changeCity(CITIES[1]));

    expect(result).toEqual(expectedState);
  });
});
