<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\PaypalPaymentController;

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

// Products
Route::get('products', [ProductController::class, 'index']);
// Route::get('products/{id}', [ProductController::class, 'show']);
Route::get('product/{id}', [ProductController::class, 'getOneProduct']);


// Reviews
Route::get('reviews', [ProductController::class, 'homeRequest']);
Route::post('createReview', [ReviewController::class, 'create']);

Route::get('averageProductReview/{id}', [ProductController::class, 'averageProductReview']);

// Stripe
Route::post('charge', [StripePaymentController::class, 'charge']);

// Paypal
Route::post('createOrder', [PaypalPaymentController::class, 'createOrder']);
Route::post('captureOrder', [PaypalPaymentController::class, 'captureOrder']);

// Login
Route::post('login', [LoginController::class, 'login']);

Route::get('logout', [LoginController::class, 'logout']);

Route::post('register', [RegisterController::class, 'register']);

// Subscribe
Route::post('subscribe', [UserController::class, 'subscribe']);

// Contact
Route::post('contact', [UserController::class, 'contact']);
