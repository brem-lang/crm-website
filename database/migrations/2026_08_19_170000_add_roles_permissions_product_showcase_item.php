<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds a 'Roles & Permissions' card to the 'product_showcase' section,
     * bringing it to 6 items (an even 2x3 grid at the lg:grid-cols-3 layout).
     */
    public function up(): void
    {
        $section = Section::where('key', 'product_showcase')->first();

        if (! $section) {
            return;
        }

        $section->items()->updateOrCreate(
            ['title' => 'Roles & Permissions'],
            [
                'description' => 'Granular access control for every role on your team.',
                'sort_order' => $section->items()->max('sort_order') + 1,
            ],
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $section = Section::where('key', 'product_showcase')->first();

        if (! $section) {
            return;
        }

        $section->items()->where('title', 'Roles & Permissions')->delete();
    }
};
