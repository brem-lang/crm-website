<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Seed the 7 landing page sections and their sample items.
     */
    public function run(): void
    {
        foreach (array_values($this->sections()) as $sortOrder => $definition) {
            $items = $definition['items'] ?? [];
            unset($definition['items']);

            $section = Section::create([
                ...$definition,
                'sort_order' => $sortOrder,
            ]);

            foreach ($items as $itemSortOrder => $item) {
                $section->items()->create([
                    ...$item,
                    'sort_order' => $itemSortOrder,
                ]);
            }
        }
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private function sections(): array
    {
        return [
            'hero' => [
                'key' => 'hero',
                'title' => 'The All-in-One CRM Built for Forex, Crypto & Sales Teams',
                'subtitle' => 'Manage leads, close deals, and scale your sales operation — purpose-built for Forex/CFD brokers, crypto companies, call centers, lead generation companies, and sales teams.',
                'content' => [
                    'primary_button_text' => 'Book a Demo',
                    'primary_button_url' => '#demo',
                    'secondary_button_text' => 'Explore the CRM',
                    'secondary_button_url' => '#product-showcase',
                ],
            ],

            'why_us' => [
                'key' => 'why_us',
                'title' => 'Why AlphaMasterCRM',
                'subtitle' => 'Everything you need to run a high-performance sales operation, in one platform.',
                'content' => [],
                'items' => [
                    ['title' => 'Smart Lead Management', 'icon' => 'users', 'description' => 'Capture, score, and route leads automatically so your team always works the hottest opportunities first.'],
                    ['title' => 'Integrated Call Center', 'icon' => 'phone', 'description' => 'Dial, log, and track every call from inside the CRM — no separate systems to juggle.'],
                    ['title' => 'Sales Pipeline Tracking', 'icon' => 'trending-up', 'description' => 'Visualize every deal stage and know exactly where revenue is coming from next.'],
                    ['title' => 'Real-Time Reporting', 'icon' => 'bar-chart-3', 'description' => 'Track performance across agents, teams, and campaigns with dashboards built for sales leaders.'],
                    ['title' => 'Compliance-Ready', 'icon' => 'shield-check', 'description' => 'Built with the recordkeeping and audit trails that regulated brokers and financial teams need.'],
                    ['title' => 'Workflow Automation', 'icon' => 'zap', 'description' => 'Automate follow-ups, assignments, and routine tasks so nothing falls through the cracks.'],
                ],
            ],

            'product_showcase' => [
                'key' => 'product_showcase',
                'title' => 'See AlphaMasterCRM in Action',
                'subtitle' => 'A visual tour of the platform your team will actually want to use.',
                'content' => [],
                'items' => [
                    ['title' => 'Dashboard', 'description' => 'A live view of your team\'s performance.'],
                    ['title' => 'Lead Management', 'description' => 'Every lead, organized and actionable.'],
                    ['title' => 'Customer Profile', 'description' => 'The full customer story in one place.'],
                    ['title' => 'Sales Pipeline', 'description' => 'Deals, visualized stage by stage.'],
                    ['title' => 'Reports', 'description' => 'Performance insights at a glance.'],
                    ['title' => 'Call Center', 'description' => 'Every call, logged and connected.'],
                    ['title' => 'Automation', 'description' => 'Routine work, handled automatically.'],
                    ['title' => 'Team Performance', 'description' => 'See how every agent is performing.'],
                ],
            ],

            'industries' => [
                'key' => 'industries',
                'title' => 'Built for Your Industry',
                'subtitle' => 'Purpose-built workflows for the industries that need them most.',
                'content' => [],
                'items' => [
                    ['title' => 'Forex & CFD', 'description' => 'Manage traders and accounts with the compliance and precision this industry demands.'],
                    ['title' => 'Crypto', 'description' => 'Onboard and support crypto clients with fast, flexible lead workflows.'],
                    ['title' => 'Call Centers', 'description' => 'Give every agent the tools to dial, log, and convert more efficiently.'],
                    ['title' => 'Lead Generation', 'description' => 'Capture and distribute leads the moment they come in.'],
                    ['title' => 'Sales Organizations', 'description' => 'Give every rep a clear pipeline and every manager clear visibility.'],
                ],
            ],

            'powerful_management' => [
                'key' => 'powerful_management',
                'title' => 'Powerful Management, Effortless Oversight',
                'subtitle' => 'See exactly how your business is performing, in real time.',
                'body' => 'Get a live pulse on leads, conversions, and agent performance without pulling a single report by hand.',
                'content' => [],
                'items' => [
                    ['title' => "Today's Leads", 'meta' => ['value' => '248']],
                    ['title' => 'Conversions', 'meta' => ['value' => '37']],
                    ['title' => 'Conversion Rate', 'meta' => ['value' => '14.9%']],
                    ['title' => 'Active Agents', 'meta' => ['value' => '32']],
                    ['title' => 'Sales', 'meta' => ['value' => '$182,400']],
                    ['title' => 'Top Campaigns', 'meta' => ['value' => '5']],
                ],
            ],

            'ai_automation' => [
                'key' => 'ai_automation',
                'title' => 'AI & Automation',
                'subtitle' => 'Let AI handle the busywork so your team can focus on selling.',
                'content' => [],
                'items' => [
                    ['title' => 'AI Customer Summaries', 'icon' => 'sparkles', 'description' => 'Instantly summarize a customer\'s history so agents can pick up any conversation with context.'],
                    ['title' => 'AI Content Assistance', 'icon' => 'pen-line', 'description' => 'Draft outreach messages and follow-ups faster with AI-assisted writing.'],
                    ['title' => 'Smart Lead Distribution', 'icon' => 'shuffle', 'description' => 'Automatically route new leads to the right agent based on your rules.'],
                    ['title' => 'Automated Follow-Ups', 'icon' => 'refresh-cw', 'description' => 'Keep leads warm with scheduled, automated follow-up sequences.'],
                    ['title' => 'Workflow Automation', 'icon' => 'workflow', 'description' => 'Automate repetitive steps across your sales process, from assignment to status updates.'],
                    ['title' => 'Management Insights', 'icon' => 'line-chart', 'description' => 'Surface the trends and patterns that matter most to sales leadership.'],
                ],
            ],

            'final_cta' => [
                'key' => 'final_cta',
                'title' => 'Ready to Transform Your Sales Operation?',
                'subtitle' => 'Book a personalized demo and see how AlphaMasterCRM can power your team.',
                'content' => [
                    'submit_button_text' => 'Request My Demo',
                ],
            ],
        ];
    }
}
