<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Okami101\LaravelAdmin\Faker\Provider\Html;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->faker->addProvider(new Html($this->faker));

        return [
            'isbn' => $this->faker->isbn13,
            'title' => [
                'en' => ucfirst($this->faker->words($this->faker->numberBetween(1, 5), true)),
                'fr' => ucfirst($this->faker->words($this->faker->numberBetween(1, 5), true)),
            ],
            'description' => [
                'en' => $this->faker->paragraph(10),
                'fr' => $this->faker->paragraph(10),
            ],
            'summary' => [
                'en' => $this->faker->htmlParagraphs(10, 10, 10),
                'fr' => $this->faker->htmlParagraphs(10, 10, 10),
            ],
            'formats' => $this->faker->randomElements(
                ['pocket', 'paperback', 'pdf', 'epub', 'kindle'],
                $this->faker->numberBetween(1, 5)
            ),
            'price' => $this->faker->randomFloat(2, 10, 50),
            'commentable' => $this->faker->boolean(80),
            'tags' => collect($this->faker->words($this->faker->numberBetween(2, 5)))->unique(),
            'publication_date' => $this->faker->dateTime,
        ];
    }
}
