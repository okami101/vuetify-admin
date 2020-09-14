<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Review;
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
        $books = Book::commentables()->get();

        Review::factory(5000)->make()->each(function (Review $review) use ($books) {
            $review->book()->associate($books->random());
            $review->save();
        });
    }
}
