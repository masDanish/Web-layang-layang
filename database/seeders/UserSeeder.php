<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ================= ADMIN =================
        User::create([
            'name' => 'Admin Event',
            'email' => 'admin@event.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_verified' => true,
        ]);

        // ================= JURI =================
        User::create([
            'name' => 'Juri 1',
            'email' => 'juri1@event.com',
            'password' => Hash::make('password'),
            'role' => 'juri',
            'is_verified' => true,
        ]);

        User::create([
            'name' => 'Juri 2',
            'email' => 'juri2@event.com',
            'password' => Hash::make('password'),
            'role' => 'juri',
            'is_verified' => true,
        ]);

        // ================= USER =================
        User::create([
            'name' => 'Peserta 1',
            'email' => 'user1@event.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'is_verified' => true,
        ]);
    }
}
