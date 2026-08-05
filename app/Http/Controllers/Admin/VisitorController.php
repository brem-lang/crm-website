<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDeleteVisitorsRequest;
use App\Models\Visitor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class VisitorController extends Controller
{
    /**
     * List recorded visits, filterable by device type, country, and date.
     */
    public function index(Request $request): Response
    {
        $hideBots = $request->boolean('hideBots', true);
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 20, 50, 100], true)) {
            $perPage = 10;
        }

        $query = Visitor::query()->latest();

        if ($hideBots) {
            $query->where('is_bot', false);
        }

        if ($deviceType = $request->string('device_type')->value()) {
            $query->where('device_type', $deviceType);
        }

        if ($country = $request->string('country')->value()) {
            $query->where('country', $country);
        }

        if ($from = $request->string('from')->value()) {
            $query->whereDate('created_at', '>=', $from);
        }

        if ($to = $request->string('to')->value()) {
            $query->whereDate('created_at', '<=', $to);
        }

        return Inertia::render('admin/visitors/index', [
            'visitors' => $query->paginate($perPage)->withQueryString(),
            'filters' => [
                ...$request->only(['device_type', 'country', 'from', 'to', 'per_page']),
                'hideBots' => $hideBots,
            ],
            'counts' => [
                'total' => Visitor::query()->count(),
                'today' => Visitor::query()->whereDate('created_at', today())->count(),
                'uniqueIpsToday' => Visitor::query()->whereDate('created_at', today())
                    ->distinct('ip_address')->count('ip_address'),
                'bots' => Visitor::query()->where('is_bot', true)->count(),
            ],
        ]);
    }

    /**
     * Delete a single visit record.
     */
    public function destroy(Visitor $visitor): RedirectResponse
    {
        $visitor->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Visit record deleted.']);

        return back();
    }

    /**
     * Delete multiple visit records at once.
     */
    public function bulkDestroy(BulkDeleteVisitorsRequest $request): RedirectResponse
    {
        $count = Visitor::query()
            ->whereIn('id', $request->validated('ids'))
            ->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => "Deleted {$count} visit record(s)."]);

        return back();
    }

    /**
     * Export all visit records as a CSV file.
     */
    public function export(): StreamedResponse
    {
        $columns = ['ID', 'IP Address', 'URL', 'Country', 'City', 'Browser', 'Browser Version', 'OS', 'OS Version', 'Device Type', 'Is Bot', 'Referrer', 'Visited At'];

        return response()->streamDownload(function () use ($columns) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $columns);

            Visitor::query()->orderBy('id')->each(function (Visitor $visitor) use ($handle) {
                fputcsv($handle, [
                    $visitor->id,
                    $visitor->ip_address,
                    $visitor->url,
                    $visitor->country,
                    $visitor->city,
                    $visitor->browser,
                    $visitor->browser_version,
                    $visitor->os,
                    $visitor->os_version,
                    $visitor->device_type,
                    $visitor->is_bot ? 'Yes' : 'No',
                    $visitor->referrer,
                    $visitor->created_at?->toDateTimeString(),
                ]);
            });

            fclose($handle);
        }, 'visitors.csv', ['Content-Type' => 'text/csv']);
    }
}
