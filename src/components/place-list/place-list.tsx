import {
  ReactElement,
  SyntheticEvent,
} from 'react';
import classNames from 'classnames';
import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

interface PlaceListProps {
  type: 'cities' | 'near-places';
  offers: Offer[];
  onPlaceCardHover: (offerId: string | null) => void;
}

function PlaceList (props: PlaceListProps): ReactElement {
  const {
    offers,
    type,
    onPlaceCardHover
  } = props;

  const handleCardHover = (evt: SyntheticEvent<HTMLElement>) => {
    const offerId = evt.currentTarget.dataset.offerId || null;
    onPlaceCardHover(offerId);
  };

  const handleCardHoverLeave = () => {
    onPlaceCardHover(null);
  };

  return (
    <div
      className={
        classNames(
          type === 'cities' && 'cities__places-list',
          type === 'near-places' && 'near-places__list',
          'places__list',
          'tabs__content'
        )
      }
    >
      {
        offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            type={type}
            place={{
              id: offer.id,
              imageSrc: offer.previewImage,
              title: offer.title,
              price: offer.price,
              type: offer.type,
              isPremium: offer.isPremium,
              isFavorite: offer.isFavorite,
              rating: offer.rating
            }}
            onCardHover={handleCardHover}
            onCardLeave={handleCardHoverLeave}
          />
        ))
      }
    </div>
  );
}

export default PlaceList;
