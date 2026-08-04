<?php

namespace App\Models;

use Database\Factories\SiteSettingFactory;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string|null $site_title
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property string|null $contact_email
 * @property string|null $contact_phone
 * @property string|null $social_facebook
 * @property string|null $social_instagram
 * @property string|null $social_linkedin
 * @property string|null $social_twitter
 * @property string|null $logo_path
 * @property string|null $favicon_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read string|null $logo_url
 * @property-read string|null $favicon_url
 */
#[Fillable([
    'site_title', 'seo_title', 'seo_description', 'contact_email', 'contact_phone',
    'social_facebook', 'social_instagram', 'social_linkedin', 'social_twitter',
    'logo_path', 'favicon_path',
])]
#[Appends(['logo_url', 'favicon_url'])]
class SiteSetting extends Model
{
    /** @use HasFactory<SiteSettingFactory> */
    use HasFactory;

    /**
     * Get the public URL for the site logo.
     */
    protected function logoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->logo_path ? Storage::disk('public')->url($this->logo_path) : null,
        );
    }

    /**
     * Get the public URL for the site favicon.
     */
    protected function faviconUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->favicon_path ? Storage::disk('public')->url($this->favicon_path) : null,
        );
    }

    /**
     * Get the single site settings row, creating it with defaults if it doesn't exist yet.
     */
    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'site_title' => 'AlphaMasterCRM',
            'seo_title' => 'AlphaMasterCRM — All-in-One CRM for Forex, Crypto & Sales Teams',
            'seo_description' => 'AlphaMasterCRM is the all-in-one CRM built for Forex/CFD brokers, crypto companies, call centers, lead generation companies, and sales teams.',
        ]);
    }
}
