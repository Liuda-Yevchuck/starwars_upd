import React, {useContext} from 'react';
import { AppContext } from '../AppProvider';
import { Switch, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Films } from '../Films/Films';
import { Species } from '../Species/Species';


export const SelectedHero = () => {

  const { selectedHero } = useContext(AppContext);

  if (selectedHero===undefined) {
    return (
      <h1>Loading</h1>
    )
  }
  const getId = (url) => {
    if (url) {
      const result = url.split('/');

      return result[result.length - 2];
    }

    return 0;
  };

  const selectedHeroId = getId(selectedHero.url);

  return (
    <div className="info">
      <div className="info__section box">
        <img
          className="info__image"
      // eslint-disable-next-line
        src={`https://starwars-visualguide.com/assets/img/characters/${selectedHeroId}.jpg`}
          alt={selectedHero.name}
        />
        <h1 className="info__title">{selectedHero.name}</h1>
        <div className="info__item">{`Height:  ${selectedHero.height}`}</div>
        <div className="info__item">{`Mass:  ${selectedHero.mass}`}</div>
        <div className="info__item">{`Hair color:  ${selectedHero.hair_color}`}</div>
        <div className="info__item">{`Skin color:  ${selectedHero.skin_color}`}</div>
        <div className="info__item">{`Eye color:  ${selectedHero.eye_color}`}</div>
        <div className="info__item">{`Birth year:  ${selectedHero.birth_year}`}</div>
        <div className="info__item">{`Cender:  ${selectedHero.gender}`}</div>
      </div>
      <div className="info__section">
        <div className="info__tabs">
          <Link
            to="/home/info/"
            className="info__tab"
          >
            Films
          </Link>
          <Link
            to="/home/info/planet"
            className="info__tab"
          >
            Planet
          </Link>
        </div>
        <div>
          <Switch>
            <Route path="/home/info/planet">
              <div className="info__details">
                <Species planetUrl={selectedHero.homeworld} />
              </div>
            </Route>
            <Route path="/home/info/" exact>
              <div className="info__details">
                <Films urls={selectedHero.films} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

SelectedHero.propTypes = {
  SelectedHero: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    mass: PropTypes.string.isRequired,
    hair_color: PropTypes.string.isRequired,
    skin_color: PropTypes.string.isRequired,
    eye_color: PropTypes.string.isRequired,
    birth_year: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    films: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ),
    homeworld: PropTypes.shape().isRequired,
  }),
};
