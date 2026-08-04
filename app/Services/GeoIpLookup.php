<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeoIpLookup
{
    /**
     * Resolve the country and city for an IP address, or null values if it
     * can't be determined (private/local IPs, or a failed lookup).
     *
     * @return array{country: string|null, city: string|null}
     */
    public function lookup(string $ip): array
    {
        $empty = ['country' => null, 'city' => null];

        if (! filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return $empty;
        }

        return Cache::remember("geoip:{$ip}", now()->addDay(), function () use ($ip, $empty) {
            try {
                $response = Http::timeout(3)
                    ->get("http://ip-api.com/json/{$ip}", ['fields' => 'status,country,city']);

                if (! $response->successful() || $response->json('status') !== 'success') {
                    return $empty;
                }

                return [
                    'country' => $response->json('country'),
                    'city' => $response->json('city'),
                ];
            } catch (\Throwable $e) {
                Log::warning('GeoIP lookup failed', ['ip' => $ip, 'message' => $e->getMessage()]);

                return $empty;
            }
        });
    }
}
