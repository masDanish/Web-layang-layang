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
            'score'   => 'required|integer|min:1|max:100',
            'comment' => 'nullable|string',
        ]);

        Score::updateOrCreate(
            [
                'design_id' => $design->id,
                'juri_id'   => Auth::id(),
            ],
            [
                'score'   => $request->score,
                'comment' => $request->comment,
            ]
        );

        // ubah status desain
        $design->update([
            'status' => 'reviewed',
        ]);

        return back()->with('success', 'Penilaian berhasil disimpan');
    }
}

