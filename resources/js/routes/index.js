import React from 'react';
import ReactDOM from 'react-dom';
import Connect from '../components/Connect/Connect'
import Cart from '../components/Cart/Cart'
// import { Home } from '../components/Home';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../layout/Header';

export default function Routes() {

//     var Router = require("react-router").Router;
// var Route = require("react-router").Route;
// var Switch = require("react-router").Switch;

    return(
        <div>      
            <Router>
                <div>
                    <Header />
                    <div>
                        <Switch>
                            <Route path="/connect">
                                <Connect />
                            </Route>                           
                            {/* <Route exact path="/home" component={Home} /> */}
                        </Switch>
                        <Switch>
                            <Route path="/cart">
                                <Cart />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    )
}