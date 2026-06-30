import offers from './offers.ts';
import { City } from '../types/city.ts';

const getCities = (): City[] => {
  const cityNames = new Set<string>;
  const cities: City[] = [];

  offers.map((offer) => {
    const { name, location } = offer.city;

    if (cityNames.has(name)) {
      return;
    }

    cityNames.add(name);
    cities.push({
      name,
      location
    });
  });

  return cities;
};

const cities = getCities();

export default cities;
