<?php

namespace App\Http\Requests\Scores;

use Illuminate\Foundation\Http\FormRequest;

class StoreScoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sport' => ['required', 'string'],
            'team_a' => ['required', 'string', 'max:255'],
            'team_b' => ['required', 'string', 'max:255'],
        ];
    }
}
