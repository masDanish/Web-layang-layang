<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('design')
            ->where('role', 'user')
            ->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }
}
