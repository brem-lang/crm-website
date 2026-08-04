<?php

namespace Database\Factories;

use App\Models\Visitor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Visitor>
 */
class VisitorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ip_address' => fake()->ipv4(),
            'url' => '/',
            'referrer' => fake()->optional()->url(),
            'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'browser' => 'Chrome',
            'browser_version' => '120.0',
            'os' => 'Windows',
            'os_version' => '10',
            'device_type' => Visitor::DEVICE_DESKTOP,
            'country' => fake()->country(),
            'city' => fake()->city(),
            'is_bot' => false,
        ];
    }

    /**
     * Indicate that the visitor is a bot.
     */
    public function bot(): static
    {
        return $this->state(fn (array $attributes) => [
            'browser' => 'Googlebot',
            'browser_version' => null,
            'device_type' => Visitor::DEVICE_BOT,
            'is_bot' => true,
        ]);
    }
}
