<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Seed the landing page sections and their sample items.
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

            'platform_modules' => [
                'key' => 'platform_modules',
                'title' => 'Advertisers & Affiliates, Fully Managed',
                'subtitle' => 'Purpose-built modules for both sides of your lead flow — who leads come from, and who they go to.',
                'content' => [],
                'items' => [
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
                ],
            ],

            'lead_pipeline' => [
                'key' => 'lead_pipeline',
                'title' => 'A Lead Status Pipeline That Runs Itself',
                'subtitle' => 'From the moment a lead comes in to the moment it converts, every stage is automated and tracked.',
                'content' => [],
                'items' => [
                    [
                        'title' => 'Intake',
                        'icon' => 'inbox',
                        'description' => 'Incoming leads are validated and inserted with an initial status — anything that fails validation is rejected and logged instead of polluting your pipeline.',
                    ],
                    [
                        'title' => 'Distribution',
                        'icon' => 'shuffle',
                        'description' => 'Rule-based routing picks an eligible advertiser based on caps and active schedule, then pushes the lead in that advertiser\'s exact API format.',
                    ],
                    [
                        'title' => 'Callback & Status Sync',
                        'icon' => 'refresh-cw',
                        'description' => 'Advertisers report back what happened. Updates are verified against what was actually sent before being applied, then mapped to your internal statuses — including first-time-depositor tracking.',
                    ],
                    [
                        'title' => 'Polling Fallback',
                        'icon' => 'radar',
                        'description' => 'For advertisers that don\'t support callbacks, scheduled polling actively checks for status changes instead of waiting on a push.',
                    ],
                    [
                        'title' => 'Supporting Automation',
                        'icon' => 'workflow',
                        'description' => 'Lead scoring, retry/backoff queue processing, batch injections with pre-send validation, and risk-free test sends round out the automation layer.',
                    ],
                ],
            ],

            'platform_capabilities' => [
                'key' => 'platform_capabilities',
                'title' => 'Everything Your Operation Needs, In One Place',
                'subtitle' => 'A quick look at what runs under the hood.',
                'content' => [],
                'items' => [
                    ['title' => 'Lead Intake', 'description' => 'Public API endpoints for affiliates to submit leads, with validation and rejection handling.'],
                    ['title' => 'Distribution Engine', 'description' => 'Rule-based routing to advertisers with caps, schedules, and per-advertiser API formats.'],
                    ['title' => 'Reporting', 'description' => 'Advertiser performance, affiliate performance, country performance, conversions, and dashboards.'],
                    ['title' => 'Monitoring & Logs', 'description' => 'API logs, callback logs, audit logs, test lead logs, and send history.'],
                    ['title' => 'User & Role Management', 'description' => 'System roles plus custom roles with granular permission mappings.'],
                    ['title' => 'CRM Settings', 'description' => 'Global configuration for name, timezone, and date format.'],
                    ['title' => 'Help Desk & Chat', 'description' => 'A built-in support chat sessions module.'],
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
