<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_verified',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
        ];
    }

    // ================= RELATION =================

    public function design()
    {
        return $this->hasOne(Design::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class, 'juri_id');
    }

    // ================= HELPER =================

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isJuri(): bool
    {
        return $this->role === 'juri';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }
}
