import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Species = ({ planetUrl }) => {
  const [planet, setPlanet] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanet(url) {
      try {
        if (url !== undefined) {
          const serverResponce = await fetch(
            url,
          );
          const data = await serverResponce.json();

          setPlanet(data);
          setLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    }

    fetchPlanet(planetUrl);
  }, [planetUrl]);

  if (loading) {
    return (
      <h1> Loading ....</h1>
    );
  }

  return (
    <div className="info__section">
      <div className="info__wrap">
        <h1 className="info__title">
          {`Home world: ${planet.name}`}
        </h1>
        <div className="info__item">
          {`Population: ${planet.population}`}
        </div>
        <div className="info__item">
          {`Climate: ${planet.climate}`}
        </div>
      </div>
    </div>
  );
};

Species.propTypes = {
  planetUrl: PropTypes.string.isRequired,
};
