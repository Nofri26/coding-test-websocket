<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class TestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message = 'Test message')
    {
        $this->message = $message;
        Log::info('TestEvent constructed with message: ' . $message);

        Log::info('Broadcast driver: ' . config('broadcasting.default'));
        Log::info('Reverb config: ' . json_encode(config('broadcasting.connections.reverb')));
    }

    public function broadcastOn()
    {
        return new Channel('test-channel');
    }
}
