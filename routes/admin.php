<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DemoRequestController;
use App\Http\Controllers\Admin\SectionController;
use App\Http\Controllers\Admin\SectionItemController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\VisitorController;
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
    Route::patch('demo-requests/bulk', [DemoRequestController::class, 'bulkUpdate'])->name('demo-requests.bulk-update');
    Route::delete('demo-requests/bulk', [DemoRequestController::class, 'bulkDestroy'])->name('demo-requests.bulk-destroy');
    Route::post('demo-requests/restore/bulk', [DemoRequestController::class, 'bulkRestore'])->name('demo-requests.bulk-restore');
    Route::delete('demo-requests/force/bulk', [DemoRequestController::class, 'bulkForceDestroy'])->name('demo-requests.bulk-force-destroy');
    Route::get('demo-requests/{demoRequest}', [DemoRequestController::class, 'show'])->name('demo-requests.show');
    Route::patch('demo-requests/{demoRequest}', [DemoRequestController::class, 'update'])->name('demo-requests.update');
    Route::delete('demo-requests/{demoRequest}', [DemoRequestController::class, 'destroy'])->name('demo-requests.destroy');
    Route::post('demo-requests/{demoRequest}/send-email', [DemoRequestController::class, 'sendEmail'])->name('demo-requests.send-email');
    Route::post('demo-requests/{demoRequest}/restore', [DemoRequestController::class, 'restore'])->name('demo-requests.restore')->withTrashed();
    Route::delete('demo-requests/{demoRequest}/force', [DemoRequestController::class, 'forceDestroy'])->name('demo-requests.force-destroy')->withTrashed();

    Route::get('site-settings', [SiteSettingController::class, 'edit'])->name('site-settings.edit');
    Route::patch('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');

    Route::get('visitors', [VisitorController::class, 'index'])->name('visitors.index');
    Route::get('visitors/export', [VisitorController::class, 'export'])->name('visitors.export');
    Route::delete('visitors/bulk', [VisitorController::class, 'bulkDestroy'])->name('visitors.bulk-destroy');
    Route::delete('visitors/{visitor}', [VisitorController::class, 'destroy'])->name('visitors.destroy');
});
