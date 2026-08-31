<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('demo_requests', function (Blueprint $table) {
            // Nullable at the DB level so historical rows (which only have an email) stay
            // valid; new submissions enforce "required" via form validation instead.
            $table->string('telegram_username')->nullable()->after('email');
        });

        Schema::table('demo_requests', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demo_requests', function (Blueprint $table) {
            $table->string('email')->nullable()->after('company');
        });

        Schema::table('demo_requests', function (Blueprint $table) {
            $table->dropColumn('telegram_username');
        });
    }
};
