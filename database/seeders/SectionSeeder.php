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

            $section = Section::updateOrCreate(
                ['key' => $definition['key']],
                [...$definition, 'sort_order' => $sortOrder],
            );

            // Drop items that are no longer part of this section's definition, so
            // re-running the seeder after a content rewrite doesn't leave stale
            // rows (e.g. removed feature cards) sitting alongside the new ones.
            $section->items()->whereNotIn('title', array_column($items, 'title'))->delete();

            foreach ($items as $itemSortOrder => $item) {
                $section->items()->updateOrCreate(
                    ['title' => $item['title']],
                    [...$item, 'sort_order' => $itemSortOrder],
                );
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
                'title' => 'The CRM Built for Forex, Crypto & High-Performance Sales Teams',
                'subtitle' => 'Manage leads, clients, sales teams, follow-ups and performance from one powerful CRM.',
                'content' => [
                    'eyebrow_text' => 'v1.0 · Now available',
                    'primary_button_text' => 'Book a Free Demo',
                    'primary_button_url' => '#demo',
                    'secondary_button_text' => 'Explore Features',
                    'secondary_button_url' => '#platform-features',
                ],
                'items' => [
                    ['title' => 'Live dashboard refresh', 'meta' => ['value' => '<300ms']],
                    ['title' => 'CRM & CPA integrations', 'meta' => ['value' => '15+']],
                    ['title' => 'Uptime SLA', 'meta' => ['value' => '99.9%']],
                    ['title' => 'Support', 'meta' => ['value' => '24/7']],
                ],
            ],

            'platform_features' => [
                'key' => 'platform_features',
                'title' => 'Everything Your Operation Needs',
                'subtitle' => 'One platform for lead intake, distribution, sales, and reporting — plus the AI and automation to keep it running itself.',
                'content' => [],
                'items' => [
                    ['title' => 'Lead Management', 'icon' => 'users', 'description' => 'Capture, score, and route leads automatically so your team always works the hottest opportunities first.'],
                    ['title' => 'Sales Pipeline', 'icon' => 'trending-up', 'description' => 'Visualize every deal stage and know exactly where revenue is coming from next.'],
                    ['title' => 'Client Management', 'icon' => 'handshake', 'description' => 'Keep every client\'s full history, contact details, and status in one organized profile.'],
                    ['title' => 'Team Management', 'icon' => 'shield-check', 'description' => 'Role-based permissions and structure so every agent and manager sees exactly what they need to.'],
                    ['title' => 'Follow-ups & Activities', 'icon' => 'refresh-cw', 'description' => 'Scheduled follow-ups and logged activity keep every lead moving instead of going cold.'],
                    ['title' => 'Reports & Analytics', 'icon' => 'bar-chart-3', 'description' => 'Live dashboards on leads, conversions, and agent performance — no manual reporting required.'],
                ],
            ],

            'mid_page_cta' => [
                'key' => 'mid_page_cta',
                'title' => 'Ready to Take Control of Your Sales?',
                'subtitle' => 'See it yourself — book a free walkthrough of the full platform.',
                'content' => [
                    'button_text' => 'Book Your Free Demo',
                    'button_url' => '#demo',
                ],
            ],

            'forex_brokers' => [
                'key' => 'forex_brokers',
                'title' => 'Built for Forex Brokers',
                'subtitle' => 'The compliance, distribution, and reporting a regulated brokerage actually needs.',
                'content' => [],
                'items' => [
                    ['title' => 'Compliance-Ready Access Control', 'icon' => 'shield-check', 'description' => 'Role-based permissions and audit trails built for regulated recordkeeping requirements.'],
                    ['title' => 'Rule-Based Lead Distribution', 'icon' => 'shuffle', 'description' => 'Route incoming leads to the right desk automatically, respecting caps and active schedules.'],
                    ['title' => 'Real-Time Reporting', 'icon' => 'bar-chart-3', 'description' => 'Live visibility into conversion and desk performance, tracked as it happens.'],
                    ['title' => 'Pipeline & Deal Tracking', 'icon' => 'trending-up', 'description' => 'Follow every trader from first contact to funded account, stage by stage.'],
                    ['title' => 'Automated Follow-Ups', 'icon' => 'refresh-cw', 'description' => 'Scheduled follow-ups keep prospective traders engaged without manual chasing.'],
                ],
            ],

            'sales_team' => [
                'key' => 'sales_team',
                'title' => 'Give Your Sales Team the Tools to Close More Deals',
                'subtitle' => 'Everything a rep and a sales manager need, in one place.',
                'content' => [],
                'items' => [
                    ['title' => 'Lead Assignment', 'icon' => 'shuffle', 'description' => 'New leads are routed to the right agent automatically, based on your own rules.'],
                    ['title' => 'Follow-ups', 'icon' => 'refresh-cw', 'description' => 'Scheduled follow-ups make sure no lead is left waiting too long for a response.'],
                    ['title' => 'Agent Performance', 'icon' => 'target', 'description' => "See each agent's activity and results without pulling a manual report."],
                    ['title' => 'Pipeline Management', 'icon' => 'workflow', 'description' => 'Track every deal stage clearly, from first contact to close.'],
                    ['title' => 'Conversion Tracking', 'icon' => 'line-chart', 'description' => 'Know exactly which leads convert and where they came from.'],
                    ['title' => 'Reporting', 'icon' => 'bar-chart-3', 'description' => 'Live dashboards give managers a real-time view of the whole team.'],
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
                    ['title' => 'Roles & Permissions', 'description' => 'Granular access control for every role on your team.'],
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

            'lead_pipeline' => [
                'key' => 'lead_pipeline',
                'title' => 'A Lead Status Pipeline That Runs Itself',
                'subtitle' => 'From the moment a lead comes in to the moment it converts, every stage is automated and tracked.',
                'content' => [],
                'items' => [
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

            'security' => [
                'key' => 'security',
                'title' => 'Your Data. Your Control.',
                'subtitle' => 'Security built into the platform, not bolted on after.',
                'content' => [],
                'items' => [
                    ['title' => 'Two-Factor Authentication', 'icon' => 'key-round', 'description' => 'An extra verification step on login keeps accounts secure even if a password leaks.'],
                    ['title' => 'Role-Based Access', 'icon' => 'shield-check', 'description' => 'Every user only sees and does what their role allows — nothing more.'],
                    ['title' => 'Encryption', 'icon' => 'lock', 'description' => 'Data is encrypted in transit and at rest.'],
                    ['title' => 'Backups', 'icon' => 'database', 'description' => 'Regular backups protect your data against loss.'],
                    ['title' => 'Activity Logs', 'icon' => 'activity', 'description' => 'Every important action is logged, giving you a clear audit trail.'],
                ],
            ],

            'social_proof' => [
                'key' => 'social_proof',
                'title' => 'Trusted by Sales Teams Like Yours',
                'subtitle' => 'From Forex brokers to lead generation shops, teams rely on AlphaMasterCRM to run their sales operation.',
                'content' => [],
                'items' => [
                    ['title' => 'Acme Corp', 'meta' => ['kind' => 'logo']],
                    ['title' => 'Globex Inc.', 'meta' => ['kind' => 'logo']],
                    ['title' => 'Initech LLC', 'meta' => ['kind' => 'logo']],
                    ['title' => 'Meridian Capital Markets', 'meta' => ['kind' => 'logo']],
                    ['title' => 'Nova Digital Partners', 'meta' => ['kind' => 'logo']],
                    ['title' => 'Brightline Brokerage', 'meta' => ['kind' => 'logo']],
                    [
                        'title' => 'Priya Anand',
                        'description' => 'AlphaMasterCRM cut our lead response time in half. Our reps finally work out of one screen instead of five.',
                        'meta' => [
                            'kind' => 'testimonial',
                            'role' => 'VP of Sales',
                            'company' => 'Meridian Capital Markets',
                        ],
                    ],
                    [
                        'title' => 'Marcus Webb',
                        'description' => "The distribution rules alone paid for the platform. We stopped losing leads to caps we didn't even know we'd hit.",
                        'meta' => [
                            'kind' => 'testimonial',
                            'role' => 'Head of Affiliate Operations',
                            'company' => 'Nova Digital Partners',
                        ],
                    ],
                    [
                        'title' => 'Elena Torres',
                        'description' => 'Audit trails and role-based access made our last regulatory review the easiest one we\'ve had.',
                        'meta' => [
                            'kind' => 'testimonial',
                            'role' => 'Compliance Director',
                            'company' => 'Brightline Brokerage',
                        ],
                    ],
                    ['title' => 'SOC 2 Type II', 'icon' => 'badge-check', 'meta' => ['kind' => 'badge']],
                    ['title' => 'GDPR Ready', 'icon' => 'shield-check', 'meta' => ['kind' => 'badge']],
                    ['title' => '256-bit Encryption', 'icon' => 'lock', 'meta' => ['kind' => 'badge']],
                    ['title' => '99.9% Uptime SLA', 'icon' => 'server', 'meta' => ['kind' => 'badge']],
                ],
            ],

            'roi_calculator' => [
                'key' => 'roi_calculator',
                'title' => 'See What Better Lead Management Is Worth',
                'subtitle' => 'Plug in your numbers and see the revenue a higher close rate puts back in your pipeline.',
                'content' => [],
            ],

            'pricing' => [
                'key' => 'pricing',
                'title' => 'Simple, Transparent Pricing',
                'subtitle' => 'One plan, everything included. No tiers, no add-on fees.',
                'content' => [],
                'items' => [
                    [
                        'title' => 'AlphaMasterCRM',
                        'description' => 'Unlimited agents, leads, and integrations — everything your team needs to run its sales operation.',
                        'meta' => [
                            'value' => '$250',
                            'highlighted' => 'true',
                            'highlight_1' => 'Unlimited agent seats',
                            'highlight_2' => 'Unlimited leads, flows & partners',
                            'highlight_3' => 'Real-time reporting & dashboards',
                            'highlight_4' => 'Roles, compliance & audit trails',
                            'highlight_5' => 'Priority support & onboarding',
                        ],
                    ],
                ],
            ],

            'faq' => [
                'key' => 'faq',
                'title' => 'Frequently Asked Questions',
                'subtitle' => 'Everything you need to know before booking a demo.',
                'content' => [],
                'items' => [
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
                ],
            ],

            'final_cta' => [
                'key' => 'final_cta',
                'title' => 'Ready to Take Control of Your Sales?',
                'subtitle' => 'Book a personalized demo and see how AlphaMasterCRM can power your team.',
                'content' => [
                    'submit_button_text' => 'Book Your Free Demo',
                ],
            ],
        ];
    }
}
