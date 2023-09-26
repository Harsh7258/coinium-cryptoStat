import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import './App.css';
import { Navbar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News } from './components';

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/exhanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <CryptoCurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
          coininum.<br/>
          All rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/excahnges">Exchanges</Link>
          <Link to="cryptocurrenies">CryptoCurrencies</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
      </div>
    </div>
  );
};

export default App;
