<?php

use App\Models\Monster;
use App\Models\MonsterChild;
use Illuminate\Database\Seeder;

class MonsterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Monster::factory(100)->create()->each(function (Monster $monster) {
            $monster->children()->createMany(MonsterChild::factory(random_int(2, 8))->raw());

            $monster->addMedia(DatabaseSeeder::randomMedia('portraits', 5))
                ->preservingOriginal()
                ->toMediaCollection('avatar');

            $random = random_int(3, 6);

            for ($i = 0; $i < $random; $i++) {
                $monster->addMedia(DatabaseSeeder::randomMedia('office', 9, 'jpg'))
                    ->preservingOriginal()
                    ->toMediaCollection('images');
            }

            $random = random_int(3, 6);

            for ($i = 0; $i < $random; $i++) {
                $monster->addMedia(DatabaseSeeder::pdf())
                    ->preservingOriginal()
                    ->toMediaCollection('files');
            }
        });
    }
}
