import React from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'

function App() {
  

  
  return (
    <Router>
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </Switch>
      
  </Router>
  );
}

export default App;
