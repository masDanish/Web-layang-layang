<?php

use App\Http\Controllers\Admin\AdminDesignController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Juri\DashboardController as JuriDashboard;
use App\Http\Controllers\User\DashboardController as UserDashboard;
use App\Http\Controllers\User\DesignController;
use App\Http\Controllers\Juri\ScoreController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

/*
|--------------------------------------------------------------------------
| DASHBOARD (WAJIB UNTUK BREEZE)
|--------------------------------------------------------------------------
| Breeze SELALU redirect ke route bernama "dashboard"
| Route ini bertugas mengarahkan user sesuai role
*/
Route::middleware(['auth'])->get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    if ($user->role === 'juri') {
        return redirect()->route('juri.dashboard');
    }

    return redirect()->route('user.dashboard');
})->name('dashboard');

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminDashboard::class, 'index'])
            ->name('dashboard');

        Route::get('/users/{user}', [AdminDashboard::class, 'show'])
            ->name('users.show');

        Route::patch('/users/{user}/toggle', [AdminDashboard::class, 'toggle'])
            ->name('users.toggle');
        Route::post('/admin/design/winner', [AdminDesignController::class, 'setWinner'])
            ->name('admin.design.winner');
    });

/*
|--------------------------------------------------------------------------
| JURI
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:juri'])
    ->prefix('juri')
    ->name('juri.')
    ->group(function () {
        Route::get('/dashboard', [JuriDashboard::class, 'index'])
            ->name('dashboard');

        Route::post('/design/{design}/score', [ScoreController::class, 'store'])
            ->name('score.store');
    });


/*
|--------------------------------------------------------------------------
| USER
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:user'])
    ->prefix('user')
    ->name('user.')
    ->group(function () {
        Route::get('/dashboard', [UserDashboard::class, 'index'])
            ->name('dashboard');

        // ✅ ROUTE UPLOAD DESAIN
        Route::post('/design', [DesignController::class, 'store'])
            ->name('design.store');
    });


/*
|--------------------------------------------------------------------------
| AUTH ROUTES (BREEZE)
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';
