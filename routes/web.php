<?php

use App\Http\Controllers\DemoRequestController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])
    ->middleware('track-visitor')
    ->name('home');
Route::post('demo-requests', [DemoRequestController::class, 'store'])
    ->middleware('throttle:demo-requests')
    ->name('demo-requests.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        if ($request->user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
