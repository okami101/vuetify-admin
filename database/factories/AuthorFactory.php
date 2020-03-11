<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Author;
use Faker\Generator as Faker;

$factory->define(Author::class, function (Faker $faker) {
    $attributes = [
        'name' => $faker->name,
        'description' => [
            'en' => $faker->paragraph(10),
            'fr' => $faker->paragraph(10),
        ],
        'backlinks' => [],
    ];

    for ($i = 0; $i < $faker->numberBetween(2, 5); $i++) {
        $attributes['backlinks'][] = [
            'date' => $faker->dateTime->format('Y-m-d'),
            'url' => $faker->url,
        ];
    }

    return $attributes;
});
