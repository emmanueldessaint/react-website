<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
use App\Http\PayPalClient;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use App\Models\Product;
use App\Models\Payment;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\User;
use App\Mail\OrderConfirmation;
use Session;
use Mail;


class PayPalPaymentController extends Controller
{
    public function createOrder(Request $request, $debug=false) {

        $totalAmount = 0;
        $productsToShip = [];
        foreach ($request->cart as $item) {
            $product = Product::where('id', $item['id'])->first();
            $totalAmount += $product->price * $item['quantity'];
            $productInfo = [
                'product' => $product,
                'quantity' => $item['quantity']
            ];
            array_push($productsToShip, $productInfo);
        }
        $totalAmount += env('SHIPPING_FEES');

        $request = new OrdersCreateRequest();
        $request->prefer('return=representation');
        $request->body = self::buildRequestBody($totalAmount);

        $client = PayPalClient::client();
        $response = $client->execute($request);

        Session::put('order', $productsToShip);
        Session::put('totalAmount', $totalAmount);
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
            $user = User::where('email', $response->result->payer->email_address)->first();

            if (!isset($user)) {
                $user = User::create([
                    'firstname' => $response->result->payer->name->given_name,
                    'lastname' => $response->result->payer->name->surname,
                    'email' => $response->result->payer->email_address,
                    'address' => $response->result->purchase_units[0]->shipping->address->address_line_1,
                    'zip_code' => $response->result->purchase_units[0]->shipping->address->postal_code,
                    'city' => $response->result->purchase_units[0]->shipping->address->admin_area_2
                ]);
                $user->save();
            }

            $order = Order::create([
                'id_customer_order' => rand(10000000, 99999999),
                'id_user' => $user->id,
                'payer_firstname' => $response->result->payer->name->given_name,
                'payer_lastname' => $response->result->payer->name->surname,
                'payer_email' => $response->result->payer->email_address,
                // 'payer_tel' => $request->get('phoneNumber'),
                'payment_method' => 'Paypal',
                'status' => 'Processed',
                'total' => Session::get('totalAmount'),
                'currency' => env("MIX_REACT_APP_PAYPAL_CURRENCY"),
                'shipping_country' => $response->result->purchase_units[0]->shipping->address->country_code,
                'shipping_address' => $response->result->purchase_units[0]->shipping->address->address_line_1,
                'shipping_city' => $response->result->purchase_units[0]->shipping->address->admin_area_2,
                'shipping_zipcode' => $response->result->purchase_units[0]->shipping->address->postal_code,
                'shipping_additional_info' => $response->result->purchase_units[0]->shipping->address->admin_area_1,
            ]);
            $order->save();

            $productsToShip = Session::get('order');

            foreach($productsToShip as $product) {
                $orderProduct = OrderProduct::create([
                    'id_order' => $order->id,
                    'id_product' => $product['product']->id,
                    'quantity' => $product['quantity'],
                    'shipped' => 0
                ]);
                $orderProduct->save();
            }

            Mail::to('contact@parisfabrics.com')->send(new OrderConfirmation($order));
            // Mail::to($order->payer_email)->send(new OrderConfirmation($order));

            Session::forget('order');
            Session::forget('totalAmount');
            return json_encode($response);
        } else {
            http_response_code(501);
            return json_encode(['error' => 'Error ocurred']);
        }
    }
}
