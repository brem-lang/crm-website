<?php

use App\Models\DemoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Inertia\Testing\AssertableInertia as Assert;

function validCredentialsPayload(): array
{
    return [
        'url' => 'https://app.alphamastercrm.test',
        'email' => 'new.login@example.com',
        'password' => 'temp-pass-123',
    ];
}

test('guests are redirected to the login page', function () {
    $demoRequest = DemoRequest::factory()->create();

    $response = $this->post(
        route('admin.demo-requests.send-credentials', $demoRequest),
        validCredentialsPayload(),
    );

    $response->assertRedirect(route('login'));
});

test('non-admins are forbidden', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $demoRequest = DemoRequest::factory()->create();

    $response = $this->actingAs($user)->post(
        route('admin.demo-requests.send-credentials', $demoRequest),
        validCredentialsPayload(),
    );

    $response->assertForbidden();
});

test('admins can record that login credentials were sent on Telegram', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create(['telegram_username' => '@janedoe', 'name' => 'Jane Doe']);

    $payload = validCredentialsPayload();

    $response = $this->actingAs($admin)->post(
        route('admin.demo-requests.send-credentials', $demoRequest),
        $payload,
    );

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();

    $this->assertDatabaseHas('demo_request_sent_credentials', [
        'demo_request_id' => $demoRequest->id,
        'url' => $payload['url'],
        'login_email' => $payload['email'],
    ]);

    expect(Schema::hasColumn('demo_request_sent_credentials', 'password'))
        ->toBeFalse();
});

test('the send history appears in the demo requests index payload', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create();

    $this->actingAs($admin)->post(
        route('admin.demo-requests.send-credentials', $demoRequest),
        validCredentialsPayload(),
    );

    $response = $this->actingAs($admin)->get(route('admin.demo-requests.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/demo-requests/index')
        ->has('demoRequests.data.0.sent_credentials', 1)
        ->where('demoRequests.data.0.sent_credentials.0.login_email', 'new.login@example.com')
        ->where('demoRequests.data.0.sent_credentials.0.url', 'https://app.alphamastercrm.test'),
    );
});

test('validates required fields', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create();

    $response = $this->actingAs($admin)->post(
        route('admin.demo-requests.send-credentials', $demoRequest),
        ['url' => 'not-a-url', 'email' => 'not-an-email', 'password' => ''],
    );

    $response->assertSessionHasErrors(['url', 'email', 'password']);
    $this->assertDatabaseCount('demo_request_sent_credentials', 0);
});
