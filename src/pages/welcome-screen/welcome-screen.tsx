import { ReactElement } from 'react';
import { AuthorizationStatus, PlaceType } from '../../constants.ts';
import Header from '../../components/header/header.tsx';
import PlaceCard from '../../components/place-card/place-card.tsx';

interface WelcomeScreenProps {
  totalCountPlaces: number;
  userAuthStatus: AuthorizationStatus;
}

function WelcomeScreen (props: WelcomeScreenProps): ReactElement {
  return (
    <div className="page page--gray page--main">
      <Header userAuthStatus={props.userAuthStatus}/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{props.totalCountPlaces} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlaceCard
                  imageSrc="img/apartment-01.jpg"
                  mark="Premium"
                  name="Beautiful & luxurious apartment at great location"
                  price={120}
                  type={PlaceType.Apartment}
                  rating={4}
                />

                <PlaceCard
                  imageSrc="img/room.jpg"
                  name="Wood and stone place"
                  price={80}
                  type={PlaceType.Room}
                  inBookmarks
                  rating={4}
                />

                <PlaceCard
                  imageSrc="img/apartment-02.jpg"
                  name="Canal View Prinsengracht"
                  price={132}
                  type={PlaceType.Apartment}
                  rating={4}
                />

                <PlaceCard
                  imageSrc="img/apartment-03.jpg"
                  mark="Premium"
                  name="Nice, cozy, warm big bed apartment"
                  price={180}
                  type={PlaceType.Apartment}
                  rating={5}
                />

                <PlaceCard
                  imageSrc="img/room.jpg"
                  name="Wood and stone place"
                  price={80}
                  type={PlaceType.Room}
                  rating={4}
                  inBookmarks
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
