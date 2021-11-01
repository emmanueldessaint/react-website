import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './Cart/Cart'
import Checkout from './Cart/Checkout'
import Connect from '../components/Connect/Connect'
import Signup from '../components/Connect/Signup'
import Products from '../components/Products/Products'
import Product from '../components/Products/Product'
import Home from '../components/Home/Home'
import '../App.css'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

function Index() {
    return (
        
            <RecoilRoot>     
                <Router>
                    <div className="generalFont">
                        <Header />
                        <div className="testDiv">
                            <Switch>
                                <Route path="/connect">
                                    <Connect />
                                </Route>                           
                            </Switch>
                            <Switch>
                                <Route path="/signup">
                                    <Signup />
                                </Route>                           
                            </Switch>
                            <Switch>
                                <Route path="/cart">
                                    <Cart />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path="/products">
                                    <Products />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path="/product">
                                    <Product />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path="/checkout">
                                    <Checkout />
                                </Route>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </RecoilRoot>
        
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
