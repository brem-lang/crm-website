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
                'title' => 'The All-in-One CRM Built for Forex, Crypto & Sales Teams',
                'subtitle' => 'Manage leads, close deals, and scale your sales operation — purpose-built for Forex/CFD brokers, crypto companies, call centers, lead generation companies, and sales teams.',
                'content' => [
                    'eyebrow_text' => 'v1.0 · Now available',
                    'primary_button_text' => 'Book a Demo',
                    'primary_button_url' => '#demo',
                    'secondary_button_text' => 'Explore the CRM',
                    'secondary_button_url' => '#product-showcase',
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
                    ['title' => 'Smart Lead Management', 'icon' => 'users', 'description' => 'Capture, score, and route leads automatically so your team always works the hottest opportunities first.'],
                    ['title' => 'Integrated Call Center', 'icon' => 'phone', 'description' => 'Dial, log, and track every call from inside the CRM — no separate systems to juggle.'],
                    ['title' => 'Sales Pipeline Tracking', 'icon' => 'trending-up', 'description' => 'Visualize every deal stage and know exactly where revenue is coming from next.'],
                    ['title' => 'Real-Time Reporting & Dashboards', 'icon' => 'bar-chart-3', 'description' => 'Advertiser, affiliate, country, and conversion performance — tracked live in dashboards built for sales leaders.'],
                    ['title' => 'Roles, Compliance & Access Control', 'icon' => 'shield-check', 'description' => 'Granular role-based permissions plus the audit trails and recordkeeping regulated brokers and financial teams need.'],
                    ['title' => 'AI Customer Summaries', 'icon' => 'sparkles', 'description' => 'Summarizes customer history to help agents maintain conversation context.'],
                    ['title' => 'AI Content Assistance', 'icon' => 'pen-line', 'description' => 'AI assistance to quickly write follow-up messages.'],
                    ['title' => 'Smart Lead Distribution', 'icon' => 'shuffle', 'description' => 'Automatically assigns new leads to the appropriate agents based on predefined rules.'],
                    ['title' => 'Automated Follow-Ups', 'icon' => 'refresh-cw', 'description' => 'Scheduled auto-follow-ups to keep leads warm.'],
                    ['title' => 'Workflow Automation', 'icon' => 'workflow', 'description' => 'Automates all sales process steps, from assignment to status updates.'],
                    ['title' => 'Management Insights', 'icon' => 'line-chart', 'description' => 'Presents important trends and patterns for sales management.'],
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
                'title' => 'Ready to Transform Your Sales Operation?',
                'subtitle' => 'Book a personalized demo and see how AlphaMasterCRM can power your team.',
                'content' => [
                    'submit_button_text' => 'Request My Demo',
                ],
            ],
        ];
    }
}
