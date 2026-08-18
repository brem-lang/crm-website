<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Consolidates the previously separate 'why_us', 'ai_automation',
     * 'platform_capabilities', and 'platform_modules' homepage sections
     * into a single, curated 'platform_features' section.
     */
    public function up(): void
    {
        $section = Section::updateOrCreate(
            ['key' => 'platform_features'],
            [
                'title' => 'Everything Your Operation Needs',
                'subtitle' => 'One platform for lead intake, distribution, sales, and reporting — plus the AI and automation to keep it running itself.',
                'content' => [],
                'is_enabled' => true,
                'sort_order' => 1,
            ],
        );

        foreach ($this->items() as $sortOrder => $item) {
            $section->items()->updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'sort_order' => $sortOrder],
            );
        }

        Section::whereIn('key', [
            'why_us',
            'ai_automation',
            'platform_capabilities',
            'platform_modules',
        ])->delete();
        // section_items rows for these sections cascade-delete via the
        // section_items.section_id -> cascadeOnDelete() foreign key.
    }

    /**
     * Reverse the migrations.
     *
     * Irreversible by design: the original 4 sections' admin-edited content
     * (if any) isn't preserved here. Re-run the seeder manually if a full
     * rollback is needed.
     */
    public function down(): void
    {
        Section::where('key', 'platform_features')->delete();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function items(): array
    {
        return [
            ['title' => 'Smart Lead Management', 'icon' => 'users', 'description' => 'Capture, score, and route leads automatically so your team always works the hottest opportunities first.'],
            ['title' => 'Integrated Call Center', 'icon' => 'phone', 'description' => 'Dial, log, and track every call from inside the CRM — no separate systems to juggle.'],
            ['title' => 'Sales Pipeline Tracking', 'icon' => 'trending-up', 'description' => 'Visualize every deal stage and know exactly where revenue is coming from next.'],
            ['title' => 'Real-Time Reporting & Dashboards', 'icon' => 'bar-chart-3', 'description' => 'Advertiser, affiliate, country, and conversion performance — tracked live in dashboards built for sales leaders.'],
            ['title' => 'Roles, Compliance & Access Control', 'icon' => 'shield-check', 'description' => 'Granular role-based permissions plus the audit trails and recordkeeping regulated brokers and financial teams need.'],
            ['title' => 'Workflow Automation', 'icon' => 'workflow', 'description' => 'Automate follow-ups, lead assignment, and status updates — including retry/backoff queues and scheduled sequences — so nothing falls through the cracks.'],
            ['title' => 'AI-Assisted Selling', 'icon' => 'sparkles', 'description' => 'AI-generated customer summaries, drafted outreach, and surfaced trends — so agents and managers spend less time digging and more time selling.'],
            [
                'title' => 'Advertisers',
                'icon' => 'handshake',
                'description' => 'The buyers and partners your leads are sent to. Each advertiser gets its own integration type, API credentials, and request/response format — with caps, scheduling, and conversion tracking built in.',
                'meta' => [
                    'highlight_1' => 'Daily & hourly caps with weekly active-window scheduling',
                    'highlight_2' => 'Per-advertiser API request/response formatting',
                    'highlight_3' => 'Linked conversion tracking and hourly performance reporting',
                ],
            ],
            [
                'title' => 'Affiliates',
                'icon' => 'megaphone',
                'description' => 'The sources your leads come from. Affiliates submit leads through authenticated public intake endpoints, with per-affiliate rules and full visibility into what gets accepted or rejected.',
                'meta' => [
                    'highlight_1' => 'API-key authenticated lead intake endpoints',
                    'highlight_2' => 'Per-affiliate rules for eligible advertisers, countries, and offers',
                    'highlight_3' => 'Submission failure logs and affiliate performance reporting',
                ],
            ],
        ];
    }
};
