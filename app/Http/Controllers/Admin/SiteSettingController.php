<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    /**
     * Show the site settings form.
     */
    public function edit(): Response
    {
        return Inertia::render('admin/site-settings/edit', [
            'settings' => SiteSetting::current(),
        ]);
    }

    /**
     * Update the site settings.
     */
    public function update(UpdateSiteSettingRequest $request): RedirectResponse
    {
        $settings = SiteSetting::current();
        $data = $request->safe()->except(['logo', 'favicon']);

        if ($request->hasFile('logo')) {
            if ($settings->logo_path) {
                Storage::disk('public')->delete($settings->logo_path);
            }

            $data['logo_path'] = $request->file('logo')->store('branding', 'public');
        }

        if ($request->hasFile('favicon')) {
            if ($settings->favicon_path) {
                Storage::disk('public')->delete($settings->favicon_path);
            }

            $data['favicon_path'] = $request->file('favicon')->store('branding', 'public');
        }

        $settings->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Settings updated.']);

        return to_route('admin.site-settings.edit');
    }
}
