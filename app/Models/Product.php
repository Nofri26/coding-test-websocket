<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'stock',
        'price',
    ];

    public function transactions(
    ): BelongsToMany
    {
        return $this->belongsToMany(Transaction::class,
            'transaction_details',
            'product_id',
            'transaction_id')
            ->withPivot('quantity',
                'price');
    }
}
