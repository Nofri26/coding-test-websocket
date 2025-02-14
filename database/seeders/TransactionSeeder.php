<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 20; $i++) {
            $transaction = Transaction::query()->create([
                'code' => 'code-' . $i,
            ]);

            $products = Product::query()->inRandomOrder()->limit(rand(1, 3))->pluck('id');

            foreach ($products as $productId) {
                $transaction->products()->attach($productId, [
                    'quantity' => rand(1, 5),
                ]);
            }
        }
    }
}
