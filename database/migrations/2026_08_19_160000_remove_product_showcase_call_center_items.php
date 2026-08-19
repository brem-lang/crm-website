<?php

use App\Models\Section;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Drops the 'Call Center', 'Automation', and 'Team Performance' cards
     * from the 'product_showcase' section, leaving 5 items so the grid
     * renders as a clean 3-column layout instead of 4.
     */
    public function up(): void
    {
        $section = Section::where('key', 'product_showcase')->first();

        if (! $section) {
            return;
        }

        $section->items()
            ->whereIn('title', ['Call Center', 'Automation', 'Team Performance'])
            ->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
