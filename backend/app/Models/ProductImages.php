<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_product',
        'url',
        'description',
    ];

    public function product() {
        return $this->belongsTo('App/Models/Product', 'id_product');
    }
  
    protected $guarded = [];
}