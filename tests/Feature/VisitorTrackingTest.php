<?php

use App\Models\Visitor;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    Http::fake([
        'ip-api.com/*' => Http::response(['status' => 'success', 'country' => 'United States', 'city' => 'New York']),
    ]);
});

test('visiting the homepage records a visitor', function () {
    $response = $this->withHeaders([
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ])->get('/');

    $response->assertOk();

    expect(Visitor::count())->toBe(1);

    $visitor = Visitor::first();
    expect($visitor->url)->toBe('/');
    expect($visitor->browser)->toBe('Chrome');
    expect($visitor->device_type)->toBe('desktop');
    expect($visitor->is_bot)->toBeFalse();
});

test('bot user agents are flagged', function () {
    $this->withHeaders([
        'User-Agent' => 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    ])->get('/');

    $visitor = Visitor::first();
    expect($visitor->is_bot)->toBeTrue();
    expect($visitor->device_type)->toBe('bot');
});

test('geo location is not populated for local requests', function () {
    $this->get('/');

    $visitor = Visitor::first();
    expect($visitor->ip_address)->toBe('127.0.0.1');
    expect($visitor->country)->toBeNull();
});
