<?php

use App\Publisher;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $publishers = Publisher::all();
        $authors = \App\Author::all();

        factory(\App\Book::class, 500)->make()->each(function (\App\Book $book) use ($publishers, $authors, $faker) {
            $book->publisher()->associate($publishers->random());
            $book->save();

            $book->authors()->sync($authors->random(random_int(1, 2)));

            $book->addMedia(DatabaseSeeder::randomMedia($faker, 'covers', 9))
                ->preservingOriginal()
                ->toMediaCollection('images');

            $book->addMedia(DatabaseSeeder::pdf())
                ->preservingOriginal()
                ->toMediaCollection('files');
        });
    }
}
