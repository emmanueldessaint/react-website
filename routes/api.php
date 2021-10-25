<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

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

Route::get('bestsellers', [ProductController::class, 'best']);

// Route::get('products/{id}', [ProductController::class, 'show']);

Route::get('product/{id}', [ProductController::class, 'getOneProduct']);

Route::get('reviews', [ProductController::class, 'allReviews']);

Route::get('averageProductReview/{id}', [ProductController::class, 'averageProductReview']);

