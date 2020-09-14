<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'rating' => $this->faker->numberBetween(1, 5),
            'status' => $this->faker->randomElement(['published', 'pending', 'denied']),
            'body' => $this->faker->paragraph(10),
            'author' => $this->faker->name,
            'publication_date' => $this->faker->dateTime,
        ];
    }
}
