<?php

use App\Publisher;
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

        factory(Publisher::class, 10)->create()->each(function (Publisher $publisher) use ($faker) {
            $publisher->addMedia(DatabaseSeeder::randomMedia($faker, 'publishers', 1, 'png'))
                ->preservingOriginal()
                ->toMediaCollection('images');
        });
    }
}
