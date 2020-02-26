<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    $faker->addProvider(new \App\Faker\Provider\Html($faker));

    return [
        'isbn' => $faker->isbn13,
        'title' => $faker->sentence,
        'category' => $faker->randomElement(['novel', 'comic', 'cook', 'economy', 'politics', 'history', 'fantasy', 'biography']),
        'description' => $faker->paragraph(10),
        'summary' => $faker->htmlParagraphs(10, 10, 10),
        'author' => $faker->name,
        'formats' => $faker->randomElements(
            ['pocket', 'paperback', 'pdf', 'epub', 'kindle'],
            $faker->numberBetween(1, 5)
        ),
        'price' => $faker->randomFloat(2, 10, 50),
        'commentable' => $faker->boolean(80),
        'publication_date' => $faker->dateTime,
    ];
});
