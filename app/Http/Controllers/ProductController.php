<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReviews;
use App\Models\ProductImages;
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
        $products = Product::with('reviews', 'images')->get();

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

    public function test() {
        return 'test';
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

    public function homeRequest() 
    {
        $allReviews = ProductReviews::where('note', '>', 3)->inRandomOrder()->limit(4)->get();
        $reviewsAverage = ProductReviews::avg('note');
        $products = Product::with('reviews')->get()->random(4);

        return response()->json([
            'bestSellers' => $products,
            'allReviews' => $allReviews,
            'reviewsAverage' => round($reviewsAverage, 2)
        ]);   
    }

    public function getOneProduct($id) 
    {
        $reviews = ProductReviews::where('id_product', '=', $id)->get();
        // for 
        // $avg = $reviews->
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
