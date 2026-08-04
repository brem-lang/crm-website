<?php

namespace App\Jobs;

use App\Models\Visitor;
use App\Services\GeoIpLookup;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class RecordVisitorLocation implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $visitorId,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(GeoIpLookup $geoIp): void
    {
        $visitor = Visitor::find($this->visitorId);

        if (! $visitor) {
            return;
        }

        $location = $geoIp->lookup($visitor->ip_address);

        $visitor->update($location);
    }
}
