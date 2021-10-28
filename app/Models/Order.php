<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderProduct;
use App\Models\User;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        
    ];

    public function orderProducts() {
        return $this->hasMany(OrderProduct::class, 'id_order');
    }

    public function order() {
        return $this->belongsTo(User::class, 'id_user');
    }
}
