<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Design extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_path',
        'status',
    ];

    // ================= RELATION =================

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }

    public function averageScore(): float
    {
        return (float) $this->scores()->avg('score') ?? 0;
    }
}
