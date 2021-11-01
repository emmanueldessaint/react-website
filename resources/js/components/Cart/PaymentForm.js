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
import axios from 'axios';

// const CardElementContainer = styled.div`
//  height: 40px;
//  display: flex;
//  align-items: center;
 
 
//  `;

export default function PaymentForm() {
    
    // const { data: clientSecret } = await axios.post('http://localhost:8000/api/charge', {
    //     amount: price * 100
    // })


    const cardElementOptions = {
        style: {
            base: {
                fontSize: '18px',
                color: 'black'
            },
            invalid: {

            }
        },
        hidePostalCode: true,
    };

    return(
        <div>
            <div className=" ">
                <CardElement className="testCard" options={cardElementOptions}/>
            </div>
            
        </div>
    )
}
