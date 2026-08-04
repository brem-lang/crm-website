<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Seed the default site settings row.
     */
    public function run(): void
    {
        SiteSetting::current();
    }
}
