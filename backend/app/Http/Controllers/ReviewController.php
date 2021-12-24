<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductReviews;

class ReviewController extends Controller
{
    public function create(Request $request) {
        $review = ProductReviews::create([
            'id_product' => $request->id_product,
            'id_user' => $request->id_user,
            'note' => $request->note,
            'title' => $request->title,
            'description' => $request->description,
            'date' => now(),
        ]);
        $review->save();
        
        return json_encode([
            "success" => $review
        ]);
    }
}
