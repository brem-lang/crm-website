<?php

namespace App\Http\Middleware;

use App\Jobs\RecordVisitorLocation;
use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use WhichBrowser\Constants\DeviceType;
use WhichBrowser\Parser;

class TrackVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $this->record($request);

        return $response;
    }

    /**
     * Parse the visitor's user agent and record the visit.
     */
    protected function record(Request $request): void
    {
        $result = new Parser($request->userAgent() ?? '');

        // WhichBrowser unsets (rather than nulls) properties it couldn't
        // detect, so every access below must be null-safe.
        $deviceType = ($result->device->type ?? null) ?: Visitor::DEVICE_UNKNOWN;

        $visitor = Visitor::create([
            'ip_address' => $request->ip() ?? '',
            'url' => $request->path(),
            'referrer' => $request->headers->get('referer'),
            'user_agent' => $request->userAgent(),
            'browser' => $result->browser->name ?? null,
            'browser_version' => ($result->browser->version ?? null)?->toString() ?: null,
            'os' => $result->os->name ?? null,
            'os_version' => ($result->os->version ?? null)?->toString() ?: null,
            'device_type' => $deviceType,
            'is_bot' => $deviceType === DeviceType::BOT,
        ]);

        RecordVisitorLocation::dispatch($visitor->id)->afterResponse();
    }
}
