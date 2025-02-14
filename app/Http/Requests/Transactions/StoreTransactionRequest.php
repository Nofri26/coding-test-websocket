<?php

namespace App\Http\Requests\Transactions;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
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
            'products' => ['required', 'array', 'min:1'],
            'products.*.id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1',
                function ($attribute, $value, $fail) {
                    $productId = request()->input(str_replace('.quantity', '.id', $attribute));

                    $product = Product::query()->find($productId);
                    if (!$product) {
                        return;
                    }

                    if ($value > $product->stock) {
                        $fail("The quantity for product '{$product->name}' exceeds available stock ({$product->stock}).");
                    }
                }],
        ];
    }
}
