<?php

namespace App\Http\Controllers;

use App\Events\ScoreUpdated;
use App\Http\Requests\Scores\StoreScoreRequest;
use App\Models\Score;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class ScoreController extends Controller
{
    public function __construct(
        protected Score $score
    ) {}

    public function index(): Response
    {
        $scores = $this->score->all();
        return inertia('scores/index', compact('scores'));
    }

    public function create(): Response
    {
        return inertia('scores/create');
    }

    public function store(StoreScoreRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Score::query()->create($data);

        return Redirect::route('scores.index');
    }

    public function edit(Score $score): Response
    {
        return inertia('scores/edit', compact('score'));
    }

    public function update(Request $request, Score $score): RedirectResponse
    {
        $score->update($request->only(['score_a', 'score_b']));

        broadcast(new ScoreUpdated($score));

        flashMessage('success',
            'Score updated.');

        return Redirect::route('scores.edit', $score);
    }
}
