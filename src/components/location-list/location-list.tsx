import { ReactElement, SyntheticEvent } from 'react';
import Location from '../location/location.tsx';
import { City } from '../../types/city.ts';

interface LocationListProps {
  cities: City[];
  activeCityName: string;
  onChangeLocation: (selectedCityName: string) => void;
}

function LocationList (props: LocationListProps): ReactElement {
  const {
    cities,
    activeCityName,
    onChangeLocation
  } = props;

  const handleLocationClick = (evt: SyntheticEvent<HTMLElement>) => {
    const selectedCity: string = evt.currentTarget?.dataset?.jsId ?? activeCityName;

    if (selectedCity === activeCityName) {
      return;
    }

    onChangeLocation(selectedCity);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <Location
          key={city.name}
          id={city.name}
          title={city.name}
          isActive={city.name === activeCityName}
          onClickLocation={handleLocationClick}
        />))}
    </ul>
  );
}

export default LocationList;
