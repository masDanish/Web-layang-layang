<?php

namespace App\Http\Controllers\Juri;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Design;
use App\Models\Score;

class ScoreController extends Controller
{
    public function store(Request $request, Design $design)
    {
        $request->validate([
            'creativity' => 'required|integer|min:1|max:100',
            'aesthetic'  => 'required|integer|min:1|max:100',
            'theme'      => 'required|integer|min:1|max:100',
            'technique'  => 'required|integer|min:1|max:100',
            'comment'    => 'nullable|string',
        ]);

        $finalScore = (
            $request->creativity +
            $request->aesthetic +
            $request->theme +
            $request->technique
        ) / 4;

        Score::updateOrCreate(
            [
                'design_id' => $design->id,
                'juri_id'   => Auth::id(),
            ],
            [
                'creativity' => $request->creativity,
                'aesthetic'  => $request->aesthetic,
                'theme'      => $request->theme,
                'technique'  => $request->technique,
                'score'      => round($finalScore),
                'comment'    => $request->comment,
            ]
        );

        $design->update([
            'status' => 'reviewed',
        ]);

        return back()->with('success', 'Penilaian berhasil disimpan');
    }
}
