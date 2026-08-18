<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds a new 'social_proof' homepage section (partner/client logos,
     * testimonials, and trust badges), slotted between the existing
     * 'powerful_management' (sort_order 7) and 'final_cta' (sort_order 9)
     * sections.
     */
    public function up(): void
    {
        $section = Section::updateOrCreate(
            ['key' => 'social_proof'],
            [
                'title' => 'Trusted by Sales Teams Like Yours',
                'subtitle' => 'From Forex brokers to lead generation shops, teams rely on AlphaMasterCRM to run their sales operation.',
                'content' => [],
                'is_enabled' => true,
                'sort_order' => 8,
            ],
        );

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
        Section::where('key', 'social_proof')->delete();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function items(): array
    {
        return [
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
        ];
    }
};
