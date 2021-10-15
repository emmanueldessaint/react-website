<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReviews;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'products' => $products
        ]);
    }

    public function best()
    {
        $products = Product::all()->random(4);

        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'product' => $product
        ]);
    }

    public function allReviews() 
    {
        $allReviews = ProductReviews::where('note', '>', 3)->inRandomOrder()->limit(4)->get();
        $reviewsAverage = ProductReviews::avg('note');

        return response()->json([
            'allReviewss' => $allReviews,
            'reviewsAverage' => round($reviewsAverage, 2)
        ]);   
    }

    public function reviews($id) 
    {
        $reviews = ProductReviews::where('id_product', '=', $id)->get();
        return json_encode($reviews);
    }

    public function averageProductReview($id)
    {
        $productReviews = ProductReviews::where('id_product', $id)->avg('note');
        $rounded = round($productReviews, 2);
        return json_encode($rounded);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
