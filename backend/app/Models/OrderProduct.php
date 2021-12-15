<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class OrderProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_order',
        'id_product',
        'quantity',
        'shipped',
    ];

    public function order() {
        return $this->belongsTo(Order::class, 'id_order');
    }
}
