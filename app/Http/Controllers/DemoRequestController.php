<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDemoRequestRequest;
use App\Models\DemoRequest;
use Illuminate\Http\RedirectResponse;

class DemoRequestController extends Controller
{
    /**
     * Store a new demo request submitted from the public site.
     */
    public function store(StoreDemoRequestRequest $request): RedirectResponse
    {
        DemoRequest::create($request->validated());

        return back()->with('demoRequestSubmitted', true);
    }
}
