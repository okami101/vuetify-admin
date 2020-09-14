<?php

namespace Database\Factories;

use App\Models\Monster;
use Illuminate\Database\Eloquent\Factories\Factory;
use Okami101\LaravelAdmin\Faker\Provider\Html;

class MonsterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Monster::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->faker->addProvider(new Html($this->faker));

        return [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'label' => [
                'en' => $this->faker->words(3, true),
                'fr' => $this->faker->words(3, true),
            ],
            'active' => $this->faker->boolean,
            'level' => $this->faker->numberBetween(1, 99),
            'rating' => $this->faker->numberBetween(0, 5),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'description' => [
                'en' => $this->faker->paragraph(10),
                'fr' => $this->faker->paragraph(10),
            ],
            'body' => [
                'en' => $this->faker->htmlParagraphs(10, 10, 10),
                'fr' => $this->faker->htmlParagraphs(10, 10, 10),
            ],
            'category' => $this->faker->randomElement(['history', 'novel', 'comics']),
            'tags' => $this->faker->randomElements(['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'], random_int(3, 6)),
            'publication_date' => $this->faker->dateTime,
        ];
    }
}
