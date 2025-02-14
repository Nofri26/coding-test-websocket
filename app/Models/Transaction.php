<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transaction extends Model
{
    protected $fillable = [
        'code'
    ];

    public function products(
    ): BelongsToMany
    {
        return $this->belongsToMany(Product::class,
            'transaction_details',
            'transaction_id',
            'product_id')
            ->withPivot('id', 'quantity');
    }
}
