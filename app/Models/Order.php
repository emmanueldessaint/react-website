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
        'id_customer_order',
        'id_user',
        'payer_firstname',
        'payer_lastname',
        'payer_email',
        'payer_tel',
        'payment_method',
        'status',
        'total',
        'shipping_country',
        'shipping_address',
        'shipping_city',
        'shipping_zipcode',
        'shipping_additional_info',
    ];

    public function orderProducts() {
        return $this->hasMany(OrderProduct::class, 'id_order');
    }

    public function order() {
        return $this->belongsTo(User::class, 'id_user');
    }
}
