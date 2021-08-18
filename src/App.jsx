import React from 'react';
import { AppProvider } from './components/AppProvider';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HeroList } from './components/HeroList/HeroList';
import { FavList } from './components/FavList/FavList';
import { SelectedHero } from './components/SelectedHero/SelectedHero';
import './App.scss';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  return (
    <AppProvider>
    <div className="app">
      <NavBar />
      <div className="app__content">
        <Switch>
          <Route path="/favorites">
            <FavList />
          </Route>
          <Route path="/home/info">
            <SelectedHero/>
          </Route>
          <Route path="/" exact>
            <HeroList />
          </Route>
          <Redirect to='/' />
        </Switch>
      </div>
    </div>
    </AppProvider>
  );
};

export default App;
