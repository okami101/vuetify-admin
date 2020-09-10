<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;
use Okami101\LaravelAdmin\Faker\Provider\Html;

$factory->define(Book::class, function (Faker $faker) {
    $faker->addProvider(new Html($faker));

    return [
        'isbn' => $faker->isbn13,
        'title' => [
            'en' => ucfirst($faker->words($faker->numberBetween(1, 5), true)),
            'fr' => ucfirst($faker->words($faker->numberBetween(1, 5), true)),
        ],
        'description' => [
            'en' => $faker->paragraph(10),
            'fr' => $faker->paragraph(10),
        ],
        'summary' => [
            'en' => $faker->htmlParagraphs(10, 10, 10),
            'fr' => $faker->htmlParagraphs(10, 10, 10),
        ],
        'formats' => $faker->randomElements(
            ['pocket', 'paperback', 'pdf', 'epub', 'kindle'],
            $faker->numberBetween(1, 5)
        ),
        'price' => $faker->randomFloat(2, 10, 50),
        'commentable' => $faker->boolean(80),
        'tags' => collect($faker->words($faker->numberBetween(2, 5)))->unique(),
        'publication_date' => $faker->dateTime,
    ];
});
