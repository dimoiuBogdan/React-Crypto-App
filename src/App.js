import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <Navbar />
      </nav>
      <main className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/details/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
      </main>
      <footer className="footer"></footer>
    </div>
  );
};

export default App;
