import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HashPage, { path as hashPath } from "./pages/hash-page";
import HmacPage, { path as hmacPath } from "./pages/hmac-page";
import CipherPage, { path as cipherPath } from "./pages/cipher-page";
import JwePage, { path as jwePath } from "./pages/jwe-page";
import UrlPage, { path as urlPath } from "./pages/url-page";
import Base64Page, { path as base64Path } from "./pages/base64-page";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={base64Path}>
          <Base64Page />
        </Route>
        <Route path={urlPath}>
          <UrlPage />
        </Route>
        <Route path={hashPath}>
          <HashPage />
        </Route>
        <Route path={hmacPath}>
          <HmacPage />
        </Route>
        <Route path={cipherPath}>
          <CipherPage />
        </Route>
        <Route path={jwePath}>
          <JwePage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
