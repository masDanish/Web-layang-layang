<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Danish',
            'email' => 'admin@lomba.com',
            'password' => Hash::make('manukirsyad'),
            'role' => 'admin',
        ]);
    }
}
