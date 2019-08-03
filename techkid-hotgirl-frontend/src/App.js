import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import registerPage from './pages/registerPage';
import signInPage from './pages/signInPage';
import homePage from './pages/homePage';

function App() {
  return (
    <BrowserRouter>
      <Route path='/register' exact={true} component={registerPage}/>
      <Route path='/signIn' exact={true} component={signInPage}/>
      <Route path='/' exact={true} component={homePage}/>      
    </BrowserRouter>
  );
}

export default App;
