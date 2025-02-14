<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::get('about', Controllers\AboutController::class)->name('about');
Route::get('crawl-kurs', Controllers\ExchangeRateController::class)->name('crawl-kurs');

Route::get('dashboard', Controllers\DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test-broadcast', function () {
    event(new App\Events\TestEvent('Halo dari Laravel Reverb!'));
    return 'Event telah dikirim!';
});

Route::middleware('auth')->group(function () {
    Route::get('profile', [Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('scores', Controllers\ScoreController::class);
    Route::resource('products', Controllers\ProductController::class);
    Route::resource('transactions', Controllers\TransactionController::class);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/dev.php';
