<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Payment\StripePaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products', [ProductController::class, 'index']);

// Route::get('products/{id}', [ProductController::class, 'show']);

Route::get('product/{id}', [ProductController::class, 'getOneProduct']);

Route::get('reviews', [ProductController::class, 'homeRequest']);

Route::get('averageProductReview/{id}', [ProductController::class, 'averageProductReview']);

<<<<<<< HEAD

// ******** PAYMENT ROUTES ********

// STRIPE
Route::post('/charge', [StripePaymentController::class, 'charge']);

// PAYPAL

=======
Route::post('charge', [StripePaymentController::class, 'charge']);
>>>>>>> 17f82014e803b2160b875a1c9269583580e36aea
