<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $editors = \App\Models\User::role('editor')->get();

        Publisher::factory(10)->create()->each(function (Publisher $publisher) use ($faker, $editors) {
            $publisher->addMedia(DatabaseSeeder::randomMedia($faker, 'logos', 1, 'png'))
                ->preservingOriginal()
                ->toMediaCollection('logo');

            for ($i = 0; $i < $faker->numberBetween(3, 6); $i++) {
                $publisher->addMedia(DatabaseSeeder::randomMedia($faker, 'office', 9, 'jpg'))
                    ->preservingOriginal()
                    ->toMediaCollection('local');
            }

            $publisher->users()->attach($editors->random($faker->numberBetween(1, 5))->pluck('id'));
        });
    }
}
