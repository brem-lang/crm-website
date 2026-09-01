<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Render the public landing page from the enabled, ordered sections.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('welcome', [
            'sections' => Section::enabled()->ordered()
                ->with(['items' => fn ($query) => $query->enabled()])
                ->get(),
            'settings' => SiteSetting::current(),
            'demoRequestSubmitted' => $request->session()->get('demoRequestSubmitted', false),
        ]);
    }

    /**
     * Render the public API documentation page.
     */
    public function apiDocs(): Response
    {
        return Inertia::render('api-docs', [
            'settings' => SiteSetting::current(),
        ]);
    }

    /**
     * Render the privacy policy page.
     */
    public function privacy(): Response
    {
        return Inertia::render('privacy', [
            'settings' => SiteSetting::current(),
        ]);
    }

    /**
     * Render the terms of service page.
     */
    public function terms(): Response
    {
        return Inertia::render('terms', [
            'settings' => SiteSetting::current(),
        ]);
    }
}
