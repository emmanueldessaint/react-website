<?php

namespace App\Models;

use App\Models\ProductReviews;
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
}
