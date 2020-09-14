<?php

namespace Database\Factories;

use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuthorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Author::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $attributes = [
            'name' => $this->faker->name,
            'description' => [
                'en' => $this->faker->paragraph(10),
                'fr' => $this->faker->paragraph(10),
            ],
            'backlinks' => [],
        ];

        for ($i = 0; $i < $this->faker->numberBetween(2, 5); $i++) {
            $attributes['backlinks'][] = [
                'date' => $this->faker->dateTime->format('Y-m-d'),
                'url' => $this->faker->url,
            ];
        }

        return $attributes;
    }
}
