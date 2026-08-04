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
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->e164PhoneNumber(),
            'country' => fake()->country(),
            'business_type' => fake()->randomElement(['Forex & CFD', 'Crypto', 'Call Center', 'Lead Generation', 'Sales Organization']),
            'message' => fake()->optional()->sentence(15),
            'status' => DemoRequest::STATUS_NEW,
        ];
    }
}
