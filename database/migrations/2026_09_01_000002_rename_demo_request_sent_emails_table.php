<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Only the table name changes (email-specific naming -> channel-neutral naming, since
     * credentials are now delivered on Telegram, not email). `login_email` stays as-is — it's
     * still the login username for the CRM account being handed over, unrelated to how the
     * lead is contacted.
     */
    public function up(): void
    {
        Schema::rename('demo_request_sent_emails', 'demo_request_sent_credentials');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('demo_request_sent_credentials', 'demo_request_sent_emails');
    }
};
