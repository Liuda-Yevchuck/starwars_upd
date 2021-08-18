import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Films = ({ urls }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilms(filmUrls) {
      const serverData = [];

      try {
        if (filmUrls !== undefined) {
        // eslint-disable-next-line
        for (const url of filmUrls) {
          // eslint-disable-next-line
          const serverResponce = await fetch(
              url,
            );
            // eslint-disable-next-line
          const data = await serverResponce.json();
            // eslint-disable-next-line
          serverData.push(data);
          }
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }

      setFilms(serverData);
      setLoading(false);
    }

    fetchFilms(urls);
  }, [urls]);

  if (isLoading) {
    return (
      <h1>Loading....</h1>
    );
  }

  return (
    <div className="info__section">
      {films.map(film => (
        <div className="info__wrap">
          <div
            className="info__title"
            key={film.title}
          >
            <h1>
              &quot;
              {film.title}
              &quot;
            </h1>
          </div>
          <div className="info__item">
            {`Release date: ${film.release_date}`}
          </div>
        </div>
      ))}
    </div>
  );
};

Films.propTypes = {
  urls: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
