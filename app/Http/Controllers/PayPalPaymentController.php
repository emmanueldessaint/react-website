<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
use App\Http\PayPalClient;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;


class PayPalPaymentController extends Controller
{
    public function createOrder(Request $request, $debug=false) {
        dd($request->all());
        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = self::buildRequestBody();

        $client = PayPalClient::client();
        $response = $client->execute($request);

        
        Session::put('order', $order);
        Session::save();

        return json_encode($response);
    }

    private static function buildRequestBody($totalAmount)
    {
        return array(
            'intent' => 'CAPTURE',
            'application_context' =>
                array(
                    'user_action' => 'PAY_NOW',
                ),
            'purchase_units' =>
                array(
                    0 =>
                        array(
                            'amount' =>
                                array(
                                    'currency_code' => env("MIX_REACT_APP_PAYPAL_CURRENCY"),
                                    'value' => $totalAmount
                                )
                        )
                )
        );
    }

    public function captureOrder(Request $request) {
        $request = new OrdersCaptureRequest($request->orderID);

        $client = PayPalClient::client();
        $response = $client->execute($request);

        if ($response->result->status == "COMPLETED") {
            // save commande

            Session::forget('order');
            return json_encode($response);
        } else {
            return json_encode(['error' => 'Error ocurred']);
        }
    }
}
