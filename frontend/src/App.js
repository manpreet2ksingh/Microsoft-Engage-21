import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';

const App = () => (
  <BrowserRouter>
    <Switch>
        <Route path='/' component={LandingPage} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
    </Switch>
  </BrowserRouter>
)

export default App;
