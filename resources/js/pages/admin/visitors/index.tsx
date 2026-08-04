import { Head, Link, router } from '@inertiajs/react';
import {
    Bot,
    Download,
    Eye,
    Globe,
    Laptop,
    Link as LinkIcon,
    Loader2,
    MapPin,
    MoreHorizontal,
    Smartphone,
    Tablet,
    Trash2,
    X,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dashboard } from '@/routes/admin';
import visitors, { index } from '@/routes/admin/visitors';

type Visitor = {
    id: number;
    ip_address: string;
    url: string;
    referrer: string | null;
    user_agent: string | null;
    browser: string | null;
    browser_version: string | null;
    os: string | null;
    os_version: string | null;
    device_type: string | null;
    country: string | null;
    city: string | null;
    is_bot: boolean;
    created_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

type Counts = {
    total: number;
    today: number;
    uniqueIpsToday: number;
    bots: number;
};

const DEVICE_OPTIONS = ['desktop', 'mobile', 'tablet', 'bot'] as const;

const DEVICE_ICONS: Record<string, typeof Laptop> = {
    desktop: Laptop,
    mobile: Smartphone,
    tablet: Tablet,
    bot: Bot,
};

function DeviceBadge({ deviceType }: { deviceType: string | null }) {
    const Icon = (deviceType && DEVICE_ICONS[deviceType]) || Laptop;

    return (
        <Badge variant="outline" className="gap-1.5 capitalize">
            <Icon className="size-3.5" />
            {deviceType ?? 'unknown'}
        </Badge>
    );
}

export default function VisitorsIndex({
    visitors: paginated,
    filters,
    counts,
}: {
    visitors: Paginated<Visitor>;
    filters: {
        device_type?: string;
        country?: string;
        from?: string;
        to?: string;
        hideBots: boolean;
    };
    counts: Counts;
}) {
    const [country, setCountry] = useState(filters.country ?? '');
    const [viewing, setViewing] = useState<Visitor | null>(null);
    const [pendingDelete, setPendingDelete] = useState<Visitor[] | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const pageIds = useMemo(
        () => paginated.data.map((v) => v.id),
        [paginated.data],
    );
    const allOnPageSelected =
        pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
    const someOnPageSelected = pageIds.some((id) => selectedIds.has(id));
    const selectedVisitors = paginated.data.filter((v) =>
        selectedIds.has(v.id),
    );

    function toggleSelectAll() {
        setSelectedIds((current) => {
            const next = new Set(current);

            if (allOnPageSelected) {
                pageIds.forEach((id) => next.delete(id));
            } else {
                pageIds.forEach((id) => next.add(id));
            }

            return next;
        });
    }

    function toggleSelect(id: number) {
        setSelectedIds((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    function updateFilters(next: Partial<typeof filters>) {
        router.get(
            index().url,
            { ...filters, ...next },
            { preserveState: true, preserveScroll: true },
        );
    }

    function confirmDelete() {
        if (!pendingDelete || pendingDelete.length === 0) {
            return;
        }

        setDeleting(true);

        const ids = pendingDelete.map((v) => v.id);
        const onFinish = () => {
            setDeleting(false);
            setPendingDelete(null);
            setSelectedIds((current) => {
                const next = new Set(current);
                ids.forEach((id) => next.delete(id));

                return next;
            });
        };

        if (pendingDelete.length === 1) {
            router.delete(visitors.destroy(pendingDelete[0]).url, {
                preserveScroll: true,
                onFinish,
            });
        } else {
            router.delete(visitors.bulkDestroy().url, {
                data: { ids },
                preserveScroll: true,
                onFinish,
            });
        }
    }

    const statCards: { key: keyof Counts; label: string }[] = [
        { key: 'total', label: 'Total Visits' },
        { key: 'today', label: 'Today' },
        { key: 'uniqueIpsToday', label: 'Unique IPs Today' },
        { key: 'bots', label: 'Bots Detected' },
    ];

    return (
        <>
            <Head title="Visitors" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-center justify-between [&>header]:mb-0">
                    <Heading
                        title="Visitors"
                        description="See who's visiting your public site."
                    />

                    <Button variant="outline" asChild>
                        <a href={visitors.export().url}>
                            <Download className="size-4" />
                            Export CSV
                        </a>
                    </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <div key={card.key} className="rounded-xl border p-4">
                            <p className="text-sm text-muted-foreground">
                                {card.label}
                            </p>
                            <p className="mt-1 text-2xl font-semibold">
                                {counts[card.key]}
                            </p>
                        </div>
                    ))}
                </div>

                <Card>
                    <CardContent className="flex flex-wrap items-end gap-3 pt-6">
                        <div className="grid min-w-40 gap-1.5">
                            <label className="text-sm text-muted-foreground">
                                Country
                            </label>
                            <Input
                                placeholder="e.g. United States"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateFilters({
                                            country: country || undefined,
                                        });
                                    }
                                }}
                                onBlur={() =>
                                    updateFilters({
                                        country: country || undefined,
                                    })
                                }
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm text-muted-foreground">
                                Device
                            </label>
                            <Select
                                value={filters.device_type ?? 'all'}
                                onValueChange={(value) =>
                                    updateFilters({
                                        device_type:
                                            value === 'all' ? undefined : value,
                                    })
                                }
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="All devices" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All devices
                                    </SelectItem>
                                    {DEVICE_OPTIONS.map((type) => (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                            className="capitalize"
                                        >
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm text-muted-foreground">
                                From
                            </label>
                            <Input
                                type="date"
                                defaultValue={filters.from ?? ''}
                                className="w-40"
                                onChange={(e) =>
                                    updateFilters({
                                        from: e.target.value || undefined,
                                    })
                                }
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm text-muted-foreground">
                                To
                            </label>
                            <Input
                                type="date"
                                defaultValue={filters.to ?? ''}
                                className="w-40"
                                onChange={(e) =>
                                    updateFilters({
                                        to: e.target.value || undefined,
                                    })
                                }
                            />
                        </div>

                        <label className="flex items-center gap-2 pb-2 text-sm text-muted-foreground">
                            <Checkbox
                                checked={filters.hideBots}
                                onCheckedChange={(checked) =>
                                    updateFilters({ hideBots: !!checked })
                                }
                            />
                            Hide bots
                        </label>

                        {(filters.device_type ||
                            filters.country ||
                            filters.from ||
                            filters.to) && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setCountry('');
                                    router.get(
                                        index().url,
                                        { hideBots: filters.hideBots },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                        },
                                    );
                                }}
                            >
                                Clear filters
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {selectedVisitors.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-accent/40 p-3">
                        <span className="text-sm font-medium">
                            {selectedVisitors.length} selected
                        </span>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setPendingDelete(selectedVisitors)}
                        >
                            <Trash2 className="size-4" />
                            Delete
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto"
                            onClick={() => setSelectedIds(new Set())}
                        >
                            <X className="size-4" />
                            Clear selection
                        </Button>
                    </div>
                )}

                <div className="overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">
                                    <Checkbox
                                        checked={
                                            allOnPageSelected
                                                ? true
                                                : someOnPageSelected
                                                  ? 'indeterminate'
                                                  : false
                                        }
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Browser</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Visited</TableHead>
                                <TableHead className="w-12 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.data.map((visitor) => (
                                <TableRow
                                    key={visitor.id}
                                    className="cursor-pointer"
                                    data-state={
                                        selectedIds.has(visitor.id)
                                            ? 'selected'
                                            : undefined
                                    }
                                    onClick={() => setViewing(visitor)}
                                >
                                    <TableCell
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Checkbox
                                            checked={selectedIds.has(
                                                visitor.id,
                                            )}
                                            onCheckedChange={() =>
                                                toggleSelect(visitor.id)
                                            }
                                            aria-label={`Select ${visitor.ip_address}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {visitor.ip_address}
                                    </TableCell>
                                    <TableCell>
                                        {visitor.city || visitor.country ? (
                                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                                <MapPin className="size-3.5" />
                                                {[visitor.city, visitor.country]
                                                    .filter(Boolean)
                                                    .join(', ')}
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {visitor.browser ?? 'Unknown'}
                                        {visitor.browser_version
                                            ? ` ${visitor.browser_version}`
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        <DeviceBadge
                                            deviceType={visitor.device_type}
                                        />
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(
                                            visitor.created_at,
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell
                                        className="text-right"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-48"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        setViewing(visitor)
                                                    }
                                                >
                                                    <Eye className="size-4" />
                                                    View details
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={() =>
                                                        setPendingDelete([
                                                            visitor,
                                                        ])
                                                    }
                                                >
                                                    <Trash2 className="size-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {paginated.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-32 text-center text-muted-foreground"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <XCircle className="size-6 text-muted-foreground/50" />
                                            No visits recorded yet.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {paginated.links.length > 3 && (
                    <div className="flex flex-wrap gap-1">
                        {paginated.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveScroll>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </Link>
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <Dialog
                open={!!viewing}
                onOpenChange={(open) => !open && setViewing(null)}
            >
                <DialogContent className="sm:max-w-lg">
                    {viewing && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    {viewing.ip_address}
                                    {viewing.is_bot && (
                                        <Badge
                                            variant="outline"
                                            className="gap-1"
                                        >
                                            <Bot className="size-3" />
                                            Bot
                                        </Badge>
                                    )}
                                </DialogTitle>
                                <DialogDescription>
                                    Visited{' '}
                                    {new Date(
                                        viewing.created_at,
                                    ).toLocaleString()}
                                </DialogDescription>
                            </DialogHeader>

                            <dl className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <MapPin className="size-3.5" />
                                        Location
                                    </dt>
                                    <dd>
                                        {[viewing.city, viewing.country]
                                            .filter(Boolean)
                                            .join(', ') || '—'}
                                    </dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Globe className="size-3.5" />
                                        Browser
                                    </dt>
                                    <dd>
                                        {viewing.browser ?? 'Unknown'}
                                        {viewing.browser_version
                                            ? ` ${viewing.browser_version}`
                                            : ''}
                                    </dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Laptop className="size-3.5" />
                                        Operating System
                                    </dt>
                                    <dd>
                                        {viewing.os ?? 'Unknown'}
                                        {viewing.os_version
                                            ? ` ${viewing.os_version}`
                                            : ''}
                                    </dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Smartphone className="size-3.5" />
                                        Device
                                    </dt>
                                    <dd className="capitalize">
                                        {viewing.device_type ?? 'unknown'}
                                    </dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <LinkIcon className="size-3.5" />
                                        Page
                                    </dt>
                                    <dd className="break-all">{viewing.url}</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <LinkIcon className="size-3.5" />
                                        Referrer
                                    </dt>
                                    <dd className="break-all">
                                        {viewing.referrer ?? '—'}
                                    </dd>
                                </div>
                            </dl>

                            {viewing.user_agent && (
                                <div className="space-y-1">
                                    <dt className="text-sm text-muted-foreground">
                                        User Agent
                                    </dt>
                                    <dd className="rounded-lg border bg-muted/40 p-3 text-xs break-all">
                                        {viewing.user_agent}
                                    </dd>
                                </div>
                            )}

                            <DialogFooter>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setPendingDelete([viewing]);
                                        setViewing(null);
                                    }}
                                >
                                    <Trash2 className="size-4" />
                                    Delete
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setViewing(null)}
                                >
                                    Close
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={!!pendingDelete}
                onOpenChange={(open) => !open && setPendingDelete(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {pendingDelete && pendingDelete.length > 1
                                ? `Delete ${pendingDelete.length} visit records?`
                                : 'Delete visit record?'}
                        </DialogTitle>
                        <DialogDescription>
                            {pendingDelete && pendingDelete.length > 1 ? (
                                <>
                                    This will permanently remove{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingDelete.length} visit records
                                    </span>
                                    . This action cannot be undone.
                                </>
                            ) : (
                                <>
                                    This will permanently remove the visit
                                    record for{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingDelete?.[0]?.ip_address}
                                    </span>
                                    . This action cannot be undone.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDelete(null)}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleting}
                        >
                            {deleting && (
                                <Loader2 className="size-4 animate-spin" />
                            )}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

VisitorsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Visitors', href: index() },
    ],
};
