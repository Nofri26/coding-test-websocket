<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = [
        'sport',
        'team_a',
        'team_b',
        'score_a',
        'score_b',
    ];
}
