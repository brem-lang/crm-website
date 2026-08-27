import { AlertTriangle, Info, Key, Link2, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { Container } from '@/components/sections/container';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHead } from '@/components/sections/site-head';
import { SiteHeader } from '@/components/sections/site-header';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/types/sections';

const BASE_URL = 'https://api.alphamastercrm.com/v1';

type Param = {
    name: string;
    type: string;
    required?: boolean;
    description: string;
};

function CodeBlock({ children }: { children: string }) {
    return (
        <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4 font-mono text-xs leading-6 text-foreground">
            <code>{children}</code>
        </pre>
    );
}

function MethodBadge({ method }: { method: 'GET' | 'POST' }) {
    return (
        <span
            className={cn(
                'rounded-md px-2 py-1 font-mono text-xs font-bold',
                method === 'POST'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-sky-500/10 text-sky-600',
            )}
        >
            {method}
        </span>
    );
}

function Callout({
    tone,
    icon: Icon,
    children,
}: {
    tone: 'info' | 'warning' | 'success';
    icon: typeof Info;
    children: ReactNode;
}) {
    const tones = {
        info: 'border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-400',
        warning: 'border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400',
        success: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
    } as const;

    return (
        <div className={cn('flex gap-3 rounded-lg border p-4 text-sm leading-6', tones[tone])}>
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div className="text-foreground/90">{children}</div>
        </div>
    );
}

