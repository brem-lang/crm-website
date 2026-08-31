<?php

namespace Database\Factories;

use App\Models\DemoRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DemoRequest>
 */
class DemoRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'company' => fake()->company(),
            'telegram_username' => '@'.fake()->unique()->regexify('[A-Za-z0-9_]{8,15}'),
            'phone' => fake()->e164PhoneNumber(),
            'country' => fake()->country(),
            'business_type' => fake()->randomElement(['Forex & CFD', 'Crypto', 'Call Center', 'Lead Generation', 'Sales Organization']),
            'message' => fake()->optional()->sentence(15),
            'status' => DemoRequest::STATUS_NEW,
        ];
    }
}
