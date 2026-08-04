<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReorderSectionItemsRequest;
use App\Http\Requests\Admin\StoreSectionItemRequest;
use App\Http\Requests\Admin\UpdateSectionItemRequest;
use App\Models\Section;
use App\Models\SectionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SectionItemController extends Controller
{
    /**
     * Add a new item to a section.
     */
    public function store(StoreSectionItemRequest $request, Section $section): RedirectResponse
    {
        $data = $request->safe()->except('image');

        $section->items()->create([
            ...$data,
            'image_path' => $this->storeImage($request),
            'sort_order' => $section->items()->max('sort_order') + 1,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Item added.']);

        return to_route('admin.sections.edit', $section);
    }

    /**
     * Update an existing section item.
     */
    public function update(UpdateSectionItemRequest $request, SectionItem $sectionItem): RedirectResponse
    {
        $data = $request->safe()->except('image');

        if ($newImagePath = $this->storeImage($request)) {
            if ($sectionItem->image_path) {
                Storage::disk('public')->delete($sectionItem->image_path);
            }

            $data['image_path'] = $newImagePath;
        }

        $sectionItem->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Item updated.']);

        return to_route('admin.sections.edit', $sectionItem->section_id);
    }

    /**
     * Delete a section item.
     */
    public function destroy(SectionItem $sectionItem): RedirectResponse
    {
        if ($sectionItem->image_path) {
            Storage::disk('public')->delete($sectionItem->image_path);
        }

        $sectionId = $sectionItem->section_id;

        $sectionItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Item deleted.']);

        return to_route('admin.sections.edit', $sectionId);
    }

    /**
     * Persist a new item display order within a section.
     */
    public function reorder(ReorderSectionItemsRequest $request): RedirectResponse
    {
        $orderedIds = $request->validated('orderedIds');

        foreach ($orderedIds as $sortOrder => $id) {
            SectionItem::whereKey($id)->update(['sort_order' => $sortOrder]);
        }

        $sectionId = SectionItem::whereKey($orderedIds[0] ?? null)->value('section_id');

        return to_route('admin.sections.edit', $sectionId);
    }

    /**
     * Store the uploaded image, if one was provided, and return its path.
     */
    private function storeImage(StoreSectionItemRequest|UpdateSectionItemRequest $request): ?string
    {
        if (! $request->hasFile('image')) {
            return null;
        }

        return $request->file('image')->store('section-items', 'public');
    }
}
