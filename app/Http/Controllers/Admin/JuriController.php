<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class JuriController extends Controller
{
    // LIST JURI
    public function index()
    {
        $juris = User::where('role', 'juri')->get();

        return Inertia::render('Admin/Juri/Index', [
            'juris' => $juris
        ]);
    }

    // CREATE JURI
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'juri',
        ]);

        return back();
    }

    // UPDATE JURI
    public function update(Request $request, User $user)
    {
        if ($user->role !== 'juri') {
            abort(403);
        }

        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6|confirmed',
        ]);

        $data = [
            'name'  => $request->name,
            'email' => $request->email,
        ];

        // 👉 JIKA PASSWORD DIISI
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return back();
    }

    // DELETE JURI
    public function destroy(User $user)
    {
        if ($user->role !== 'juri') {
            abort(403);
        }

        $user->delete();
        return back();
    }
}