function ParamsTable({ params }: { params: Param[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {params.map((param) => (
                    <TableRow key={param.name}>
                        <TableCell className="font-mono text-xs text-foreground">
                            {param.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{param.type}</TableCell>
                        <TableCell>
                            <Badge variant={param.required ? 'destructive' : 'secondary'}>
                                {param.required ? 'Required' : 'Optional'}
                            </Badge>
                        </TableCell>
                        <TableCell className="max-w-md whitespace-normal text-muted-foreground">
                            {param.description}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function EndpointCard({
    method,
    path,
    description,
    children,
}: {
    method: 'GET' | 'POST';
    path: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <div id={path.replace(/\W+/g, '-')} className="scroll-mt-24 rounded-2xl border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
                <MethodBadge method={method} />
                <code className="font-mono text-base font-semibold text-foreground">{path}</code>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <div className="mt-6 space-y-6">{children}</div>
        </div>
    );
}

const STATUS_VALUES: { label: string; tone: string; description: string }[] = [
    { label: 'New', tone: 'text-sky-600', description: 'Lead received' },
    { label: 'Callback', tone: 'text-amber-600', description: 'Scheduled callback' },
    { label: 'No Answer', tone: 'text-orange-600', description: 'No response' },
    { label: 'Depositor', tone: 'text-emerald-600', description: 'Made a deposit' },
    { label: 'Interested', tone: 'text-indigo-600', description: 'Shows interest' },
    { label: 'Not Interested', tone: 'text-destructive', description: 'Declined' },
];

const HTTP_CODES: { code: string; tone: string; description: string }[] = [
    { code: '200', tone: 'text-emerald-600', description: 'Success' },
    { code: '201', tone: 'text-emerald-600', description: 'Lead created successfully' },
    { code: '400', tone: 'text-amber-600', description: 'Bad request — missing required parameters' },
    { code: '401', tone: 'text-destructive', description: 'Unauthorized — invalid or missing API key' },
    { code: '404', tone: 'text-destructive', description: 'Lead not found' },
    { code: '409', tone: 'text-amber-600', description: 'Duplicate — email already exists' },
    { code: '422', tone: 'text-amber-600', description: 'Validation error' },
    { code: '503', tone: 'text-destructive', description: 'Caps full — try again later' },
];

export default function ApiDocs({ settings }: { settings: SiteSettings }) {
    return (
        <>
            <SiteHead settings={settings} />

            <div className="font-landing flex min-h-screen flex-col bg-background text-foreground">
                <SiteHeader settings={settings} />

                <main className="flex-1 py-16 sm:py-20">
                    <Container className="max-w-4xl">
                        <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                            API Reference · v1
                        </span>
                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                            Lead Intake API
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                            Submit leads directly into AlphaMasterCRM, and pull status and
                            first-time-depositor updates back out — everything your integration
                            needs to go live.
                        </p>

                        <div className="mt-12 grid gap-6 sm:grid-cols-2">
                            <div className="rounded-2xl border bg-card p-6">
                                <div className="flex items-center gap-2 text-foreground">
                                    <Key className="size-4 text-indigo-500" />
                                    <h2 className="font-semibold">Authentication</h2>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    All API requests require an{' '}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                                        Api-Key
                                    </code>{' '}
                                    header with your unique affiliate API key.
                                </p>
                                <CodeBlock>{'Header: Api-Key: your_api_key_here'}</CodeBlock>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Contact your account manager to receive your API key.
                                </p>
                            </div>

                            <div className="rounded-2xl border bg-card p-6">
                                <div className="flex items-center gap-2 text-foreground">
                                    <Link2 className="size-4 text-indigo-500" />
                                    <h2 className="font-semibold">Base URL</h2>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Every endpoint below is relative to this base URL.
                                </p>
                                <CodeBlock>{BASE_URL}</CodeBlock>
                            </div>
                        </div>

                        <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">
                            Endpoints
                        </h2>

                        <div className="mt-6 space-y-6">
                            <EndpointCard
                                method="POST"
                                path="/submit-lead"
                                description="Submit a new lead to the system."
                            >
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Parameters
                                    </h3>
                                    <ParamsTable
                                        params={[
                                            { name: 'firstname', type: 'string', required: true, description: "Lead's first name" },
                                            { name: 'lastname', type: 'string', required: true, description: "Lead's last name" },
                                            { name: 'email', type: 'string', required: true, description: "Lead's email address" },
                                            { name: 'mobile', type: 'string', required: true, description: "Lead's phone number" },
                                            { name: 'country_code', type: 'string', required: true, description: '2-letter ISO country code (e.g., US, GB, CA)' },
                                            { name: 'country', type: 'string', description: 'Full country name' },
                                            { name: 'ip_address', type: 'string', required: true, description: "Lead's IP address" },
                                            { name: 'offer_name', type: 'string', description: 'Offer/campaign name' },
                                            { name: 'custom1', type: 'string', description: 'Custom tracking parameter 1' },
                                            { name: 'custom2', type: 'string', description: 'Custom tracking parameter 2' },
                                            { name: 'custom3', type: 'string', description: 'Custom tracking parameter 3' },
                                            { name: 'comment', type: 'string', description: 'Additional notes' },
                                            { name: 'click_id', type: 'string', description: 'Ad click tracking ID — trace the lead back to the exact ad click for attribution and reporting.' },
                                            { name: 'locale', type: 'string', description: 'Browser/language locale (e.g. en-US). Auto-derived from country_code if not provided.' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Example Request
                                    </h3>
                                    <CodeBlock>{`POST ${BASE_URL}/submit-lead
Headers:
  Api-Key: your_api_key_here
  Content-Type: application/json

Body:
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "mobile": "+14165551234",
  "country_code": "CA",
  "country": "Canada",
  "offer_name": "Summer Promo",
  "custom1": "tracking123",
  "click_id": "abc123",
  "locale": "en-CA"
}`}</CodeBlock>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Success Response
                                    </h3>
                                    <CodeBlock>{`{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "lead_id": "9783cddc-ea4a-4a36-b207-52360b6634fc",
    "request_id": "fa4b6d82-b789-4c29-b069-a3c6a8d0fa9d",
    "autologin_url": "https://broker.example.com/autologin?token=abc123"
  }
}`}</CodeBlock>
                                </div>

                                <Callout tone="success" icon={Link2}>
                                    <strong>Autologin URL:</strong> when available, the{' '}
                                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                        autologin_url
                                    </code>{' '}
                                    field lets the lead be instantly logged into the CRM. Redirect
                                    the user there immediately after submission for seamless
                                    onboarding.
                                </Callout>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Error Responses
                                    </h3>
                                    <CodeBlock>{`// Validation Error (422)
{ "success": false, "message": "Validation failed", "errors": { "email": "Invalid email format" } }

// Duplicate Email (409)
{ "success": false, "message": "DUPLICATE" }

// Caps Full (503)
{ "success": false, "message": "CAPS_FULL" }`}</CodeBlock>
                                </div>
                            </EndpointCard>

                            <EndpointCard
                                method="GET"
                                path="/get-leads"
                                description="Retrieve leads with status and FTD updates."
                            >
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Query Parameters
                                    </h3>
                                    <ParamsTable
                                        params={[
                                            { name: 'fromDate', type: 'string', required: true, description: 'Start date (MM/DD/YY)' },
                                            { name: 'toDate', type: 'string', required: true, description: 'End date (MM/DD/YY)' },
                                            { name: 'hasFTD', type: 'integer', description: 'Filter by FTD status (0 or 1)' },
                                            { name: 'status', type: 'string', description: 'Filter by sale status' },
                                            { name: 'email', type: 'string', description: 'Filter by email' },
                                            { name: 'lead_id', type: 'string', description: 'Filter by specific lead ID' },
                                        ]}
                                    />
                                </div>

                                <Callout tone="warning" icon={AlertTriangle}>
                                    Date range filters by{' '}
                                    <code className="rounded bg-muted px-1 py-0.5 text-xs">
                                        updated_at
                                    </code>{' '}
                                    — returns only leads that had status/FTD changes in that
                                    period. Rejected leads are excluded by default.
                                </Callout>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Example Request
                                    </h3>
                                    <CodeBlock>{`GET ${BASE_URL}/get-leads?fromDate=01/01/26&toDate=01/31/26&hasFTD=1
Headers:
  Api-Key: your_api_key_here`}</CodeBlock>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Response
                                    </h3>
                                    <CodeBlock>{`{
  "success": true,
  "message": "Leads fetched successfully",
  "count": 1,
  "data": [
    {
      "id": "9783cddc-ea4a-4a36-b207-52360b6634fc",
      "lead_code": "fa4b6d82-b789-4c29-b069-a3c6a8d0fa9d",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john.doe@example.com",
      "country_code": "CA",
      "mobile": "14165551234",
      "status": "Depositor",
      "is_ftd": 1,
      "ftd_date": "2026-01-15T10:30:00Z"
    }
  ]
}`}</CodeBlock>
                                </div>

                                <Callout tone="info" icon={Info}>
                                    <strong>Status field:</strong> contains the sale status as
                                    reported by the CRM (e.g. "New", "Callback", "Depositor").
                                    Values vary by advertiser — see{' '}
                                    <a href="#status-values" className="underline underline-offset-2">
                                        Status Values
                                    </a>{' '}
                                    below.
                                </Callout>
                            </EndpointCard>

                            <EndpointCard
                                method="GET"
                                path="/lead-status"
                                description="Check the status of a specific lead."
                            >
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Query Parameters (one required)
                                    </h3>
                                    <ParamsTable
                                        params={[
                                            { name: 'lead_id', type: 'string', description: 'The lead UUID' },
                                            { name: 'request_id', type: 'string', description: 'The request ID returned from submission' },
                                            { name: 'email', type: 'string', description: "The lead's email address" },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Example Request
                                    </h3>
                                    <CodeBlock>{`GET ${BASE_URL}/lead-status?request_id=fa4b6d82-b789-4c29-b069-a3c6a8d0fa9d
Headers:
  Api-Key: your_api_key_here`}</CodeBlock>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                                        Response
                                    </h3>
                                    <CodeBlock>{`{
  "success": true,
  "lead_id": "9783cddc-ea4a-4a36-b207-52360b6634fc",
  "request_id": "fa4b6d82-b789-4c29-b069-a3c6a8d0fa9d",
  "status": "Callback",
  "is_ftd": 0
}`}</CodeBlock>
                                </div>
                            </EndpointCard>
                        </div>

                        <div id="status-values" className="mt-16 scroll-mt-24 rounded-2xl border bg-card p-6 sm:p-8">
                            <h2 className="text-lg font-semibold text-foreground">Status Values</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                The <code className="rounded bg-muted px-1 py-0.5 text-xs">status</code>{' '}
                                field reflects the sale status as reported by the CRM. Common
                                examples:
                            </p>
                            <Table className="mt-4">
                                <TableBody>
                                    {STATUS_VALUES.map((status) => (
                                        <TableRow key={status.label}>
                                            <TableCell>
                                                <span className={cn('font-semibold', status.tone)}>
                                                    {status.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {status.description}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <p className="mt-4 text-xs text-muted-foreground">
                                Exact values depend on your CRM configuration and may differ from
                                the examples above.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
                            <div className="flex items-center gap-2 text-foreground">
                                <AlertTriangle className="size-4 text-amber-500" />
                                <h2 className="text-lg font-semibold">HTTP Status Codes</h2>
                            </div>
                            <Table className="mt-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {HTTP_CODES.map((row) => (
                                        <TableRow key={row.code}>
                                            <TableCell className={cn('font-mono font-semibold', row.tone)}>
                                                {row.code}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {row.description}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
                            <div className="flex items-center gap-2 text-foreground">
                                <MessageCircle className="size-4 text-indigo-500" />
                                <h2 className="text-lg font-semibold">Support</h2>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For API access, technical support, or questions,{' '}
                                {settings.contact_email ? (
                                    <a
                                        href={`mailto:${settings.contact_email}`}
                                        className="font-medium text-indigo-600 hover:text-indigo-700"
                                    >
                                        contact your account manager
                                    </a>
                                ) : (
                                    'contact your account manager'
                                )}
                                .
                            </p>
                        </div>
                    </Container>
                </main>

                <SiteFooter settings={settings} />
            </div>
        </>
    );
}
