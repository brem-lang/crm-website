<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds three new homepage sections — 'roi_calculator', 'pricing', and
     * 'faq' — landing-page patterns adapted from a competitor's marketing
     * site. Seeded with a high sort_order so they render after everything
     * else without needing to know this environment's existing (possibly
     * gapped) sort_order values; reorder them from /admin/sections.
     */
    public function up(): void
    {
        $this->upsert('roi_calculator', [
            'title' => 'See What Better Lead Management Is Worth',
            'subtitle' => 'Plug in your numbers and see the revenue a higher close rate puts back in your pipeline.',
            'content' => [],
            'sort_order' => 100,
        ], []);

        $this->upsert('pricing', [
            'title' => 'Simple, Transparent Pricing',
            'subtitle' => 'Pick the plan that fits your team. Every plan includes onboarding and support.',
            'content' => [],
            'sort_order' => 101,
        ], [
            [
                'title' => 'Starter',
                'description' => 'For small teams getting their pipeline off spreadsheets.',
                'meta' => [
                    'value' => '$99/mo',
                    'highlight_1' => 'Up to 5 agent seats',
                    'highlight_2' => 'Lead management & sales pipeline',
                    'highlight_3' => 'Email support',
                ],
            ],
            [
                'title' => 'Growth',
                'description' => 'For teams scaling lead volume across channels.',
                'meta' => [
                    'value' => '$299/mo',
                    'highlighted' => 'true',
                    'highlight_1' => 'Up to 25 agent seats',
                    'highlight_2' => 'Smart distribution & automation',
                    'highlight_3' => 'Real-time reporting & dashboards',
                    'highlight_4' => 'Priority support',
                ],
            ],
            [
                'title' => 'Enterprise',
                'description' => 'For larger operations with compliance and custom needs.',
                'meta' => [
                    'value' => 'Custom',
                    'highlight_1' => 'Unlimited agent seats',
                    'highlight_2' => 'Roles, compliance & audit trails',
                    'highlight_3' => 'Dedicated account manager',
                ],
            ],
        ]);

        $this->upsert('faq', [
            'title' => 'Frequently Asked Questions',
            'subtitle' => 'Everything you need to know before booking a demo.',
            'content' => [],
            'sort_order' => 102,
        ], [
            [
                'title' => 'How long does onboarding take?',
                'description' => 'Most teams are fully set up within a week, including data migration from your existing spreadsheets or CRM.',
            ],
            [
                'title' => 'Can I migrate from another CRM?',
                'description' => 'Yes — our onboarding team handles the migration of your leads, contacts, and pipeline history for you.',
            ],
            [
                'title' => 'Is my data secure?',
                'description' => 'Data is encrypted in transit and at rest, with role-based access control and full audit trails for every action.',
            ],
            [
                'title' => 'Do you offer a trial?',
                'description' => "Yes — book a demo and we'll set you up with a trial environment using your own sample data.",
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Section::whereIn('key', ['roi_calculator', 'pricing', 'faq'])->delete();
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @param  array<int, array<string, mixed>>  $items
     */
    private function upsert(string $key, array $attributes, array $items): void
    {
        $section = Section::updateOrCreate(['key' => $key], $attributes);

        foreach ($items as $sortOrder => $item) {
            $section->items()->updateOrCreate(
                ['title' => $item['title']],
                [...$item, 'sort_order' => $sortOrder],
            );
        }
    }
};
