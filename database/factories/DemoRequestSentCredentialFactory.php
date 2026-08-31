<?php

namespace Database\Factories;

use App\Models\DemoRequest;
use App\Models\DemoRequestSentCredential;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DemoRequestSentCredential>
 */
class DemoRequestSentCredentialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'demo_request_id' => DemoRequest::factory(),
            'url' => fake()->url(),
            'login_email' => fake()->safeEmail(),
        ];
    }
}
