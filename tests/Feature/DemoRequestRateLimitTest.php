<?php

use App\Models\DemoRequest;
use Illuminate\Support\Facades\RateLimiter;

beforeEach(function () {
    RateLimiter::clear('demo-requests');

    $this->payload = fn () => [
        'name' => 'Jane Doe',
        'company' => 'Acme Inc',
        'email' => fake()->unique()->safeEmail(),
        'phone' => '+1 555 000 1234',
        'country' => 'United States',
        'business_type' => 'Forex & CFD',
        'message' => 'Interested in a demo.',
    ];
});

test('allows submissions under the burst limit', function () {
    foreach (range(1, 5) as $i) {
        $response = $this->withHeaders(['X-Inertia' => 'true'])
            ->post(route('demo-requests.store'), ($this->payload)());
        $response->assertRedirect();
        $response->assertSessionHasNoErrors();
    }

    expect(DemoRequest::count())->toBe(5);
});

test('blocks submissions once the burst limit is exceeded', function () {
    foreach (range(1, 5) as $i) {
        $this->withHeaders(['X-Inertia' => 'true'])
            ->post(route('demo-requests.store'), ($this->payload)());
    }

    $response = $this->withHeaders(['X-Inertia' => 'true'])
        ->post(route('demo-requests.store'), ($this->payload)());

    $response->assertSessionHasErrors('form');
    expect(DemoRequest::count())->toBe(5);
});

test('returns a plain 429 for non-Inertia requests once the burst limit is exceeded', function () {
    foreach (range(1, 5) as $i) {
        $this->post(route('demo-requests.store'), ($this->payload)());
    }

    $response = $this->post(route('demo-requests.store'), ($this->payload)());

    $response->assertStatus(429);
    expect(DemoRequest::count())->toBe(5);
});
