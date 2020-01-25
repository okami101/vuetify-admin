<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'isbn' => $faker->isbn13,
        'title' => $faker->sentence,
        'description' => $faker->paragraph,
        'author' => $faker->name,
        'publication_date' => $faker->dateTime,
    ];
});
