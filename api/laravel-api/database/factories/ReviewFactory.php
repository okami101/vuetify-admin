<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'rating' => $faker->numberBetween(1, 5),
        'status' => $faker->randomElement(['published', 'pending', 'denied']),
        'body' => $faker->paragraph(10),
        'author' => $faker->name,
        'publication_date' => $faker->dateTime,
    ];
});
