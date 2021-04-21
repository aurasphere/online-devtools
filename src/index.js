import React from 'react';
import ReactDOM from 'react-dom';
import JweDecrypterPage from './pages/jwe-decrypter';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/jwe-decrypter">
          <JweDecrypterPage />
        </Route>
        <Route path="/">
          <JweDecrypterPage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
);