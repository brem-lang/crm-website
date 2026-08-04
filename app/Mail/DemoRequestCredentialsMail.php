<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DemoRequestCredentialsMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $demoRequestName,
        public string $url,
        public string $loginEmail,
        public string $password,
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your AlphaMasterCRM Login Credentials',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.demo-request-credentials',
            with: [
                'demoRequestName' => $this->demoRequestName,
                'url' => $this->url,
                'loginEmail' => $this->loginEmail,
                'password' => $this->password,
            ],
        );
    }
}
