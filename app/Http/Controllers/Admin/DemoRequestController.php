<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BulkDeleteDemoRequestsRequest;
use App\Http\Requests\Admin\BulkForceDeleteDemoRequestsRequest;
use App\Http\Requests\Admin\BulkRestoreDemoRequestsRequest;
use App\Http\Requests\Admin\BulkUpdateDemoRequestStatusRequest;
use App\Http\Requests\Admin\SendDemoRequestCredentialsRequest;
use App\Http\Requests\Admin\UpdateDemoRequestStatusRequest;
use App\Mail\DemoRequestCredentialsMail;
use App\Models\DemoRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 20, 50, 100], true)) {
            $perPage = 10;
        }

        $query = DemoRequest::query()
            ->with(['sentEmails' => fn ($q) => $q->latest()])
            ->latest();

        if ($request->string('trashed')->value() === 'only') {
            $query->onlyTrashed();
        }

        if ($status = $request->string('status')->value()) {
            $query->where('status', $status);
        }

        if ($from = $request->string('from')->value()) {
            $query->whereDate('created_at', '>=', $from);
        }

        if ($to = $request->string('to')->value()) {
            $query->whereDate('created_at', '<=', $to);
        }

        if ($search = $request->string('search')->value()) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return Inertia::render('admin/demo-requests/index', [
            'demoRequests' => $query->paginate($perPage)->withQueryString(),
            'filters' => $request->only(['status', 'from', 'to', 'search', 'per_page', 'trashed']),
            'counts' => [
                'all' => DemoRequest::query()->count(),
                'new' => DemoRequest::query()->where('status', DemoRequest::STATUS_NEW)->count(),
                'contacted' => DemoRequest::query()->where('status', DemoRequest::STATUS_CONTACTED)->count(),
                'converted' => DemoRequest::query()->where('status', DemoRequest::STATUS_CONVERTED)->count(),
                'closed' => DemoRequest::query()->where('status', DemoRequest::STATUS_CLOSED)->count(),
                'trashed' => DemoRequest::onlyTrashed()->count(),
            ],
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
     * Move a demo request to the trash.
     */
    public function destroy(DemoRequest $demoRequest): RedirectResponse
    {
        $demoRequest->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Demo request moved to trash.']);

        return back();
    }

    /**
     * Restore a trashed demo request.
     */
    public function restore(DemoRequest $demoRequest): RedirectResponse
    {
        $demoRequest->restore();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Demo request restored.']);

        return back();
    }

    /**
     * Permanently delete a trashed demo request.
     */
    public function forceDestroy(DemoRequest $demoRequest): RedirectResponse
    {
        $demoRequest->forceDelete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Demo request permanently deleted.']);

        return back();
    }

    /**
     * Update the status of multiple demo requests at once.
     */
    public function bulkUpdate(BulkUpdateDemoRequestStatusRequest $request): RedirectResponse
    {
        $count = DemoRequest::query()
            ->whereIn('id', $request->validated('ids'))
            ->update(['status' => $request->validated('status')]);

        Inertia::flash('toast', ['type' => 'success', 'message' => "Updated {$count} demo request(s)."]);

        return back();
    }

    /**
     * Email login credentials to the person who submitted this demo request.
     */
    public function sendEmail(SendDemoRequestCredentialsRequest $request, DemoRequest $demoRequest): RedirectResponse
    {
        Mail::to($demoRequest->email)->send(new DemoRequestCredentialsMail(
            demoRequestName: $demoRequest->name,
            url: $request->validated('url'),
            loginEmail: $request->validated('email'),
            password: $request->validated('password'),
        ));

        $demoRequest->sentEmails()->create([
            'url' => $request->validated('url'),
            'login_email' => $request->validated('email'),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => "Credentials emailed to {$demoRequest->email}."]);

        return back();
    }

    /**
     * Move multiple demo requests to the trash at once.
     */
    public function bulkDestroy(BulkDeleteDemoRequestsRequest $request): RedirectResponse
    {
        $count = DemoRequest::query()
            ->whereIn('id', $request->validated('ids'))
            ->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => "Moved {$count} demo request(s) to trash."]);

        return back();
    }

    /**
     * Restore multiple trashed demo requests at once.
     */
    public function bulkRestore(BulkRestoreDemoRequestsRequest $request): RedirectResponse
    {
        $count = DemoRequest::onlyTrashed()
            ->whereIn('id', $request->validated('ids'))
            ->restore();

        Inertia::flash('toast', ['type' => 'success', 'message' => "Restored {$count} demo request(s)."]);

        return back();
    }

    /**
     * Permanently delete multiple trashed demo requests at once.
     */
    public function bulkForceDestroy(BulkForceDeleteDemoRequestsRequest $request): RedirectResponse
    {
        $count = DemoRequest::onlyTrashed()
            ->whereIn('id', $request->validated('ids'))
            ->forceDelete();

        Inertia::flash('toast', ['type' => 'success', 'message' => "Permanently deleted {$count} demo request(s)."]);

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
