<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReviews;
use Illuminate\Http\Request;

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

    public function allreviews() 
    {
        $allreviews = ProductReviews::where('note', '>', 3)->inRandomOrder()->limit(4)->get();
        
            return json_encode($allreviews);   
    }

    public function reviewsAverage() 
    {
        $reviewsAverage = ProductReviews::avg('note');  
        return json_encode($reviewsAverage);       
    }

    public function reviews($id) 
    {
        $reviews = ProductReviews::where('id_product', '=', $id)->get();
        return json_encode($reviews);
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
