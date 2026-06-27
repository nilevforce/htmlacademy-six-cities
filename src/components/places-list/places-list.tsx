import {
  ReactElement, SyntheticEvent,
  useState
} from 'react';
import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';

interface PlaceListProps {
  offers: Offer[];
}

function PlacesList ({ offers }: PlaceListProps): ReactElement {
  // TODO: Добавить параметр состояния
  const [, setActiveCardOfferId] = useState<string>();

  const handleCardHover = (evt: SyntheticEvent<HTMLElement>) => {
    const offerId = evt.currentTarget.dataset.offerId;
    if (offerId) {
      setActiveCardOfferId(offerId);
    }
  };

  const handleCardHoverLeave = () => {
    setActiveCardOfferId(undefined);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          id={offer.id}
          imageSrc={offer.previewImage}
          title={offer.title}
          price={offer.price}
          type={offer.type}
          isPremium={offer.isPremium}
          isFavorite={offer.isFavorite}
          rating={offer.rating}
          onCardHover={handleCardHover}
          onCardLeave={handleCardHoverLeave}
        />
      ))}
    </div>
  );
}

export default PlacesList;
