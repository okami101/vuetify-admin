<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    $faker->addProvider(new \App\Faker\Provider\Html($faker));

    return [
        'isbn' => $faker->isbn13,
        'title' => $faker->sentence,
        'description' => $faker->paragraph(10),
        'summary' => $faker->htmlParagraphs(10, 10, 10),
        'author' => $faker->name,
        'publication_date' => $faker->dateTime,
    ];
});
