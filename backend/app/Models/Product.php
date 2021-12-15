<?php

namespace App\Models;

use App\Models\ProductReviews;
use App\Models\ProductImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
    ];
    
    protected $guarded = [];

    public function reviews() {
        return $this->hasMany(ProductReviews::class, 'id_product');
    }

    public function images() {
        return $this->hasMany(ProductImages::class, 'id_product');
    }

    public function order() {
        return $this->belongsTo(Order::class, 'id_order');
    }
}
