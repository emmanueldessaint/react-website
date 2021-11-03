<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Omnipay\Omnipay;
use App\Models\Product;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderProduct;

class StripePaymentController extends Controller
{
    public function charge(Request $request)
    {
        // Calculer le total 
        if (1 == 1) {
            return response('Le paiement a réussi', 200);
        } else {
            return response('Le paiement a échoué', 403);
        }
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET_DEV'));
        Stripe\Charge::create ([
                "amount" => $request->amount, // Prix total
                "currency" => "eur",
                "source" => $request->stripeToken,
                "description" => "This payment is a test"
        ]);
   
        Session::flash('success', 'Payment successful!');

        Mail::to($request->payer_email)->send(new OrderConfirmation($order));

        return back();

        // if ($request->input('stripeToken')) {
  
        //     $gateway = Omnipay::create('Stripe');
        //     $gateway->setApiKey(env('STRIPE_SECRET_KEY'));
           
        //     $token = $request->input('stripeToken');
           
        //     $response = $gateway->purchase([
        //         'amount' => $request->input('amount'),
        //         'currency' => env('STRIPE_CURRENCY'),
        //         'token' => $token,
        //     ])->send();
           
        //     if ($response->isSuccessful()) {
        //         // payment was successful
        //         $arr_payment_data = $response->getData();
                  
        //         $isPaymentExist = Payment::where('payment_id', $arr_payment_data['id'])->first();
           
        //         if(!$isPaymentExist)
        //         {
        //             $payment = new Payment;
        //             $payment->payment_id = $arr_payment_data['id'];
        //             $payment->payer_email = $request->input('email');
        //             $payment->amount = $arr_payment_data['amount']/100;
        //             $payment->currency = env('STRIPE_CURRENCY');
        //             $payment->payment_status = $arr_payment_data['status'];
        //             $payment->save();
        //         }

        //         // Création commande

  
        //         return "Payment is successful.";
        //     } else {
        //         return response('Le paiement a échoué', 403);
        //     }
        // }
    }
}
