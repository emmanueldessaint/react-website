<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('price');
            $table->integer('sales_price')->nullable();
            $table->text('description')->nullable();
            $table->text('details')->nullable();
            $table->text('colors')->nullable();
            $table->text('variants')->nullable();
            $table->text('categories')->nullable();
            $table->boolean('in_stock')->default(1);
            $table->integer('quantity_left')->nullable();
            $table->boolean('new')->default(0);
            $table->boolean('coup_de_coeur')->default(0);
            $table->boolean('sales')->default(0);
            $table->string('image');
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
        Schema::dropIfExists('products');
    }
}
