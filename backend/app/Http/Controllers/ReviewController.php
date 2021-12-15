<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductReviews;

class ReviewController extends Controller
{
    public function create(Request $request) {
        $review = ProductReviews::create([
            'id_product' => $request->newComment['id_product'],
            'id_user' => 1,
            // 'id_user' => $request->newComment['id_user'],
            'note' => $request->newComment['note'],
            'title' => $request->newComment['title'],
            'description' => $request->newComment['description'],
            'date' => now(),
        ]);
        $review->save();
        
        return json_encode([
            "success" => 'Review published!'
        ]);
    }
}
