<?php

namespace App\Events;

use App\Models\Score;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Broadcasting\Channel;

class ScoreUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $score;

    public function __construct(Score $score) {
        $this->score = $score;
        Log::info('test', $this->score->toArray());
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('scores')
        ];
    }

    public function broadcastAs()
    {
        return 'score.updated';
    }
}
