<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Publisher;
use Faker\Generator as Faker;

$factory->define(Publisher::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'type' => $faker->randomElement(['sarl', 'eurl', 'sa', 'sas', 'sasu', 'snc', 'scp']),
        'description' => [
            'en' => $faker->paragraph(10),
            'fr' => $faker->paragraph(10),
        ],
        'founder' => $faker->name,
        'headquarter' => $faker->city,
        'url' => 'https://' . parse_url($faker->url)['host'],
        'email' => $faker->companyEmail,
        'active' => $faker->boolean(80),
        'address' => [
            'street' => $faker->streetAddress,
            'postcode' => $faker->postcode,
            'city' => $faker->city,
        ],
        'opening_date' => $faker->dateTime,
    ];
});
