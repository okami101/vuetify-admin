<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Monster;
use Faker\Generator as Faker;
use Okami101\LaravelAdmin\Faker\Provider\Html;

$factory->define(Monster::class, function (Faker $faker) {
    $faker->addProvider(new Html($faker));

    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'label' => [
            'en' => $faker->words(3, true),
            'fr' => $faker->words(3, true),
        ],
        'active' => $faker->boolean,
        'level' => $faker->numberBetween(1, 99),
        'rating' => $faker->numberBetween(0, 5),
        'price' => $faker->randomFloat(2, 10, 1000),
        'description' => [
            'en' => $faker->paragraph(10),
            'fr' => $faker->paragraph(10),
        ],
        'body' => [
            'en' => $faker->htmlParagraphs(10, 10, 10),
            'fr' => $faker->htmlParagraphs(10, 10, 10),
        ],
        'category' => $faker->randomElement(['history', 'novel', 'comics']),
        'tags' => $faker->randomElements(['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'], random_int(3, 6)),
        'publication_date' => $faker->dateTime,
    ];
});
