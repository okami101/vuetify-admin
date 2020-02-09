<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Publisher;
use Faker\Generator as Faker;

$factory->define(Publisher::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'description' => $faker->paragraph(10),
        'founder' => $faker->name,
        'headquarter' => $faker->city,
        'opening_date' => $faker->dateTime,
    ];
});
