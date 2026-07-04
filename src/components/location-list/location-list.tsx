import { ReactElement, SyntheticEvent } from 'react';
import Location from '../location/location.tsx';

interface LocationListProps {
  cities: string[];
  activeCity: string;
  onChangeLocation: (selectedCity: string) => void;
}

function LocationList (props: LocationListProps): ReactElement {
  const {
    cities,
    activeCity,
    onChangeLocation
  } = props;

  const handleLocationClick = (evt: SyntheticEvent<HTMLElement>) => {
    const selectedCity: string = evt.currentTarget?.dataset?.jsId ?? activeCity;

    if (selectedCity === activeCity) {
      return;
    }

    onChangeLocation(selectedCity);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <Location
          key={city}
          id={city}
          title={city}
          isActive={city === activeCity}
          onClickLocation={handleLocationClick}
        />))}
    </ul>
  );
}

export default LocationList;
