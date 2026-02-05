<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class JuriSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Juri Utama',
            'email' => 'juri@lomba.com',
            'password' => Hash::make('password'),
            'role' => 'juri',
        ]);
    }
}
