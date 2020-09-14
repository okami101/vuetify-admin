<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $authors = \App\Models\User::role('author')->get();

        Author::factory(100)->create()->each(function (\App\Models\Author $author) use ($faker, $authors) {
            $author->addMedia(DatabaseSeeder::randomMedia($faker, 'portraits', 5))
                ->preservingOriginal()
                ->toMediaCollection('photo');

            $author->users()->attach($authors->random($faker->numberBetween(1, 2))->pluck('id'));
        });
    }
}
