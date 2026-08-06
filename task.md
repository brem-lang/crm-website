# CRM Modules Overview

## Advertisers

**What it is:** The buyers/partners the CRM sends leads _to_, managed under `sr
c/pages/Advertisers.tsx` (`advertisers` table).

- Each advertiser has an integration type, API URL/key, and a `config` payload
  used to build the outbound request format for that specific advertiser's API (e
  .g. Notion, Wex, Enigma, GSI, SAXO, TrackBox, Capital Trading, We Bull Up, NoxW
  ealth — each has its own request/response handling in `distribute-lead`).
- **Caps & scheduling:** `daily_cap` / `hourly_cap` limit volume, and a weekly
  schedule (per-day active windows) controls when an advertiser can receive leads
  — configured via `advertiser_distribution_settings` (`src/pages/DistributionSe
ttings.tsx`, `useDistributionSettings`).
- **Conversion tracking:** each advertiser gets a linked `advertiser_conversion
s` record for tracking conversion stats.
- **Performance reporting:** `src/pages/AdvertiserPerformance.tsx` and `useAdve
rtiserHourlyStats` show delivery/conversion performance by hour/day.

## Affiliates

**What it is:** The sources leads come _from_, managed under `src/pages/Affilia
tes.tsx` (`affiliates` table).

- Affiliates submit leads through the public intake endpoints (`submit-lead` /
  `submit-lead-v2`), authenticated by an affiliate API key.
- Rules per affiliate (`useAffiliateDistributionRules`) can restrict which adve
  rtisers/countries/offers an affiliate's traffic is eligible for.
- Failed submissions are tracked (`useAffiliateSubmissionFailures`, `src/pages/
AffiliateApiLogs.tsx`) so bad payloads/auth issues are visible per affiliate.
- **Performance reporting:** `src/pages/AffiliatePerformance.tsx` shows volume,
  acceptance rate, and conversion by affiliate.

## Lead Status Automation

The pipeline moves a lead through statuses automatically at each stage:

1. **Intake** — `submit-lead`/`submit-lead-v2` receive a lead from an affiliate
   , validate it, and insert it into `leads` with an initial status (or reject it,
   landing in `RejectedLeads`).
2. **Distribution** — `distribute-lead` / `route-lead` pick an eligible adverti
   ser based on `distribution_rules` + `distribution_rule_targets`, respecting the
   advertiser's cap and active schedule, then push the lead to the advertiser's A
   PI in that advertiser's specific format. On success the lead's status is set to
   `sent` and `distributed_at` is stamped.
3. **Callback / status sync** — advertisers call back into `advertiser-callback
` (authenticated via their `api_key`) to report what happened to a lead. The fu
   nction:
    - Looks the lead up by `lead_id`, `request_id`, or `email`, and verifies it
      was actually sent to that advertiser (must be `status = 'sent'`) before accepti
      ng an update — prevents advertisers from updating leads they were never given.
    - Maps the advertiser's status string to internal status via a `statusMap`,
      and can also set `is_ftd` (first-time depositor) + FTD date.
    - Handles injection-sourced leads differently (updates only `sale_status`/`i
njection_ftd_*`, never the core `status`/`is_ftd`, so injection reporting doesn
      't collide with normal lead status).
4. **Polling fallback** — `poll-lead-status` actively checks advertisers that d
   on't support callbacks, pulling status updates on a schedule instead of waiting
   for a push.
5. **Other supporting automation:**
    - `lead-status` — endpoint to query current status of a lead.
    - `release-ftd` — releases/flags first-time-depositor leads.
    - `score-lead` — automated lead scoring.
    - `process-lead-queue` — background processor for queued leads (e.g. retry/b
      ackoff on distribution).
    - `send-injection` / `validate-injection` — batch "injection" jobs that push
      pooled leads into an advertiser outside the normal real-time distribution flow
      , with pre-send validation.
    - `send-test-lead` — lets you dry-run a lead against an advertiser integrati
      on without affecting real caps/pipeline.

## Top Functionality Summary

| Area                                | Functionality                                                 |
| ----------------------------------- | ------------------------------------------------------------- |
| **Lead intake**                     | Public API endpoints for affiliates to submit leads, with v   |
| alidation and rejection handling    |
| **Distribution engine**             | Rule-based routing to advertisers with caps, schedu           |
| les, and per-advertiser API formats |
| **Reporting**                       | Advertiser performance, affiliate performance, country perfor |
| mance, conversions, dashboards      |
| **Monitoring/logs**                 | API logs, callback logs, audit logs, test lead logs, se       |
| nd history                          |
| **User & role management**          | System roles (`app_role`) + custom roles with gr              |
| anular permission mappings          |
| **CRM settings**                    | Global config (name, timezone, date format)                   |
| **Help desk / chat**                | Support chat sessions module                                  |

base on this description
