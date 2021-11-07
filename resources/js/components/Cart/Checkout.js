import { useState, useEffect  } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import '../../css/Cart.css';
import { numberOfItemsInCart } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



const PUBLIC_KEY = "pk_test_jsy4tWY65SkgwjP0YVflB9xI"
const stripePromise = loadStripe(PUBLIC_KEY);
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

export default function Checkout() {

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: process.env.REACT_APP_STRIPE_SK_KEY,
    //   };

   
    
      return (
        <div className="mt-15">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          
            
          </Elements>
        </div>
      );
}


