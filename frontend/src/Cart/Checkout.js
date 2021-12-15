import * as React from 'react';
import '../css/Cart.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = "pk_test_jsy4tWY65SkgwjP0YVflB9xI"
const stripePromise = loadStripe(PUBLIC_KEY);
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_KEY);

export default function Checkout() {

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: process.env.REACT_APP_STRIPE_SK_KEY,
    //   };

    // Pass the appearance object to the Elements instance
    // const elements = stripe.elements({ appearance});

    return (
        <div className="pt-13">
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
}
