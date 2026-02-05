<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Design;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
{
    $user = Auth::user();

    $design = Design::withAvg('scores', 'score')
        ->where('user_id', $user->id)
        ->first();

    return inertia('User/Dashboard', [
        'event' => [
            'name' => 'Lomba Desain Layang-Layang 2026',
            'date' => '12 Maret 2026',
            'status' => 'Penilaian',
        ],
        'design' => $design ? [
            'id' => $design->id,
            'title' => $design->title,
            'image_path' => $design->image_path,
            'status' => $design->status,
            'average_score' => (float) $design->scores_avg_score,
        ] : null,
    ]);
}

}
