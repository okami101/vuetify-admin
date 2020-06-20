<?php

use App\Monster;
use App\MonsterChild;
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
        factory(Monster::class)->times(100)->create()->each(function (Monster $monster) {
            $monster->children()->createMany(factory(MonsterChild::class, random_int(2, 8))->raw());

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
