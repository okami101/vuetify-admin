<?php

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

        factory(\App\Author::class, 100)->create()->each(function (\App\Author $author) use ($faker) {
            $author->addMedia(DatabaseSeeder::randomMedia($faker, 'portraits', 5))
                ->preservingOriginal()
                ->toMediaCollection('photo');
        });
    }
}
