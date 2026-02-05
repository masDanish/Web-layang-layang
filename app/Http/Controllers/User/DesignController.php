<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Design;

class DesignController extends Controller
{
    public function store(Request $request)
    {
        // 1️⃣ VALIDASI
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:2048', // max 2MB
        ]);

        // 2️⃣ SIMPAN FILE
        $path = $request->file('image')->store('designs', 'public');

        // 3️⃣ SIMPAN KE DATABASE
        Design::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $path,
            'status' => 'pending',
        ]);

        // 4️⃣ KEMBALI KE DASHBOARD
        return redirect()
            ->route('user.dashboard')
            ->with('success', 'Desain berhasil diupload 🎉');
    }
}
