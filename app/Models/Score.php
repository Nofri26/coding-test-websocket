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

    protected static function boot()
    {
        parent::boot();

        static::created(function ($score) {
            Score::logChange($score, 'created', null, $score->toArray());
        });

        static::updating(function ($score) {
            $oldValue = $score->getOriginal();
            Score::logChange($score, 'updated', $oldValue, $score->toArray());
        });

        static::deleted(function ($score) {
            Score::logChange($score, 'deleted', $score->toArray(), null);
        });
    }

    protected static function logChange($score, $event, $oldValue, $newValue)
    {
        ScoreLog::query()->create([
            'score_id' => $score->id,
            'user_id' => auth()->user()->id,
            'event' => $event,
            'old_value' => $oldValue,
            'new_value' => $newValue,
        ]);
    }
}
