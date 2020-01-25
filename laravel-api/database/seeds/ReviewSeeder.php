<?php

use App\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $books = \App\Book::all();

        factory(Review::class, 500)->make()->each(function (Review $review) use ($books) {
            $review->book()->associate($books->random());
            $review->save();
        });
    }
}
