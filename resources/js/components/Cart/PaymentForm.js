import { useState, useEffect } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
import '../../css/Cart.css';
import { numberOfItemsInCart, shippingFees } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


export default function PaymentForm() {
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
  const [shippingFeesVar, setShippingFeesVar] = useRecoilState(shippingFees);

  const stripe = useStripe();
  const elements = useElements();


  var localLength = localStorage.length

  useEffect(() => {
    var myPrice = 0;
    var array = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = JSON.parse(localStorage[key]);
      array.push(value);
      myPrice += (value.price * value.quantity);
    }
    setPrice(myPrice);
    setLocalStorageLength(array.length);
    setItemsInCart(array);
    setIsLoaded(true);
  }, [localLength])



  const payment = () => {
    axios.post('http://localhost:8000/api/charge', {
      amount: price * 100,
      firstName: firstName,
      lastName: lastName,
      city: city,
      zipCode: zipCode,
      email: email,
      address: address,
    })
  }
  // méthode de stripe officielle
  // const handlePaymentSubmit = async () => {
  //     const cardElement = elements.getElement("card");

  //     try {
  //         const { data: clientSecret } = await axios.post("http://localhost:8000/api/charge", {
  //             amount: price * 100
  //           });

  //         const paymentMethodReq = await stripe.createPaymentMethod({
  //             type: "card",
  //             card: cardElement,
  //             billing_details: 'billingDetails'
  //         });

  //         if (paymentMethodReq.error) {
  //           // setCheckoutError(paymentMethodReq.error.message);
  //           // setProcessingTo(false);
  //           return;
  //         }

  //         const { error } = await stripe.confirmCardPayment(clientSecret, {
  //           payment_method: paymentMethodReq.paymentMethod.id
  //         });

  //         if (error) {
  //           setCheckoutError(error.message);
  //           setProcessingTo(false);
  //           return;
  //         }

  //         onSuccessfulCheckout();
  //     } catch (err) {
  //         setCheckoutError(err.message);
  //       }
  // }

    const handleServerResponse = (response) => {
        if (response.data.error) {
            // gérer l'erreur
        } 

        else if (response.data.requires_action) {
            // Use Stripe.js to handle required card action
            stripe.handleCardAction(
                response.data.payment_intent_client_secret
            ).then(function(result) {
                if (result.error) {
                    // gérer l'erreur
                } else {
                    handlePaymentSubmit(result.paymentIntent.id)
                }
            });
        }

        else if (response.data.success) {
            console.log("Successful payment")
            // gérer le succés, renvoyé sur page réussie
            //   setSuccess(true)
        }
        else {
            console.log(response)
            // gérer erreur
        }
    }

  const handlePaymentSubmit = async (paymentIntentId) => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (typeof paymentIntentId == 'string') {
        var paymentIntentId = paymentIntentId
     } else {
        var paymentIntentId = 0
    }

    if (!error) {
        try {   
        const { id } = paymentMethod
        const response = await axios.post("http://localhost:8000/api/charge", {
          amount: price * 100,
          id,
          paymentIntentId: paymentIntentId,
          firstName: firstName,
          lastName: lastName,
          city: city,
          zipCode: zipCode,
          email: email,
          address: address,
        })

        handleServerResponse(response)

      } catch (error) {
        console.log("Error", error)
        // gérer l'erreur
      }
    } else {
      console.log(error.message)
      // gérer l'erreur
    }
  }

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


  return (
    <div>
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
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Lastname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={5} >
              <TextField
                variant="outlined"
                fullWidth
                label="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} >
              <TextField
                variant="outlined"
                fullWidth
                label="City"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField
                variant="outlined"
                fullWidth
                label="Zip code"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <div className="">
                <CardElement className="testCard" options={cardElementOptions} />
              </div>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Grid item xs={12} >
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
                    <div>${product.price * product.quantity}.00</div>
                  </div>
                ))}

              </div>

              <div className="yourOrder shippingFees lightShadowCard flexBetween">
                <span className="ml-2 mt-2">Shipping fees</span>
                <span className="mr-2 mt-2">${shippingFeesVar}.00</span>
              </div>

              <div className="mt-5">
                <Button
                  fullWidth
                  variant="contained"
                  margin="normal"
                  onClick={handlePaymentSubmit}
                >
                  {isProcessing ? "Processing..." : `Pay $${price}.00`}

                </Button>
              </div>

            </Grid>

          </Grid>

        </Grid>
      </Grid>

    </div>
  )
}
