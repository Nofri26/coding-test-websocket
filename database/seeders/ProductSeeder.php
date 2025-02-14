<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i = 1; $i <= 10; $i++){
            Product::query()->create([
                'name' => 'Product '.$i,
                'stock' => rand(1, 10),
                'price' => rand(10000, 1000000),
            ]);
        }
    }
}
