<?php

namespace App\Models;

use Database\Factories\DemoRequestFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $company
 * @property string $email
 * @property string $phone
 * @property string $country
 * @property string $business_type
 * @property string|null $message
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'company', 'email', 'phone', 'country', 'business_type', 'message', 'status'])]
class DemoRequest extends Model
{
    /** @use HasFactory<DemoRequestFactory> */
    use HasFactory;

    public const STATUS_NEW = 'new';

    public const STATUS_CONTACTED = 'contacted';

    public const STATUS_CONVERTED = 'converted';

    public const STATUS_CLOSED = 'closed';

    /**
     * The history of login-credentials emails sent for this demo request.
     */
    public function sentEmails(): HasMany
    {
        return $this->hasMany(DemoRequestSentEmail::class);
    }
}
