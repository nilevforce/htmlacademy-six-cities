import { CITIES, NameSpace } from '../../constants.ts';
import { getCurrentCity } from './city-selectors.ts';

describe('City selectors', () => {
  const state = {
    [NameSpace.City]: {
      currentCity: CITIES[0]
    }
  };

  it('should return current city from state', () => {
    const { currentCity } = state[NameSpace.City];
    const result = getCurrentCity(state);
    expect(result).toBe(currentCity);
  });
});
