import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  return (
    <Router>
    <Switch>
      
      <Route path="/" component={Login} exact/>
      <Route path="/register" component={Register} />
    </Switch>
      
  </Router>
  );
}

export default App;
