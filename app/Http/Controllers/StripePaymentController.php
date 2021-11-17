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

        Stripe\Stripe::setApiKey(env('STRIPE_SECRET_DEV'));

        $paymentMethodId = $request->get('id');
        $paymentIntentId = $request->get('paymentIntentId');
    
        $intent = null;
        try {
            if (isset($paymentMethodId)) {
                # Create the PaymentIntent
                $intent = Stripe\PaymentIntent::create([
                    'payment_method' => $paymentMethodId,
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                    'amount'   => 5000,
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

    public function oldCharge(Request $request)
    {
        // // return $request;
        // // return $request->id;
        // // Calculer le total 
        // // if (1 == 1) {
        // //     return response('Le paiement a réussi', 200);
        // // } else {
        // //     return response('Le paiement a échoué', 403);
        // // }
        // Stripe\Stripe::setApiKey(env('STRIPE_SECRET_DEV'));
        // Stripe\Charge::create ([
        //         "amount" => $request->amount, // Prix total
        //         "currency" => "eur",
        //         "source" => 'pm_1JueZnH85dp4EuRtudr7ePUM',
        //         "description" => "This payment is a test"
        // ]);
   
        // Session::flash('success', 'Payment successful!');

        // // Mail::to($request->payer_email)->send(new OrderConfirmation($order));

        // return back();

        // // if ($request->input('stripeToken')) {
  
        // //     $gateway = Omnipay::create('Stripe');
        // //     $gateway->setApiKey(env('STRIPE_SECRET_KEY'));
           
        // //     $token = $request->input('stripeToken');
           
        // //     $response = $gateway->purchase([
        // //         'amount' => $request->input('amount'),
        // //         'currency' => env('STRIPE_CURRENCY'),
        // //         'token' => $token,
        // //     ])->send();
           
        // //     if ($response->isSuccessful()) {
        // //         // payment was successful
        // //         $arr_payment_data = $response->getData();
                  
        // //         $isPaymentExist = Payment::where('payment_id', $arr_payment_data['id'])->first();
           
        // //         if(!$isPaymentExist)
        // //         {
        // //             $payment = new Payment;
        // //             $payment->payment_id = $arr_payment_data['id'];
        // //             $payment->payer_email = $request->input('email');
        // //             $payment->amount = $arr_payment_data['amount']/100;
        // //             $payment->currency = env('STRIPE_CURRENCY');
        // //             $payment->payment_status = $arr_payment_data['status'];
        // //             $payment->save();
        // //         }

        // //         // Création commande

  
        // //         return "Payment is successful.";
        // //     } else {
        // //         return response('Le paiement a échoué', 403);
        // //     }
        // // }
    }
}
