<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DemoRequestController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\SectionItemController;
use App\Http\Controllers\Admin\SiteSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware(['auth', 'verified', 'admin'])->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('sections', [SectionController::class, 'index'])->name('sections.index');
    Route::patch('sections/reorder', [SectionController::class, 'reorder'])->name('sections.reorder');
    Route::get('sections/{section}', [SectionController::class, 'edit'])->name('sections.edit');
    Route::patch('sections/{section}', [SectionController::class, 'update'])->name('sections.update');
    Route::patch('sections/{section}/toggle', [SectionController::class, 'toggle'])->name('sections.toggle');

    Route::post('sections/{section}/items', [SectionItemController::class, 'store'])->name('section-items.store');
    Route::patch('section-items/reorder', [SectionItemController::class, 'reorder'])->name('section-items.reorder');
    Route::patch('section-items/{sectionItem}', [SectionItemController::class, 'update'])->name('section-items.update');
    Route::delete('section-items/{sectionItem}', [SectionItemController::class, 'destroy'])->name('section-items.destroy');

    Route::get('demo-requests', [DemoRequestController::class, 'index'])->name('demo-requests.index');
    Route::get('demo-requests/export', [DemoRequestController::class, 'export'])->name('demo-requests.export');
    Route::get('demo-requests/{demoRequest}', [DemoRequestController::class, 'show'])->name('demo-requests.show');
    Route::patch('demo-requests/{demoRequest}', [DemoRequestController::class, 'update'])->name('demo-requests.update');

    Route::get('site-settings', [SiteSettingController::class, 'edit'])->name('site-settings.edit');
    Route::patch('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');
});
