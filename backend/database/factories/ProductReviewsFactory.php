<?php

namespace Database\Factories;

use App\Models\ProductReviews;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductReviewsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductReviews::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'id_product' => $this->faker->numberBetween(1,10),
            'id_user' => $this->faker->numberBetween(1,10),
            'note' => $this->faker->numberBetween(1,5)   
        ];
        
    }
}