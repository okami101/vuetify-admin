<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'roles' => ['admin'],
        ]);

        User::factory()->create([
            'name' => 'Demo',
            'email' => 'demo@example.com',
            'roles' => ['admin'],
        ]);

        for ($i = 1; $i <= 50; $i++) {
            User::factory()->create([
                'name' => "Editor $i",
                'email' => "editor-$i@example.com",
                'roles' => ['editor'],
            ]);
        }

        for ($i = 1; $i <= 200; $i++) {
            User::factory()->create([
                'name' => "Author $i",
                'email' => "author-$i@example.com",
                'roles' => ['author'],
            ]);
        }
    }
}
