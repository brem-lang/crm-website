<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Collapses the 3-tier pricing section down to a single $250/mo plan.
     */
    public function up(): void
    {
        $section = Section::where('key', 'pricing')->first();

        if (! $section) {
            return;
        }

        $section->update([
            'subtitle' => 'One plan, everything included. No tiers, no add-on fees.',
        ]);

        $section->items()->delete();

        $section->items()->create([
            'title' => 'AlphaMasterCRM',
            'description' => 'Unlimited agents, leads, and integrations — everything your team needs to run its sales operation.',
            'sort_order' => 0,
            'meta' => [
                'value' => '$250',
                'highlighted' => 'true',
                'highlight_1' => 'Unlimited agent seats',
                'highlight_2' => 'Unlimited leads, flows & partners',
                'highlight_3' => 'Real-time reporting & dashboards',
                'highlight_4' => 'Roles, compliance & audit trails',
                'highlight_5' => 'Priority support & onboarding',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // The previous 3-tier data isn't restored — this is a one-way
        // content simplification, same as other section content migrations.
    }
};
