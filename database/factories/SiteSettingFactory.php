<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteSetting>
 */
class SiteSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'site_title' => 'AlphaMasterCRM',
            'seo_title' => 'AlphaMasterCRM — All-in-One CRM for Forex, Crypto & Sales Teams',
            'seo_description' => fake()->sentence(20),
            'contact_email' => fake()->companyEmail(),
            'contact_phone' => fake()->e164PhoneNumber(),
        ];
    }
}
