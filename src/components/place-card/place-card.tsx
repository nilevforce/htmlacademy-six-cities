import { ReactElement, SyntheticEvent } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';

interface PlaceCardProps {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  type: string;
  isFavorite?: boolean;
  isPremium?: boolean;
  rating?: number;
  onCardHover?: (evt: SyntheticEvent<HTMLElement>) => void;
  onCardLeave?: (evt: SyntheticEvent<HTMLElement>) => void;
}

function getWidthPercent (rating: number): string {
  return `${(rating / 5) * 100}%`;
}

function PlaceCard ({
  id,
  title,
  type,
  imageSrc,
  price,
  isPremium = false,
  isFavorite = false,
  rating = 0,
  onCardHover,
  onCardLeave
}: PlaceCardProps): ReactElement {
  const mark = isPremium ? 'Premium' : null;
  const linkToOffer = generatePath(AppRoute.Offer, { offerId: id });

  return (
    <article
      className="cities__card place-card"
      data-offer-id={id}
      onMouseEnter={onCardHover}
      onMouseLeave={onCardLeave}
    >
      {
        mark && (
          <div className="place-card__mark">
            <span>{mark}</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={linkToOffer}>
          <img
            className="place-card__image"
            src={imageSrc}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={[
              'place-card__bookmark-button',
              'button',
              isFavorite && 'place-card__bookmark-button--active',
            ].filter(Boolean).join(' ')}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getWidthPercent(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkToOffer}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
