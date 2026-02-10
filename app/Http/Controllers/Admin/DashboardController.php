<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
{
    $users = User::select('users.*')
        ->leftJoin('designs', 'users.id', '=', 'designs.user_id')
        ->leftJoin('scores', 'designs.id', '=', 'scores.design_id')
        ->where('users.role', 'user')
        ->orderBy('scores.score', 'desc')
        ->with(['design.scores'])
        ->get();

    $juri = User::where('role', 'juri')->get();

    return Inertia::render('Admin/Dashboard', [
        'users' => $users,
        'juri'  => $juri,
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
