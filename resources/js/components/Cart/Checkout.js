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



const PUBLIC_KEY = "pk_test_jsy4tWY65SkgwjP0YVflB9xI"
const stripePromise = loadStripe(PUBLIC_KEY);
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

export default function Checkout() {

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: process.env.REACT_APP_STRIPE_SK_KEY,
    //   };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [itemsInCart, setItemsInCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [localStorageLength, setLocalStorageLength] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [price, setPrice] = useState(0);


    var localLength = localStorage.length

    useEffect(() => {
      var myPrice = 0;
      var array= [];
      for (var i = 0 ; i < localStorage.length ; i ++) {
        var key = localStorage.key(i);
        var value = JSON.parse(localStorage[key]);
        array.push(value);
        myPrice += (value.price*value.quantity);
      }
      setPrice(myPrice);
      setLocalStorageLength(array.length);
      setItemsInCart(array);
      setIsLoaded(true);    
    }, [localLength])  

    
    
      return (
        <div className="mt-15">
          <Elements stripe={stripePromise}>
            <Grid container justifyContent="center">             
              <Grid container spacing={5} item xs={12} sm={12} md={11} lg={10}> 
                  
                  
                  
                  <Grid spacing={2} container item xs={12} md={8}>
                    <Grid item xs={12} >
                      <h2 className=" centerText ">Billing details</h2>
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        variant="outlined"
                        fullWidth                                           
                        label="Firstname"
                      />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        variant="outlined"
                        fullWidth
                        label="Lastname"
                      />
                    </Grid> 
                    <Grid item xs={12} >
                      <TextField 
                        variant="outlined"
                        fullWidth
                        label="Email"
                      />
                    </Grid> 
                    <Grid item xs={5} >
                      <TextField 
                        variant="outlined"
                        fullWidth
                        label="Address"
                      />
                    </Grid> 
                    <Grid item xs={4} >
                      <TextField 
                        variant="outlined"
                        fullWidth
                        label="City"
                      />
                    </Grid> 
                    <Grid item xs={3} >
                      <TextField 
                        variant="outlined"
                        fullWidth
                        label="Zip code"
                      />
                    </Grid> 
                    <Grid item xs={12} >
                      <PaymentForm />
                    </Grid> 
                  </Grid>
                  <Grid  container item xs={12} md={4}>           
                    <Grid  item xs={12} >
                      <h2 className=" centerText ">Your order</h2>
                      
                      <div className="yourOrder lightShadowCard">
                        <div className="mt-4 flexBetween">
                          <span className="ml-2 mt-2">Product</span>
                          <span className="mr-2 mt-2">Subtotal</span>
                        </div>
                      
                        {itemsInCart.map(product => (
                          <div
                            className="productLineCart mt-5 p-2"
                            key={product.id}
                          >                          
                            <div>{product.name} x {product.quantity}</div>
                            <div>${product.price*product.quantity}.00</div>
                          </div>
                        ))}
                        
                      </div>

                      <div className="yourOrder shippingFees lightShadowCard flexBetween">
                          <span className="ml-2 mt-2">Shipping fees</span>
                          <span className="mr-2 mt-2">$13.00</span>
                      </div>
                      
                      <div className="mt-5">
                        <Button 
                          fullWidth 
                          variant="contained"
                          margin="normal"
                        >
                          {isProcessing ? "Processing..." : `Pay $${price}.00`}
                          
                        </Button>
                      </div>
                      
                    </Grid> 

                  </Grid>
                  
              </Grid>
            </Grid>
          
            
          </Elements>
        </div>
      );
}


