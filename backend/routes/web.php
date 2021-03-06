<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\UserController;


use App\Http\Controllers\Payment\PaypalPaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{path?}', 'welcome');

Route::post('login', [LoginController::class, 'login']);

Route::get('logout', [LoginController::class, 'logout']);

Route::post('register', [RegisterController::class, 'register']);

// Subscribe
Route::post('subscribe', [UserController::class, 'subscribe']);

// Contact
Route::post('contact', [UserController::class, 'contact']);



// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');