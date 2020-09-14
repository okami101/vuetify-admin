<?php

namespace Database\Factories;

use App\Models\MonsterChild;
use Illuminate\Database\Eloquent\Factories\Factory;

class MonsterChildFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MonsterChild::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
        ];
    }
}
