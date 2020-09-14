<?php

namespace Database\Factories;

use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

class PublisherFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Publisher::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'type' => $this->faker->randomElement(['sarl', 'eurl', 'sa', 'sas', 'sasu', 'snc', 'scp']),
            'description' => [
                'en' => $this->faker->paragraph(10),
                'fr' => $this->faker->paragraph(10),
            ],
            'founder' => $this->faker->name,
            'headquarter' => $this->faker->city,
            'url' => 'https://' . parse_url($this->faker->url)['host'],
            'email' => $this->faker->companyEmail,
            'active' => $this->faker->boolean(80),
            'address' => [
                'street' => $this->faker->streetAddress,
                'postcode' => $this->faker->postcode,
                'city' => $this->faker->city,
            ],
            'opening_date' => $this->faker->dateTime,
        ];
    }
}
