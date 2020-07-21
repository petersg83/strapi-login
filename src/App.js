import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import LoginSuccess from './pages/LoginSuccess';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/connect/:providerName/success" component={LoginSuccess} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  );
}

export default App;
