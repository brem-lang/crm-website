<?php

namespace App\Models;

use Database\Factories\DemoRequestSentEmailFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $demo_request_id
 * @property string $url
 * @property string $login_email
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read DemoRequest $demoRequest
 */
#[Fillable(['demo_request_id', 'url', 'login_email'])]
class DemoRequestSentEmail extends Model
{
    /** @use HasFactory<DemoRequestSentEmailFactory> */
    use HasFactory;

    /**
     * The demo request this send belongs to.
     */
    public function demoRequest(): BelongsTo
    {
        return $this->belongsTo(DemoRequest::class);
    }
}
