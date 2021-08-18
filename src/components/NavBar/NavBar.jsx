import React from 'react';
import {
  Link,
} from 'react-router-dom';

export function NavBar() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src='https://i.pinimg.com/236x/df/24/be/df24beb816bd241cd9e944e2b336996f.jpg'
        alt="starwars logo"
      />
      <nav className="nav">
        <Link to="/favorites" className="nav__link">
          Favorites
        </Link>
        <Link to="/" className="nav__link">
          Home
        </Link>

      </nav>
    </header>
  );
}
