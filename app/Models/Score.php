<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'design_id',
        'juri_id',
        'score',
        'comment',
    ];

    // ================= RELATION =================

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function juri()
    {
        return $this->belongsTo(User::class, 'juri_id');
    }
}
