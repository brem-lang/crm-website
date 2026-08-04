<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DemoRequest;
use App\Models\Section;
use App\Models\Visitor;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Allowed values for the trend chart date range, in days.
     *
     * @var array<int, int>
     */
    private const RANGE_OPTIONS = [7, 30, 90];

    /**
     * Show the admin dashboard overview.
     */
    public function index(Request $request): Response
    {
        $range = $request->integer('range', 30);

        if (! in_array($range, self::RANGE_OPTIONS, true)) {
            $range = 30;
        }

        $start = today()->subDays($range - 1);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalDemoRequests' => DemoRequest::count(),
                'newThisWeek' => DemoRequest::where('created_at', '>=', now()->subWeek())->count(),
                'sectionsEnabled' => Section::enabled()->count(),
                'sectionsTotal' => Section::count(),
            ],
            'range' => $range,
            'demoRequestsTrend' => $this->dailyTrend(DemoRequest::query(), $start),
            'visitorsTrend' => $this->dailyTrend(Visitor::query()->where('is_bot', false), $start),
            'demoRequestsByStatus' => [
                'new' => DemoRequest::where('status', DemoRequest::STATUS_NEW)->count(),
                'contacted' => DemoRequest::where('status', DemoRequest::STATUS_CONTACTED)->count(),
                'converted' => DemoRequest::where('status', DemoRequest::STATUS_CONVERTED)->count(),
                'closed' => DemoRequest::where('status', DemoRequest::STATUS_CLOSED)->count(),
            ],
            'visitorsByDevice' => [
                'desktop' => Visitor::where('device_type', Visitor::DEVICE_DESKTOP)->count(),
                'mobile' => Visitor::where('device_type', Visitor::DEVICE_MOBILE)->count(),
                'tablet' => Visitor::where('device_type', Visitor::DEVICE_TABLET)->count(),
                'bot' => Visitor::where('device_type', Visitor::DEVICE_BOT)->count(),
            ],
        ]);
    }

    /**
     * Build a zero-filled daily count series from $start through today.
     *
     * @return array<int, array{date: string, count: int}>
     */
    private function dailyTrend(Builder $query, CarbonInterface $start): array
    {
        $counts = $query->where('created_at', '>=', $start)
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as aggregate'))
            ->groupBy('date')
            ->pluck('aggregate', 'date');

        $days = [];
        $cursor = $start;
        $end = today();

        while ($cursor->lte($end)) {
            $key = $cursor->toDateString();
            $days[] = ['date' => $key, 'count' => (int) ($counts[$key] ?? 0)];
            $cursor = $cursor->addDay();
        }

        return $days;
    }
}
