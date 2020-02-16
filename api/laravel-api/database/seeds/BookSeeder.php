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
        $publishers = Publisher::all();

        factory(\App\Book::class, 500)->make()->each(function (\App\Book $book) use ($publishers) {
            $book->publisher()->associate($publishers->random());
            $book->save();
        });
    }
}
