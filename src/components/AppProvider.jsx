import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext({
  heroes: [],
  setHeroes: () => {},
  favHeroes: [],
  setFavHeroes: () => {},
  selectedHero: {},
  setSelectedHero: () => {},

});

export const AppProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [favHeroes, setFavHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState({});

  useEffect(() => {
    async function fetchHeroes() {
      const serverData = [];
      // eslint-disable-next-line
      for (let i = 1; i <= 9; i++) {
        try {
        // eslint-disable-next-line
         const serverResponce = await fetch(
            `https://swapi.dev/api/people/?page=${i}`,
          );
          // eslint-disable-next-line
          const data = await serverResponce.json();
          // eslint-disable-next-line
          const results = await data.results;

          serverData.push(results);
        } catch (error) {
          // eslint-disable-next-line
          console.error('Error in ASYNC/AWAIT: ', error);
        }
      }

      const allHeroes = serverData.reduce(
        (acc, item) => ([...acc, ...item]), [],
      );

      setHeroes(allHeroes);
      localStorage.setItem('Heroes', JSON.stringify(allHeroes));
    }

    localStorage.setItem('Heroes', JSON.stringify(null));
    const localStorageHeroes = JSON.parse(localStorage.getItem('Heroes'));

    if (!localStorageHeroes) {
      fetchHeroes();
    } else {
      setHeroes(localStorageHeroes);
    }

    const localStorageFavHeroes = JSON.parse(
      localStorage.getItem('Favoriteheroes'),
    );

    if (localStorageFavHeroes !== null) {
      setFavHeroes(localStorageFavHeroes);
    }
  }
  , []);

  const contextValue = {
    heroes,
    setHeroes,
    favHeroes,
    setFavHeroes,
    selectedHero,
    setSelectedHero,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
