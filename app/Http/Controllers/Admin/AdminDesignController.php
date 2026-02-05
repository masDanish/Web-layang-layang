<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Design;

class AdminDesignController extends Controller
{


    public function setWinner(Request $request)
    {
        Design::query()->update(['is_winner' => false]);

        Design::where('id', $request->design_id)
            ->update(['is_winner' => true]);

        return back()->with('success', 'Juara berhasil ditentukan');
    }
}
