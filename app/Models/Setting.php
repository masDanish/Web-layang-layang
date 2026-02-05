<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_name',
        'description',
        'submission_deadline',
        'is_open',
    ];

    protected function casts(): array
    {
        return [
            'is_open' => 'boolean',
            'submission_deadline' => 'date',
        ];
    }
}
