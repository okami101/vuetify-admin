<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Cleanup media
         */
        foreach (Storage::disk('public')->allDirectories('media') as $dir) {
            Storage::disk('public')->deleteDirectory($dir);
        }

        $this->call(UserSeeder::class);
        $this->call(PublisherSeeder::class);
        $this->call(AuthorSeeder::class);
        $this->call(BookSeeder::class);
        $this->call(ReviewSeeder::class);
    }

    /**
     * Random media
     *
     * @param Generator|\Faker\UniqueGenerator $faker
     * @param string                           $type
     * @param string                           $extension
     *
     * @return string
     */
    public static function randomMedia($faker, $type, $max, $extension = 'jpg'): string
    {
        $i = str_pad($faker->numberBetween(1, $max), 2, '0', STR_PAD_LEFT);

        return database_path("/seeds/media/{$type}/{$i}.{$extension}");
    }

    public static function pdf(): string
    {
        return database_path('/seeds/media/sample.pdf');
    }
}
