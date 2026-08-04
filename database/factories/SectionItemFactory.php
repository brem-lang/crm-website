<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\SectionItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SectionItem>
 */
class SectionItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'section_id' => Section::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(12),
            'image_path' => null,
            'icon' => null,
            'link_url' => null,
            'sort_order' => 0,
            'is_enabled' => true,
            'meta' => [],
        ];
    }
}
