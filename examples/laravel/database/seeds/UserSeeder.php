<?php

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
        User::factory(500)->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
        ]);
    }
}
