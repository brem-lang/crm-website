<?php

use App\Mail\DemoRequestCredentialsMail;
use App\Models\DemoRequest;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
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
        route('admin.demo-requests.send-email', $demoRequest),
        validCredentialsPayload(),
    );

    $response->assertRedirect(route('login'));
});

test('non-admins are forbidden', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $demoRequest = DemoRequest::factory()->create();

    $response = $this->actingAs($user)->post(
        route('admin.demo-requests.send-email', $demoRequest),
        validCredentialsPayload(),
    );

    $response->assertForbidden();
});

test('admins can send login credentials to a demo request', function () {
    Mail::fake();

    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create(['email' => 'jane@example.com', 'name' => 'Jane Doe']);

    $payload = validCredentialsPayload();

    $response = $this->actingAs($admin)->post(
        route('admin.demo-requests.send-email', $demoRequest),
        $payload,
    );

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();

    Mail::assertSent(DemoRequestCredentialsMail::class, function ($mail) use ($payload) {
        return $mail->hasTo('jane@example.com')
            && $mail->demoRequestName === 'Jane Doe'
            && $mail->url === $payload['url']
            && $mail->loginEmail === $payload['email']
            && $mail->password === $payload['password'];
    });

    $this->assertDatabaseHas('demo_request_sent_emails', [
        'demo_request_id' => $demoRequest->id,
        'url' => $payload['url'],
        'login_email' => $payload['email'],
    ]);

    expect(\Illuminate\Support\Facades\Schema::hasColumn('demo_request_sent_emails', 'password'))
        ->toBeFalse();
});

test('the send history appears in the demo requests index payload', function () {
    Mail::fake();

    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create();

    $this->actingAs($admin)->post(
        route('admin.demo-requests.send-email', $demoRequest),
        validCredentialsPayload(),
    );

    $response = $this->actingAs($admin)->get(route('admin.demo-requests.index'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/demo-requests/index')
        ->has('demoRequests.data.0.sent_emails', 1)
        ->where('demoRequests.data.0.sent_emails.0.login_email', 'new.login@example.com')
        ->where('demoRequests.data.0.sent_emails.0.url', 'https://app.alphamastercrm.test'),
    );
});

test('validates required fields', function () {
    Mail::fake();

    $admin = User::factory()->create(['is_admin' => true]);
    $demoRequest = DemoRequest::factory()->create();

    $response = $this->actingAs($admin)->post(
        route('admin.demo-requests.send-email', $demoRequest),
        ['url' => 'not-a-url', 'email' => 'not-an-email', 'password' => ''],
    );

    $response->assertSessionHasErrors(['url', 'email', 'password']);
    Mail::assertNothingSent();
});

test('the email renders with the submitted values', function () {
    $mail = new DemoRequestCredentialsMail(
        demoRequestName: 'Jane Doe',
        url: 'https://app.alphamastercrm.test',
        loginEmail: 'jane.login@example.com',
        password: 'secret-pass',
    );

    $rendered = $mail->render();

    expect($rendered)
        ->toContain('Jane Doe')
        ->toContain('jane.login@example.com')
        ->toContain('secret-pass')
        ->toContain('https://app.alphamastercrm.test');
});
