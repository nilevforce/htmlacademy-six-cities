import {
  ReactElement, SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AppRoute
} from '../../constants.ts';
import Header from '../../components/header/header.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import PlaceList from '../../components/place-list/place-list.tsx';
import Map from '../../components/map/map.tsx';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import {
  Offer,
  OfferDetails
} from '../../types/offer.ts';
import { Review } from '../../types/review.ts';
import { MapPoint } from '../../types/map-points.ts';
import Loader from '../../components/loader/loader.tsx';
import classNames from 'classnames';
import { getRatingPercent } from '../../helpers';
import {
  capitalizeFirstLetter
} from '../../helpers/capitalize-first-letter.ts';
import {
  getNearbyOffers,
  getOffer,
  getOfferReviews
} from '../../store/offer/offer-selectors.ts';
import {
  fetchNearbyOffers,
  fetchOfferById,
  fetchOfferReviews
} from '../../store/offer/offer-api-actions.ts';
import {
  changeOfferFavoriteStatus
} from '../../store/favorite-offers/favorite-offers-api-actions.ts';

const IMAGE_COUNT: number = 6;
const MAX_REVIEW_COUNT: number = 10;

function OfferScreen (): ReactElement {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentOffer = useAppSelector<OfferDetails | null>(getOffer);
  const currentOfferReviews = useAppSelector<Review[] | []>(getOfferReviews);
  const nearbyOffers = useAppSelector<Offer[]>(getNearbyOffers).slice(0, 3);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);

  const sortedOfferReviews = [...currentOfferReviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEW_COUNT);

  const mapPoints = useMemo<MapPoint[]>(() => [
    ...nearbyOffers.map((offer) => ({
      title: offer.title,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
    })),
    ...(currentOffer?.city?.location
      ? [{
        title: currentOffer.title,
        latitude: currentOffer.city.location.latitude,
        longitude: currentOffer.city.location.longitude,
      }]
      : []),
  ], [nearbyOffers, currentOffer]);

  const currentOfferPoint = useMemo<MapPoint | null>(() => {
    if (!currentOffer?.city?.location) {
      return null;
    }

    return {
      title: currentOffer.title,
      latitude: currentOffer.city.location.latitude,
      longitude: currentOffer.city.location.longitude,
    };
  }, [currentOffer]);

  const selectedPoint = hoveredPoint ?? currentOfferPoint;

  useEffect(() => {
    if (!offerId) {
      return;
    }

    setHoveredPoint(null); // сброс наведения при переходе на новый оффер

    const loadData = async () => {
      try {
        await dispatch(fetchOfferById(offerId)).unwrap();

        await Promise.all([
          dispatch(fetchOfferReviews(offerId)),
          dispatch(fetchNearbyOffers(offerId))
        ]);

      } catch (e) {
        navigate(AppRoute.NotFound);
      } finally {
        setIsLoading(false);
      }
    };

    loadData().then();
  }, [
    offerId,
    navigate,
    dispatch
  ]);

  if (!offerId) {
    navigate(AppRoute.NotFound);
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleFavoriteButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    const btn = evt.currentTarget;

    if (!currentOffer) {
      return;
    }

    btn.disabled = true;

    dispatch(changeOfferFavoriteStatus({
      offerId: currentOffer.id,
      status: !currentOffer?.isFavorite
    })).finally(() => {
      btn.disabled = false;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePlaceCardHover = (offerId: string | null) => {
    const hoveredOffer = nearbyOffers.find((offer) => offer.id === offerId);

    setHoveredPoint(
      hoveredOffer
        ? {
          title: hoveredOffer.title,
          latitude: hoveredOffer.location.latitude,
          longitude: hoveredOffer.location.longitude,
        }
        : null
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                currentOffer?.images.slice(0, IMAGE_COUNT).map((imgSrc) => (
                  <div
                    key={imgSrc}
                    className="offer__image-wrapper"
                  >
                    <img
                      className="offer__image"
                      src={imgSrc}
                      alt="Photo"
                    />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                currentOffer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <button
                  className={
                    classNames(
                      'offer__bookmark-button',
                      'button',
                      currentOffer?.isFavorite && 'offer__bookmark-button--active'
                    )
                  }
                  type="button"
                  onClick={handleFavoriteButtonClick}
                >
                  <svg
                    className="offer__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: getRatingPercent(currentOffer?.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                {
                  currentOffer?.type && (
                    <li className="offer__feature offer__feature--entire">
                      {capitalizeFirstLetter(currentOffer?.type || '')}
                    </li>
                  )
                }
                {
                  currentOffer?.bedrooms && (
                    <li className="offer__feature offer__feature--bedrooms">
                      {currentOffer?.bedrooms} Bedrooms
                    </li>
                  )
                }
                {
                  currentOffer?.maxAdults && (
                    <li className="offer__feature offer__feature--adults">
                      Max {currentOffer?.maxAdults} adults
                    </li>
                  )
                }
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    currentOffer?.goods.map((item) => (
                      <li
                        key={item}
                        className="offer__inside-item"
                      >
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer?.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer?.host.name}</span>
                  {
                    currentOffer?.host.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )
                  }
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                  <p className="offer__text">
                    {currentOffer?.title}
                  </p>
                </div>
              </div>

              {
                currentOffer
                && currentOfferReviews
                && (
                  <ReviewList
                    offer={currentOffer}
                    reviews={sortedOfferReviews}
                  />
                )
              }
            </div>
          </div>
          {
            nearbyOffers
            && currentOffer?.city
            && selectedPoint
            && (
              <Map
                city={currentOffer?.city}
                points={mapPoints}
                className={'offer__map'}
                selectedPoint={selectedPoint}
              />
            )
          }
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlaceList
              type={'near-places'}
              offers={nearbyOffers}
              onPlaceCardHover={handlePlaceCardHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
