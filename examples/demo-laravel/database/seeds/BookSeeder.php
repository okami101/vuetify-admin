<?php

use App\Author;
use App\Book;
use App\Category;
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

        $categories = Category::all();
        $publishers = Publisher::all();
        $authors = Author::all();

        factory(Book::class, 500)->make()->each(function (Book $book) use ($categories, $publishers, $authors, $faker) {
            $book->category()->associate($categories->random());
            $book->publisher()->associate($publishers->random());
            $book->save();

            $book->authors()->sync($authors->random(random_int(1, 2)));

            $book->addMedia(DatabaseSeeder::randomMedia($faker, 'covers', 9))
                ->preservingOriginal()
                ->toMediaCollection('cover');

            $book->addMedia(DatabaseSeeder::pdf())
                ->preservingOriginal()
                ->toMediaCollection('extract');
        });
    }
}
