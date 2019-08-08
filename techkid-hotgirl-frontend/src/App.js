import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import registerPage from './pages/registerPage';
import signInPage from './pages/signInPage';
import homePage from './pages/homePage';
import homePageTest from './pages/homePageTest';


function App() {
  return (
    <BrowserRouter>
      <Route path='/register' exact={true} component={registerPage}/>
      <Route path='/signIn' exact={true} component={signInPage}/>
      <Route path='/' exact={true} component={homePageTest}/>    
      <Route path='/profile' exact={true} component={homePageTest}/>        
    </BrowserRouter>
  );
}

export default App;
