<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds an eyebrow badge to the hero's content and four stat items
     * (rendered as a borderless stat strip beneath the hero mockup),
     * matching the reference design's hero pattern.
     */
    public function up(): void
    {
        $section = Section::where('key', 'hero')->first();

        if (! $section) {
            return;
        }

        $section->update([
            'content' => [...($section->content ?? []), 'eyebrow_text' => 'v1.0 · Now available'],
        ]);

        foreach ($this->items() as $sortOrder => $item) {
            $section->items()->updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'sort_order' => $sortOrder],
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $section = Section::where('key', 'hero')->first();

        if (! $section) {
            return;
        }

        $section->items()->whereIn('title', array_column($this->items(), 'title'))->delete();

        $content = $section->content ?? [];
        unset($content['eyebrow_text']);
        $section->update(['content' => $content]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function items(): array
    {
        return [
            ['title' => 'Live dashboard refresh', 'meta' => ['value' => '<300ms']],
            ['title' => 'CRM & CPA integrations', 'meta' => ['value' => '15+']],
            ['title' => 'Uptime SLA', 'meta' => ['value' => '99.9%']],
            ['title' => 'Support', 'meta' => ['value' => '24/7']],
        ];
    }
};
