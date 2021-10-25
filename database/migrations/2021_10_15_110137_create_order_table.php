<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('id_order');
            $table->string('payer_firstname');
            $table->string('payer_lastname');
            $table->string('payer_email');
            $table->string('payer_tel')->nullable();
            $table->string('payment_method');
            $table->string('status');
            $table->string('total');
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_zipcode');
            $table->string('shipping_additional_info')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order');
    }
}
