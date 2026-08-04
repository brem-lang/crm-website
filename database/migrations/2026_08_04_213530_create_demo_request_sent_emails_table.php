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
        Schema::create('demo_request_sent_emails', function (Blueprint $table) {
            $table->id();
            $table->foreignId('demo_request_id')->constrained()->cascadeOnDelete();
            $table->string('url');
            $table->string('login_email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demo_request_sent_emails');
    }
};
