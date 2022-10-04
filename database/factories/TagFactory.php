<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'tags' => $this->faker->userName(),
            'is_active' => fake()->randomElement(['0', '1']),
            'slug' => fake()->slug(),
            'created_by' => User::first()->uuid,
            'created_at' => now(),
        ];
    }
}
