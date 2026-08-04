<?php

namespace Database\Factories;

use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => fake()->unique()->slug(2),
            'title' => fake()->sentence(4),
            'subtitle' => fake()->sentence(8),
            'body' => fake()->paragraph(),
            'is_enabled' => true,
            'sort_order' => 0,
            'content' => [],
        ];
    }
}
