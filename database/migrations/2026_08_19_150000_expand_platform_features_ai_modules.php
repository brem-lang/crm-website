<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Expands 'platform_features'' condensed "AI-Assisted Selling" card back
     * into the 6 distinct AI/automation modules task.md asked for, updating
     * "Workflow Automation"'s description to match and deleting the
     * now-superseded "AI-Assisted Selling" item.
     */
    public function up(): void
    {
        $section = Section::where('key', 'platform_features')->first();

        if (! $section) {
            return;
        }

        // sort_order continues after the section's existing 5 unrelated
        // compact cards (0-4); the 2 featured cards already sit at 7-8.
        foreach ($this->items() as $index => $item) {
            $section->items()->updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'sort_order' => 5 + $index],
            );
        }

        $section->items()->where('title', 'AI-Assisted Selling')->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function items(): array
    {
        return [
            ['title' => 'AI Customer Summaries', 'icon' => 'sparkles', 'description' => 'Summarizes customer history to help agents maintain conversation context.'],
            ['title' => 'AI Content Assistance', 'icon' => 'pen-line', 'description' => 'AI assistance to quickly write follow-up messages.'],
            ['title' => 'Smart Lead Distribution', 'icon' => 'shuffle', 'description' => 'Automatically assigns new leads to the appropriate agents based on predefined rules.'],
            ['title' => 'Automated Follow-Ups', 'icon' => 'refresh-cw', 'description' => 'Scheduled auto-follow-ups to keep leads warm.'],
            ['title' => 'Workflow Automation', 'icon' => 'workflow', 'description' => 'Automates all sales process steps, from assignment to status updates.'],
            ['title' => 'Management Insights', 'icon' => 'line-chart', 'description' => 'Presents important trends and patterns for sales management.'],
        ];
    }
};
