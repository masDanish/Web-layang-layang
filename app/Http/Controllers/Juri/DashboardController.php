<?php

namespace App\Http\Controllers\Juri;

use App\Http\Controllers\Controller;
use App\Models\Design;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Juri/Dashboard', [
            'designs' => Design::with(['user', 'scores'])
                ->latest()
                ->get(),
        ]);
    }
}
