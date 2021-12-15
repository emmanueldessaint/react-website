<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Omnipay\Omnipay;
use App\Models\Product;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\User;
use App\Mail\OrderConfirmation;
use Stripe;
use Mail;

class StripePaymentController extends Controller
{
    function charge(Request $request) { 
        $totalAmount = 0;
        $productsToShip = [];
        foreach ($request->get('cart') as $item) {
            $product = Product::where('id', $item['id'])->first();
            $totalAmount += $product->price * $item['quantity'];
            $productInfo = [
                'product' => $product,
                'quantity' => $item['quantity']
            ];
            array_push($productsToShip, $productInfo);
        }
        $totalAmount += env('SHIPPING_FEES');
        
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET_DEV'));
        $paymentMethodId = $request->get('id');
        $paymentIntentId = $request->get('paymentIntentId');
        
        $intent = null;
        
        try {
            if (isset($paymentMethodId)) {
                
                $intent = Stripe\PaymentIntent::create([
                    'payment_method' => $paymentMethodId,
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                    'amount'   => $totalAmount,
                    'currency' => 'usd',
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
                
                return json_encode([
                    'requires_action' => true,
                    'payment_intent_client_secret' => $intent->client_secret
                ]);
            } else if ($intent->status == 'succeeded') {
                // Paiement Stripe accepté

                // $payment = Payment::create([
                //     'payer_email' => $request->get('email'),
                //     'amount' => $totalAmount,
                //     'currency' => 'usd',
                //     'payment_status' => 'OK'
                // ]);
                // $payment->save();

                $user = User::where('email', $request->get('email'))->first();

                if (!isset($user)) {
                    $user = User::create([
                        'firstname' => $request->get('firstName'),
                        'lastname' => $request->get('lasName'),
                        'email' => $request->get('email'),
                        'address' => $request->get('address'),
                        'zip_code' => $request->get('zipCode'),
                        'city' => $request->get('city')
                    ]);
                    $user->save();
                }

                $order = Order::create([
                    'id_customer_order' => rand(10000000, 99999999),
                    'id_user' => $user->id,
                    'payer_firstname' => $request->get('firstName'),
                    'payer_lastname' => $request->get('lastName'),
                    'payer_email' => $request->get('email'),
                    // 'payer_tel' => $request->get('phoneNumber'),
                    'payment_method' => 'Stripe',
                    'status' => 'Processed',
                    'total' => $totalAmount,
                    'currency' => env("MIX_REACT_APP_PAYPAL_CURRENCY"),
                    'shipping_country' => $request->get('country'),
                    'shipping_address' => $request->get('address'),
                    'shipping_city' => $request->get('city'),
                    'shipping_zipcode' => $request->get('zipCode'),
                    'shipping_additional_info' => $request->get('additionalInformation'),
                ]);
                $order->save();

                foreach($productsToShip as $product) {
                    $orderProduct = OrderProduct::create([
                        'id_order' => $order->id,
                        'id_product' => $product['product']->id,
                        'quantity' => $product['quantity'],
                        'shipped' => 0
                    ]);
                    $orderProduct->save();
                }
                
                Mail::to($request->get('email'))->send(new OrderConfirmation($order));

                return json_encode([
                    "success" => true
                ]);
            } else {
                http_response_code(500);
                return json_encode(['error' => 'Invalid PaymentIntent status']);
            }
        } catch (\Exception $e) {
            
            return json_encode([
                'error' => $e->getMessage()
            ]);
        }
    }
}
