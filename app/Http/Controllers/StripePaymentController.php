<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Omnipay\Omnipay;
use App\Models\Product;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Mail\OrderConfirmation;
use Stripe;
use Mail;

class StripePaymentController extends Controller
{
    function charge(Request $request) { 

        /////////////// EMAIL TEST /////////////////////////

        $order = [
            'id' => 123,
        ];

        // Mail::to('mathieu.dessaint10@gmail.com')->send(new OrderConfirmation($order));


        // return $order;

        /////////////// EMAIL TEST /////////////////////////

        Stripe\Stripe::setApiKey(env('STRIPE_SECRET_DEV'));

        $paymentMethodId = $request->get('id');
        $paymentIntentId = $request->get('paymentIntentId');
    
        $intent = null;

        $totalAmount = 2000;

        try {
            if (isset($paymentMethodId)) {
                # Create the PaymentIntent
                $intent = Stripe\PaymentIntent::create([
                    'payment_method' => $paymentMethodId,
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                    'amount'   => $totalAmount,
                    'currency' => 'eur',
                    'description' => "Mon paiement"
                ]);
            }
            if (isset($paymentIntentId) && $paymentIntentId !== 0) {
                $intent = Stripe\PaymentIntent::retrieve(
                    $paymentIntentId
                );
                $intent->confirm();
            }
            if ($intent->status == 'requires_action' &&
                $intent->next_action->type == 'use_stripe_sdk' || $intent->status == 'requires_source_action') {
                # Tell the client to handle the action
                return json_encode([
                    'requires_action' => true,
                    'payment_intent_client_secret' => $intent->client_secret
                ]);
            } else if ($intent->status == 'succeeded') {
                // Paiement Stripe accepté

                // Session::flash('success', 'Payment successful!')
                // créer payment
                // gérer commande
                
                // Mail::to($request->payer_email)->send(new OrderConfirmation($order));

                return json_encode([
                    "success" => true
                ]);
            } else {
                http_response_code(500);
                return json_encode(['error' => 'Invalid PaymentIntent status']);
            }
        } catch (\Exception $e) {
            # Display error on client
            return json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
}
