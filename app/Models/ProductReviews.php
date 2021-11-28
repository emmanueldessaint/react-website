<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReviews extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_product',
        'id_user',
        'title',
        'description',
        'note',
        'date',
    ];

    public function product() {
        return $this->belongsTo('App/Models/Product', 'id_product');
    }

    public function user() {
        return $this->belongsTo('App/models/User', 'id_user');
    }
    
    protected $guarded = [];
}
