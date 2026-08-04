<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderSectionsRequest;
use App\Http\Requests\Admin\UpdateSectionRequest;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SectionController extends Controller
{
    /**
     * List all sections for the reorder/enable manager.
     */
    public function index(): Response
    {
        return Inertia::render('admin/sections/index', [
            'sections' => Section::ordered()->withCount('items')->get(),
        ]);
    }

    /**
     * Show a section's edit form, with its items.
     */
    public function edit(Section $section): Response
    {
        return Inertia::render('admin/sections/edit', [
            'section' => $section,
            'items' => $section->items()->get(),
        ]);
    }

    /**
     * Update a section's title/subtitle/body/content.
     */
    public function update(UpdateSectionRequest $request, Section $section): RedirectResponse
    {
        $section->fill($request->validated())->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Section updated.']);

        return to_route('admin.sections.edit', $section);
    }

    /**
     * Toggle a section's enabled state from the sections list.
     */
    public function toggle(Section $section): RedirectResponse
    {
        $section->update(['is_enabled' => ! $section->is_enabled]);

        return to_route('admin.sections.index');
    }

    /**
     * Persist a new section display order.
     */
    public function reorder(ReorderSectionsRequest $request): RedirectResponse
    {
        foreach ($request->validated('orderedIds') as $sortOrder => $id) {
            Section::whereKey($id)->update(['sort_order' => $sortOrder]);
        }

        return to_route('admin.sections.index');
    }
}
