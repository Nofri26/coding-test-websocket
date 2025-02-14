<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transactions\StoreTransactionRequest;
use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $transactions = Transaction::query()->with('products')->latest()->paginate(10);
        return inertia('transactions/index', compact('transactions'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $products = Product::query()->select('id', 'name')->where('stock', '>', 0)->get();
        return inertia('transactions/create', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $transaction = Transaction::query()->create([
            'code' => '',
        ]);

        $transaction->code = $transaction->id . now()->format('ymd');
        $transaction->save();

        if (!empty($data['products'])) {
            foreach ($data['products'] as $product) {
                $transaction->products()->attach($product['id'], [
                    'quantity' => $product['quantity'],
                ]);

                Product::query()->where('id', $product['id'])
                    ->decrement('stock', $product['quantity']);
            }
        }

        return Redirect::route('transactions.show', $transaction);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction): Response
    {
        $transaction = $transaction->load('products');
        return inertia('transactions/show', compact('transaction'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
