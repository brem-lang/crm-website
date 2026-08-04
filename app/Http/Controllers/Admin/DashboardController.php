<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DemoRequest;
use App\Models\Section;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the admin dashboard overview.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalDemoRequests' => DemoRequest::count(),
                'newThisWeek' => DemoRequest::where('created_at', '>=', now()->subWeek())->count(),
                'sectionsEnabled' => Section::enabled()->count(),
                'sectionsTotal' => Section::count(),
            ],
        ]);
    }
}
