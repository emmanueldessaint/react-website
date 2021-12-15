import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../css/Cart.css';
import { shippingFees } from '../Shared/globalState'
import { useRecoilValue } from 'recoil';
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from "react-helmet";

const CustomButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#32477a',
    borderRadius: 3,
    opacity: 0.9,
    height: '45px',
    width: '100%',
    border: '1px solid black',
    letterSpacing: 1,
    wordSpacing: 3,
    '&:hover': {
      opacity: 1,
      backgroundColor: '#32477a',
      color: 'white',
      border: '1px solid black',
    },
  },
}))(Button);

const ButtonBillingDetails = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#32477a',
    borderRadius: 3,
    opacity: 0.9,
    width: '100%',
    border: '1px solid black',
    letterSpacing: 1,
    wordSpacing: 3,
    '&:hover': {
      opacity: 1,
      backgroundColor: '#32477a',
      color: 'white',
      border: '1px solid black',
    },
  },
}))(Button);

export default function PaymentForm() {
  const [firstName, setFirstName] = useState('');
  const [errorInFirstName, setErrorInFirstName] = useState(false);
  const [lastName, setLastName] = useState('');
  const [errorInLastName, setErrorInLastName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorInEmail, setErrorInEmail] = useState(false);
  const [address, setAddress] = useState('');
  const [errorInAddress, setErrorInAddress] = useState(false);
  const [city, setCity] = useState('');
  const [errorInCity, setErrorInCity] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [errorInZipCode, setErrorInZipCode] = useState(false);
  const [country, setCountry] = useState('');
  const [errorInCountry, setErrorInCountry] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [price, setPrice] = useState(0);
  const shippingFeesVar = useRecoilValue(shippingFees);
  const [billingsDetails, setBillingsDetails] = useState(false);
  const [cardInformation, setCardInformation] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  useEffect(() => {
    var myPrice = 0;
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));
    if (ourCart !== null) {
      for (var i = 0; i < ourCart.length; i++) {
        myPrice += (ourCart[i].quantity * ourCart[i].price);
      }
      setItemsInCart(ourCart);
      setPrice(myPrice);
      // setLocalStorageLength(ourCart.length);
    }
    setIsLoaded(true);
    window.scroll(0, 0);
  }, [])

  // Stripe payment code 
  const handleServerResponse = (response) => {
    if (response.data.error) {
      // gérer l'erreur
    }

    else if (response.data.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.data.payment_intent_client_secret
      ).then((result) => {
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
        const response = await axios.post("https://parisfabrics.com/api/charge", {
          amount: price * 100,
          id,
          paymentIntentId: paymentIntentId,
          firstName: firstName,
          lastName: lastName,
          city: city,
          zipCode: zipCode,
          email: email,
          address: address,
          additionalInformation: additionalInformation,
          country: country,
          //   phoneNumber: phoneNumber,
          cart: itemsInCart,
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

    theme: 'stripe',

    style: {
      base: {
        fontSize: '10px',
        color: 'black'
      },
      invalid: {

      }
    },
    hidePostalCode: true,
  }


  // Paypal payment code 
  const createOrder = async (data, actions) => {
    return await axios.post("https://parisfabrics.com/api/createOrder", {
      amount: price * 100,
      firstName: firstName,
      lastName: lastName,
      city: city,
      zipCode: zipCode,
      email: email,
      address: address,
      additionalInformation: additionalInformation,
      country: country,
      // phoneNumber: phoneNumber,
      cart: itemsInCart,
    })
      .then((res) => {
        return res
      })
      .then((data) => {
        return data.data.result.id
      })
    //.catch(console.log(response))
  }

  const onApprove = async (data, actions) => {
    return await axios.post("https://parisfabrics.com/api/captureOrder", {
      orderID: data.orderID
    })
      .then((res) => {
        return res
      })
      .then((details) => {
        // gérer le succés, renvoyé sur page réussie
      })
  }

  const GoToPayment = () => {
    // let res = /^[a-zA-Z]+$/.test('sfjd');
    var error = false
    if (firstName.length < 1) {
      setErrorInFirstName(true);
      error = true;
    } else {
      setErrorInFirstName(false);
    }
    if (lastName.length < 1) {
      setErrorInLastName(true);
      error = true;
    } else {
      setErrorInLastName(false);
    }
    if (email.length < 4) {
      setErrorInEmail(true);
      error = true;
    } else {
      setErrorInEmail(false);
    }
    if (country.length < 3) {
      setErrorInCountry(true);
      error = true;
    } else {
      setErrorInCountry(false);
    }
    if (address.length < 4) {
      setErrorInAddress(true);
      error = true;
    } else {
      setErrorInAddress(false);
    }
    if (city.length < 1) {
      setErrorInCity(true);
      error = true;
    } else {
      setErrorInCity(false);
    }
    if (zipCode.length < 1) {
      setErrorInZipCode(true);
      error = true;
    } else {
      setErrorInZipCode(false);
    }
    if (error === true) {
      return;
    }
    setBillingsDetails(false);
    setCardInformation(true);
  }

  return (
    <Container>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout - Paris Fabrics</title>
            </Helmet>
      <Grid container justifyContent="center">
        <Grid container spacing={5} item xs={12} sm={12} md={12} lg={12}>
          {billingsDetails === false && cardInformation === false &&
            <Grid item xs={12} md={8} >
              <Grid item xs={12} className="height70">
                <h2 className="centerText mb-12 grey6">Choose your payment method</h2>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={5} container className="heightPaypalCreditCardDiv">
                  <div className="paypalButton" style={{ width: '100%' }}>
                    <PayPalScriptProvider>
                      <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                      />
                    </PayPalScriptProvider>
                  </div>
                </Grid>
                <Grid item xs={false} sm={2}>
                  <div className="greyLinePayment"></div>
                </Grid>
                <Grid item xs={12} sm={5} container className="verticalAlign">
                  <CustomButton variant="contained" onClick={() => setBillingsDetails(true)}>Pay width card</CustomButton>
                </Grid>
              </Grid>
            </Grid>
          }

          {billingsDetails === true &&
            <Grid item xs={12} md={8}>
              <Grid spacing={2} container>
                <Grid item xs={12} >
                  <h2 className=" centerText grey6">Billing details</h2>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Firstname"
                    error={errorInFirstName}
                    helperText={errorInFirstName ? "You must enter a firstname !" : ""}
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Lastname"
                    error={errorInLastName}
                    helperText={errorInLastName ? "You must enter a lastname !" : ""}
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email"
                    error={errorInEmail}
                    helperText={errorInEmail ? "You must enter an email !" : ""}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Country"
                    error={errorInCountry}
                    helperText={errorInCountry ? "You must enter a country !" : ""}
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="City"
                    error={errorInCity}
                    helperText={errorInCity ? "You must enter a city !" : ""}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Zip code"
                    error={errorInZipCode}
                    helperText={errorInZipCode ? "You must enter a zip Code !" : ""}
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Address"
                    error={errorInAddress}
                    helperText={errorInAddress ? "You must enter a valid address !" : ""}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Additional information"
                    value={additionalInformation}
                    onChange={e => setAdditionalInformation(e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <div className="">
                    {/* <CardElement options={cardElementOptions} /> */}

                  </div>
                </Grid>
                <Grid xs={12} item>
                  <ButtonBillingDetails variant='contained' onClick={GoToPayment}>Go to payment</ButtonBillingDetails>
                </Grid>
              </Grid>
            </Grid>
          }

          {cardInformation === true &&
            <Grid item xs={12} md={8}>
              <Grid spacing={2} container>
                <Grid item xs={12} >
                  <h2 className=" centerText grey6">Billing details</h2>
                </Grid>
                <div className="numbersCard"><CardNumberElement /></div>
                <CardExpiryElement />
                <CardCvcElement />
                <Grid item xs={12} >
                  <ButtonBillingDetails fullWidth variant='contained' onClick={GoToPayment}>Go to payment</ButtonBillingDetails>
                </Grid>
              </Grid>
            </Grid>




          }
          <Grid container item xs={12} md={4}>
            <Grid item xs={12} >
              <div className="bgWhite borderRadius20 lightShadowCard2 font1 bold200 size1 mt-10">
                <div className="flexCenter bgBlue font12 grey7 ProductSubtotal pb-1">
                  <div className="ml-2 mt-2 bold400 size2 letterSpacing1 height30">Your recap</div>
                </div>
                {itemsInCart.map(product => (
                  <div
                    className="flex flexBetween mt-4 pl-2 pr-2 "
                    key={product.id}
                  >
                    <div className="font2 grey8">{product.name} <span className="bold500">x</span> {product.quantity}</div>
                    <div className="font3">${(Number(product.price / 100) * Number(product.quantity)).toFixed(2)}</div>
                  </div>
                ))}
                <div className="flexBetween pt-2 mt-2 pb-2 pl-2 pr-2 bgBlue ">
                  <div className="font2 grey8">Subtotal</div>
                  <span className="greyLineCart"></span>
                  <div className="font3">${(price / 100).toFixed(2)}</div>
                </div>
                <div className="flexBetween mt-2 pl-2 pr-2">
                  <div className="font2 grey8">Shipping fees</div>
                  <div className="alignRight font3">${(shippingFeesVar * 1).toFixed(2)}</div>
                </div>
                <div className="flexBetween totalAndShipping pb-1 mt-2 pt-2 pl-2 pr-2 bgBlue">
                  <div className="totalPlusShipping font2 grey8">Total</div>
                  <span className="greyLineCart"></span>
                  <div className="font3">${(Number(price / 100) + Number(shippingFeesVar)).toFixed(2)}</div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
