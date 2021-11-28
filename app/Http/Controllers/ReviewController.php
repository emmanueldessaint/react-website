<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductReviews;

class ReviewController extends Controller
{
    public function createReview(Request $request) {
        dd($request);
        // $review = ProductReview::create([
        //     // 'id_product' => $request->
        // ]);
        // $review->save();
    }
}
