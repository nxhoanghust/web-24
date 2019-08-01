import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import CreateGameScreen from './pages/CreateGameScreen';
import GameDetailScreen from './pages/GameDetailScreen';

function App() {
  // '/' Create Game
  // '/games/' Game Detail
  return (
    <BrowserRouter>
      <Route path='/' exact={true} component={CreateGameScreen}  />
      <Route path='/games/:gameId' component={GameDetailScreen}  />
    </BrowserRouter>
  );
}

export default App;
