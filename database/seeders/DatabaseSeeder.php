<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@alphamastercrm.test',
            'is_admin' => true,
        ]);

        $this->call([
            SectionSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
