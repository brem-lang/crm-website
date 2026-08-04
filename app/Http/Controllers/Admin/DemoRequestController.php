<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateDemoRequestStatusRequest;
use App\Models\DemoRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DemoRequestController extends Controller
{
    /**
     * List demo requests, filterable by status and date.
     */
    public function index(Request $request): Response
    {
        $query = DemoRequest::query()->latest();

        if ($status = $request->string('status')->value()) {
            $query->where('status', $status);
        }

        if ($from = $request->string('from')->value()) {
            $query->whereDate('created_at', '>=', $from);
        }

        if ($to = $request->string('to')->value()) {
            $query->whereDate('created_at', '<=', $to);
        }

        return Inertia::render('admin/demo-requests/index', [
            'demoRequests' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only(['status', 'from', 'to']),
        ]);
    }

    /**
     * Show a single demo request.
     */
    public function show(DemoRequest $demoRequest): Response
    {
        return Inertia::render('admin/demo-requests/show', [
            'demoRequest' => $demoRequest,
        ]);
    }

    /**
     * Update a demo request's status.
     */
    public function update(UpdateDemoRequestStatusRequest $request, DemoRequest $demoRequest): RedirectResponse
    {
        $demoRequest->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Status updated.']);

        return back();
    }

    /**
     * Export all demo requests as a CSV file.
     */
    public function export(): StreamedResponse
    {
        $columns = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Country', 'Business Type', 'Status', 'Message', 'Submitted At'];

        return response()->streamDownload(function () use ($columns) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $columns);

            DemoRequest::query()->orderBy('id')->each(function (DemoRequest $demoRequest) use ($handle) {
                fputcsv($handle, [
                    $demoRequest->id,
                    $demoRequest->name,
                    $demoRequest->company,
                    $demoRequest->email,
                    $demoRequest->phone,
                    $demoRequest->country,
                    $demoRequest->business_type,
                    $demoRequest->status,
                    $demoRequest->message,
                    $demoRequest->created_at?->toDateTimeString(),
                ]);
            });

            fclose($handle);
        }, 'demo-requests.csv', ['Content-Type' => 'text/csv']);
    }
}
