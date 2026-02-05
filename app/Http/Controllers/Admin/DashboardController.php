<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $users = User::with(['design.scores'])
            ->where('role', 'user')
            ->orderBy('created_at', 'desc')
            ->get();


        return inertia('Admin/Dashboard', [
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        $user->load('design');

        return inertia('Admin/UserDetail', [
            'user' => $user,
        ]);
    }

    public function toggle(User $user)
    {
        $user->update([
            'is_active' => ! $user->is_active,
        ]);

        return back();
    }
}
