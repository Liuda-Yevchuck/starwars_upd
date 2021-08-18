import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppProvider';

export const HeroList = () => {
  const { heroes,
    favHeroes,
    setFavHeroes,
    setSelectedHero } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [searchedHeroes, setSearchedHeroes] = useState([]);

  useEffect(() => {
    setSearchedHeroes(heroes
      .filter((hero) => {
        if (!query) {
          return true;
        }

        if (
          hero.name.toLowerCase().includes(query.toLowerCase().trim())
        ) {
          return true;
        }

        return false;
      }));
  }, [heroes, query]);

  if (heroes.length === 0) {
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
          {(searchedHeroes.length) ? (
            searchedHeroes
            .map(hero => (
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
                      setFavHeroes(
                        currentFavs => currentFavs.filter(
                          favHero => favHero.name !== hero.name,
                        ),
                        localStorage.setItem('Favoriteheroes', JSON.stringify(favHeroes)),
                      );
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
                      setFavHeroes(
                        currentFavs => [...currentFavs, hero],
                      );
                      localStorage.setItem('Favoriteheroes', JSON.stringify(favHeroes));
                    }}
                  >
                    add fav
                  </button>
                )}
              </li>
              )))
            : (
              <div className="not-found">
                <h1 className="not-found__title"> Nothing is found</h1>
                <img
                  className="not-found__image"
                  src="https://i.pinimg.com/236x/5d/66/ec/5d66ec2b6592965f95407ff7bbaa39e5.jpg"
                  alt="baby yoda"
                />
              </div>
            )}
        </ul>
      </main>
      <div className="app__sidebar">
        <input
          className="input list__input"
          type="text"
          placeholder="hero name"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </div>
    </>
  );
};
