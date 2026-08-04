<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated non-admin users can visit the dashboard', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('admins visiting the plain dashboard are redirected to the admin dashboard', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $this->actingAs($admin);

    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('admin.dashboard'));
});