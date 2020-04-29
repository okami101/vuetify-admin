<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\MonsterChild;
use Faker\Generator as Faker;

$factory->define(MonsterChild::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
