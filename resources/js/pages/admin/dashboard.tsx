import { Head, Link, router } from '@inertiajs/react';
import { MessageSquareText, Rows3, Settings } from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    XAxis,
    YAxis,
} from 'recharts';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
    
} from '@/components/ui/chart';
import type {ChartConfig} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { dashboard } from '@/routes/admin';
import { index as demoRequestsIndex } from '@/routes/admin/demo-requests';
import { index as sectionsIndex } from '@/routes/admin/sections';
import { edit as siteSettingsEdit } from '@/routes/admin/site-settings';

type Stats = {
    totalDemoRequests: number;
    newThisWeek: number;
    sectionsEnabled: number;
    sectionsTotal: number;
};

type TrendPoint = { date: string; count: number };

type StatusCounts = {
    new: number;
    contacted: number;
    converted: number;
    closed: number;
};

type DeviceCounts = {
    desktop: number;
    mobile: number;
    tablet: number;
    bot: number;
};

const RANGE_OPTIONS = [7, 30, 90] as const;

// Mirrors the status badge colors used on the Demo Requests page
// (resources/js/pages/admin/demo-requests/index.tsx `STATUS_STYLES`) so the
// same status always reads as the same color across the admin.
const STATUS_COLORS: Record<keyof StatusCounts, string> = {
    new: '#3b82f6',
    contacted: '#f59e0b',
    converted: '#10b981',
    closed: '#71717a',
};

const DEVICE_COLORS: Record<keyof DeviceCounts, string> = {
    desktop: 'var(--chart-1)',
    mobile: 'var(--chart-2)',
    tablet: 'var(--chart-3)',
    bot: 'var(--chart-4)',
};

const demoRequestsTrendConfig = {
    count: { label: 'Demo requests', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const visitorsTrendConfig = {
    count: { label: 'Visitors', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const statusConfig = {
    new: { label: 'New', color: STATUS_COLORS.new },
    contacted: { label: 'Contacted', color: STATUS_COLORS.contacted },
    converted: { label: 'Converted', color: STATUS_COLORS.converted },
    closed: { label: 'Closed', color: STATUS_COLORS.closed },
} satisfies ChartConfig;

const deviceConfig = {
    desktop: { label: 'Desktop', color: DEVICE_COLORS.desktop },
    mobile: { label: 'Mobile', color: DEVICE_COLORS.mobile },
    tablet: { label: 'Tablet', color: DEVICE_COLORS.tablet },
    bot: { label: 'Bot', color: DEVICE_COLORS.bot },
} satisfies ChartConfig;

function formatShortDate(value: string) {
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AdminDashboard({
    stats,
    range,
    demoRequestsTrend,
    visitorsTrend,
    demoRequestsByStatus,
    visitorsByDevice,
}: {
    stats: Stats;
    range: number;
    demoRequestsTrend: TrendPoint[];
    visitorsTrend: TrendPoint[];
    demoRequestsByStatus: StatusCounts;
    visitorsByDevice: DeviceCounts;
}) {
    function updateRange(value: string) {
        router.get(
            dashboard().url,
            { range: value },
            { preserveState: true, preserveScroll: true },
        );
    }

    const statusData = (Object.keys(demoRequestsByStatus) as (keyof StatusCounts)[]).map(
        (status) => ({
            status,
            label: capitalize(status),
            count: demoRequestsByStatus[status],
        }),
    );

    const deviceData = (Object.keys(visitorsByDevice) as (keyof DeviceCounts)[]).map(
        (device) => ({
            device,
            label: capitalize(device),
            count: visitorsByDevice[device],
        }),
    );

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4 [&>header]:mb-0">
                    <Heading
                        title="Dashboard"
                        description="An overview of your site's content, demo requests, and visitors."
                    />

                    <Select value={String(range)} onValueChange={updateRange}>
                        <SelectTrigger className="w-44">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {RANGE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={String(option)}>
                                    Last {option} days
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Demo Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">{stats.totalDemoRequests}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                New This Week
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">{stats.newThisWeek}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Sections Enabled
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-semibold">
                                {stats.sectionsEnabled} / {stats.sectionsTotal}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Demo Requests Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={demoRequestsTrendConfig} className="h-64 w-full">
                                <AreaChart data={demoRequestsTrend} margin={{ left: 0, right: 12 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatShortDate}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={24}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        width={32}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent labelFormatter={(value) => formatShortDate(String(value))} />
                                        }
                                    />
                                    <Area
                                        dataKey="count"
                                        type="monotone"
                                        fill="var(--color-count)"
                                        fillOpacity={0.1}
                                        stroke="var(--color-count)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visitors Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={visitorsTrendConfig} className="h-64 w-full">
                                <AreaChart data={visitorsTrend} margin={{ left: 0, right: 12 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatShortDate}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={24}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        width={32}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent labelFormatter={(value) => formatShortDate(String(value))} />
                                        }
                                    />
                                    <Area
                                        dataKey="count"
                                        type="monotone"
                                        fill="var(--color-count)"
                                        fillOpacity={0.1}
                                        stroke="var(--color-count)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Demo Requests by Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={statusConfig} className="h-64 w-full">
                                <BarChart data={statusData} margin={{ left: 0, right: 12 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        width={32}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="count" radius={4} maxBarSize={48}>
                                        {statusData.map((entry) => (
                                            <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visitors by Device Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={deviceConfig} className="h-64 w-full">
                                <BarChart data={deviceData} margin={{ left: 0, right: 12 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        width={32}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="count" radius={4} maxBarSize={48}>
                                        {deviceData.map((entry) => (
                                            <Cell key={entry.device} fill={DEVICE_COLORS[entry.device]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                        href={sectionsIndex()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <Rows3 className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Manage Sections</p>
                            <p className="text-sm text-muted-foreground">Edit content and order</p>
                        </div>
                    </Link>

                    <Link
                        href={demoRequestsIndex()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <MessageSquareText className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Demo Requests</p>
                            <p className="text-sm text-muted-foreground">Review and follow up</p>
                        </div>
                    </Link>

                    <Link
                        href={siteSettingsEdit()}
                        className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                        <Settings className="size-5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Site Settings</p>
                            <p className="text-sm text-muted-foreground">SEO, contact & branding</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
