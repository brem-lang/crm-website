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
}
