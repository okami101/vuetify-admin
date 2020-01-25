<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        'body' => $faker->paragraph,
        'rating' => $faker->numberBetween(0, 5),
        'author' => $faker->name,
        'publication_date' => $faker->dateTime,
    ];
});
