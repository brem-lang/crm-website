<?php

use App\Models\DemoRequest;
use App\Models\User;
use App\Models\Visitor;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('login'));
});

test('non-admins are forbidden', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $response = $this->actingAs($user)->get(route('admin.dashboard'));
    $response->assertForbidden();
});

test('admins can view the dashboard with chart data', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    DemoRequest::factory()->create(['status' => DemoRequest::STATUS_NEW]);
    DemoRequest::factory()->create(['status' => DemoRequest::STATUS_CONVERTED]);
    Visitor::factory()->create(['device_type' => Visitor::DEVICE_DESKTOP]);
    Visitor::factory()->bot()->create();

    $response = $this->actingAs($admin)->get(route('admin.dashboard'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->where('range', 30)
        ->has('demoRequestsTrend', 30)
        ->has('visitorsTrend', 30)
        ->where('demoRequestsByStatus.new', 1)
        ->where('demoRequestsByStatus.converted', 1)
        ->where('visitorsByDevice.desktop', 1)
        ->where('visitorsByDevice.bot', 1),
    );
});

test('the range filter accepts 7, 30, and 90 and rejects anything else', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)
        ->get(route('admin.dashboard', ['range' => 7]))
        ->assertInertia(fn (Assert $page) => $page->where('range', 7)->has('demoRequestsTrend', 7));

    $this->actingAs($admin)
        ->get(route('admin.dashboard', ['range' => 999]))
        ->assertInertia(fn (Assert $page) => $page->where('range', 30)->has('demoRequestsTrend', 30));
});
