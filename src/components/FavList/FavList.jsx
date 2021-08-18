import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppProvider';

export const FavList = () => {
  const { favHeroes, setSelectedHero, setFavHeroes } = useContext(AppContext);

  if (favHeroes.length === 0) {
    return (
      <div className="list">
        <h2 className="list__item">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <main className="main">
        <ul className="list">
          {favHeroes.map(hero => (
            <li key={hero.url} className="list__item">
              <Link
                className="list__link"
                key={hero.name}
                to="/home/info"
                onClick={() => setSelectedHero(hero)}
              >
                {hero.name}
              </Link>
              {favHeroes.find(favHero => favHero.name === hero.name) ? (
                <button
                  className=" button list__button"
                  type="button"
                  onClick={() => {
                    localStorage.setItem('Favoriteheroes', JSON.stringify(favHeroes));
                    setFavHeroes(currentFavs => currentFavs.filter(
                      favHero => favHero.name !== hero.name,
                    ));
                  }
                }
                >
                  remove fav
                </button>
              ) : (
                <button
                  className=" button list__button"
                  type="button"
                  onClick={() => {
                    localStorage.setItem('Favoriteheroes', JSON.stringify(favHeroes));
                    setFavHeroes(
                      currentFavs => [...currentFavs, hero],
                    );
                  }
                }
                >
                  add fav
                </button>
              )}
            </li>
          ))}
        </ul>
      </main>
      <div className="app__sidebar">
        <h1 className="app__sidebar-title">
          May the force be with you
        </h1>
      </div>
    </>
  );
};
