<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Reshapes the 'lead_pipeline' section's dense step descriptions into a
     * short summary + bullet-point highlights (matching the shape already
     * used by 'platform_features'' Advertisers/Affiliates items), so the
     * homepage pipeline section reads as scannable bullets instead of
     * one dense paragraph per step.
     */
    public function up(): void
    {
        $section = Section::where('key', 'lead_pipeline')->first();

        if (! $section) {
            return;
        }

        foreach ($this->items() as $sortOrder => $item) {
            $section->items()->updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'sort_order' => $sortOrder],
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * Irreversible by design: restores the section but not the exact prior
     * copy. Re-run the seeder manually if a full rollback is needed.
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
            [
                'title' => 'Intake',
                'icon' => 'inbox',
                'description' => 'Incoming leads are validated automatically before they ever touch your pipeline.',
                'meta' => [
                    'highlight_1' => 'Every lead is validated on arrival',
                    'highlight_2' => 'Anything that fails validation is rejected and logged',
                    'highlight_3' => 'Only clean leads get an initial status',
                ],
            ],
            [
                'title' => 'Distribution',
                'icon' => 'shuffle',
                'description' => 'Rule-based routing sends each lead to the right advertiser automatically.',
                'meta' => [
                    'highlight_1' => 'Matches leads to eligible advertisers by rule',
                    'highlight_2' => 'Respects daily/hourly caps and active schedules',
                    'highlight_3' => "Delivers in that advertiser's exact API format",
                ],
            ],
            [
                'title' => 'Callback & Status Sync',
                'icon' => 'refresh-cw',
                'description' => "Advertisers report back, and updates are verified before they're applied.",
                'meta' => [
                    'highlight_1' => 'Verifies the update against what was actually sent',
                    'highlight_2' => 'Maps advertiser status strings to your internal statuses',
                    'highlight_3' => 'Tracks first-time-depositor (FTD) events automatically',
                ],
            ],
            [
                'title' => 'Polling Fallback',
                'icon' => 'radar',
                'description' => "For advertisers that can't push updates, we go get them.",
                'meta' => [
                    'highlight_1' => 'Scheduled polling checks status on a timer',
                    'highlight_2' => 'Covers advertisers without callback support',
                    'highlight_3' => 'Keeps pipeline data current without manual checks',
                ],
            ],
            [
                'title' => 'Supporting Automation',
                'icon' => 'workflow',
                'description' => 'A layer of automation keeps everything else running smoothly.',
                'meta' => [
                    'highlight_1' => 'Automated lead scoring',
                    'highlight_2' => 'Retry/backoff queue processing',
                    'highlight_3' => 'Batch injections with pre-send validation',
                    'highlight_4' => 'Risk-free test sends',
                ],
            ],
        ];
    }
};
