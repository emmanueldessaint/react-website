import React from 'react';
import ReactDOM from 'react-dom';
import Cart from './Cart/Cart'
import Checkout from './Cart/Checkout'
import Connect from '../components/Connect/Connect'
import Signup from '../components/Connect/Signup'
import Products from '../components/Products/Products'
import Product from '../components/Products/Product'
import AboutUs from '../components/Others/AboutUs'
import Home from '../components/Home/Home'
import '../App.css'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import Request from '../components/Shared/Request'
import ReactGA from 'react-ga'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

function Index() {
    
    ReactGA.initialize('UA-213345073-1')
    ReactGA.pageview(window.location.pathname + window.location.search)

    return (
        
            <RecoilRoot>     
                <Router>
                    <div className="generalFont">
                        <Request />
                        <Header />
                        <div className="generalBackground">
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
                                <Route path="/catalog">
                                    <Products />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path='/product/:name' >
                                    <Product />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path="/checkout">
                                    <Checkout />
                                </Route>
                            </Switch>
                            <Switch>
                                <Route path="/aboutus">
                                    <AboutUs />
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
