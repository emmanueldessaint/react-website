import React from 'react';
import Cart from './Cart/Cart'
import Checkout from './Cart/Checkout'
import Connect from './Connect/Connect'
import Signup from './Connect/Signup'
import Products from './Products/Products'
import Product from './Products/Product'
import AboutUs from './Others/AboutUs'
import Home from './Home/Home'
import './App.css'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import Request from './Shared/Request'
import ReactGA from 'react-ga'
import PrivacyPolicy from './Others/PrivacyPolicy';
import RefundPolicy from './Others/RefundPolicy';
import Faq from './Others/Faq';
import TermsOfService from './Others/TermsOfService';
import ShippingPolicy from './Others/ShippingPolicy';
import Contact from './Others/Contact';
import ForgetPassword from './Connect/ForgetPassword'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {

  ReactGA.initialize('UA-213345073-1')
    ReactGA.pageview(window.location.pathname + window.location.search)

  return (
    <Router>
      <div className="generalFont">
        <Request />
        <Header />
        <div className="generalBackground">
          <Switch>
            <Route path="/connect">
              <Connect />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/forgotPassword">
              <ForgetPassword />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/catalog">
              <Products />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>

            <Route path="/aboutus">
              <AboutUs />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/refundpolicy">
              <RefundPolicy />
            </Route>

            <Route path="/shippingpolicy">
              <ShippingPolicy />
            </Route>

            <Route path="/faq">
              <Faq />
            </Route>

            <Route path="/termsofservice">
              <TermsOfService />
            </Route>

            <Route path="/privacypolicy">
              <PrivacyPolicy />
            </Route>
            <Route path='/:name' >
              <Product />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


