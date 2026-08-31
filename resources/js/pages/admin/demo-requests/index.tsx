import { Head, router } from '@inertiajs/react';
import {
    Briefcase,
    Building2,
    CheckCircle2,
    Circle,
    Download,
    Eye,
    Globe,
    Loader2,
    MessageSquareText,
    MoreHorizontal,
    Phone,
    RotateCcw,
    Search,
    Send,
    SendHorizonal,
    Trash2,
    X,
    XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import Heading from '@/components/heading';
import { TablePagination } from '@/components/table-pagination';
import type { Paginated } from '@/components/table-pagination';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { telegramUrl } from '@/lib/telegram';
import { dashboard } from '@/routes/admin';
import demoRequests, { index } from '@/routes/admin/demo-requests';

type SentCredential = {
    id: number;
    url: string;
    login_email: string;
    created_at: string;
};

type DemoRequest = {
    id: number;
    name: string;
    company: string;
    telegram_username: string;
    phone: string;
    country: string;
    business_type: string;
    message: string | null;
    status: string;
    created_at: string;
    deleted_at: string | null;
    sent_credentials: SentCredential[];
};

type Counts = {
    all: number;
    new: number;
    contacted: number;
    converted: number;
    closed: number;
    trashed: number;
};

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'] as const;

const STATUS_STYLES: Record<string, string> = {
    new: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    contacted: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    converted: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    closed: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-400',
};

function StatusBadge({ status }: { status: string }) {
    return (
        <Badge
            variant="outline"
            className={`gap-1.5 capitalize ${STATUS_STYLES[status] ?? ''}`}
        >
            <Circle className="size-1.5 fill-current" />
            {status}
        </Badge>
    );
}

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('');
}

export default function DemoRequestsIndex({
    demoRequests: paginated,
    filters,
    counts,
}: {
    demoRequests: Paginated<DemoRequest>;
    filters: {
        status?: string;
        from?: string;
        to?: string;
        search?: string;
        per_page?: number | string;
        trashed?: string;
    };
    counts: Counts;
}) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [viewing, setViewing] = useState<DemoRequest | null>(null);
    const [pendingDelete, setPendingDelete] = useState<DemoRequest[] | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [pendingForceDelete, setPendingForceDelete] = useState<DemoRequest[] | null>(null);
    const [forceDeleting, setForceDeleting] = useState(false);
    const [restoringId, setRestoringId] = useState<number | null>(null);
    const [bulkRestoring, setBulkRestoring] = useState(false);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [bulkUpdating, setBulkUpdating] = useState(false);
    const [sendingCredentialsTo, setSendingCredentialsTo] = useState<DemoRequest | null>(null);
    const [credentialsForm, setCredentialsForm] = useState({ url: '', email: '', password: '' });
    const [credentialsErrors, setCredentialsErrors] = useState<Record<string, string>>({});
    const [sendingCredentials, setSendingCredentials] = useState(false);

    const viewingTrashed = filters.trashed === 'only';

    const pageIds = useMemo(() => paginated.data.map((r) => r.id), [paginated.data]);
    const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
    const someOnPageSelected = pageIds.some((id) => selectedIds.has(id));
    const selectedRequests = paginated.data.filter((r) => selectedIds.has(r.id));

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

    function updateStatus(request: DemoRequest, status: string) {
        setUpdatingId(request.id);
        router.patch(
            demoRequests.update(request).url,
            { status },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setUpdatingId(null),
                onSuccess: () => {
                    setViewing((current) =>
                        current?.id === request.id ? { ...current, status } : current,
                    );
                },
            },
        );
    }

    function confirmDelete() {
        if (!pendingDelete || pendingDelete.length === 0) {
            return;
        }

        setDeleting(true);

        const ids = pendingDelete.map((r) => r.id);
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
            router.delete(demoRequests.destroy(pendingDelete[0]).url, {
                preserveScroll: true,
                onFinish,
            });
        } else {
            router.delete(demoRequests.bulkDestroy().url, {
                data: { ids },
                preserveScroll: true,
                onFinish,
            });
        }
    }

    function restoreOne(request: DemoRequest) {
        setRestoringId(request.id);
        router.post(demoRequests.restore(request).url, {}, {
            preserveScroll: true,
            onFinish: () => setRestoringId(null),
        });
    }

    function restoreSelected() {
        if (selectedRequests.length === 0) {
            return;
        }

        setBulkRestoring(true);
        router.post(
            demoRequests.bulkRestore().url,
            { ids: selectedRequests.map((r) => r.id) },
            {
                preserveScroll: true,
                onFinish: () => {
                    setBulkRestoring(false);
                    setSelectedIds(new Set());
                },
            },
        );
    }

    function confirmForceDelete() {
        if (!pendingForceDelete || pendingForceDelete.length === 0) {
            return;
        }

        setForceDeleting(true);

        const ids = pendingForceDelete.map((r) => r.id);
        const onFinish = () => {
            setForceDeleting(false);
            setPendingForceDelete(null);
            setSelectedIds((current) => {
                const next = new Set(current);
                ids.forEach((id) => next.delete(id));

                return next;
            });
        };

        if (pendingForceDelete.length === 1) {
            router.delete(demoRequests.forceDestroy(pendingForceDelete[0]).url, {
                preserveScroll: true,
                onFinish,
            });
        } else {
            router.delete(demoRequests.bulkForceDestroy().url, {
                data: { ids },
                preserveScroll: true,
                onFinish,
            });
        }
    }

    function openSendCredentials(request: DemoRequest) {
        setSendingCredentialsTo(request);
        setCredentialsForm({ url: '', email: '', password: '' });
        setCredentialsErrors({});
    }

    function submitSendCredentials() {
        if (!sendingCredentialsTo) {
            return;
        }

        setSendingCredentials(true);
        router.post(demoRequests.sendCredentials(sendingCredentialsTo).url, credentialsForm, {
            preserveScroll: true,
            onSuccess: () => setSendingCredentialsTo(null),
            onError: (errors) => setCredentialsErrors(errors as Record<string, string>),
            onFinish: () => setSendingCredentials(false),
        });
    }

    function bulkUpdateStatus(status: string) {
        if (selectedRequests.length === 0) {
            return;
        }

        setBulkUpdating(true);
        router.patch(
            demoRequests.bulkUpdate().url,
            { ids: selectedRequests.map((r) => r.id), status },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setBulkUpdating(false),
            },
        );
    }

    const statCards: { key: keyof Counts; label: string; filterValue?: string }[] = [
        { key: 'all', label: 'Total' },
        { key: 'new', label: 'New', filterValue: 'new' },
        { key: 'contacted', label: 'Contacted', filterValue: 'contacted' },
        { key: 'converted', label: 'Converted', filterValue: 'converted' },
        { key: 'closed', label: 'Closed', filterValue: 'closed' },
    ];

    function viewTrash() {
        setSelectedIds(new Set());
        router.get(
            index().url,
            { trashed: 'only' },
            { preserveState: true, preserveScroll: true },
        );
    }

    function viewActive() {
        setSelectedIds(new Set());
        router.get(index().url, {}, { preserveState: true, preserveScroll: true });
    }

    return (
        <>
            <Head title="Demo Requests" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-center justify-between [&>header]:mb-0">
                    <Heading
                        title={viewingTrashed ? 'Trashed Demo Requests' : 'Demo Requests'}
                        description={
                            viewingTrashed
                                ? 'Restore or permanently delete trashed submissions.'
                                : 'Review submissions and follow up with prospects.'
                        }
                    />

                    <div className="flex items-center gap-2">
                        {viewingTrashed ? (
                            <Button variant="outline" onClick={viewActive}>
                                Back to Demo Requests
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline" onClick={viewTrash}>
                                    <Trash2 className="size-4" />
                                    Trash ({counts.trashed})
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href={demoRequests.export().url}>
                                        <Download className="size-4" />
                                        Export CSV
                                    </a>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {!viewingTrashed && (
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {statCards.map((card) => {
                        const active = card.filterValue
                            ? filters.status === card.filterValue
                            : !filters.status;

                        return (
                            <button
                                key={card.key}
                                type="button"
                                onClick={() => updateFilters({ status: card.filterValue })}
                                className={`rounded-xl border p-4 text-left transition-colors hover:bg-accent ${
                                    active ? 'border-primary bg-accent/60' : ''
                                }`}
                            >
                                <p className="text-sm text-muted-foreground">{card.label}</p>
                                <p className="mt-1 text-2xl font-semibold">{counts[card.key]}</p>
                            </button>
                        );
                    })}
                </div>
                )}

                <Card>
                    <CardContent className="flex flex-wrap items-end gap-3">
                        <div className="grid min-w-55 flex-1 gap-1.5">
                            <label className="text-sm text-muted-foreground">Search</label>
                            <div className="relative">
                                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    className="pl-8"
                                    placeholder="Name, company, or Telegram username…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            updateFilters({ search: search || undefined });
                                        }
                                    }}
                                    onBlur={() => updateFilters({ search: search || undefined })}
                                />
                            </div>
                        </div>

                        {!viewingTrashed && (
                            <div className="grid gap-1.5">
                                <label className="text-sm text-muted-foreground">Status</label>
                                <Select
                                    value={filters.status ?? 'all'}
                                    onValueChange={(value) =>
                                        updateFilters({ status: value === 'all' ? undefined : value })
                                    }
                                >
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="All statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All statuses</SelectItem>
                                        {STATUS_OPTIONS.map((status) => (
                                            <SelectItem key={status} value={status} className="capitalize">
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="grid gap-1.5">
                            <label className="text-sm text-muted-foreground">From</label>
                            <Input
                                type="date"
                                defaultValue={filters.from ?? ''}
                                className="w-40"
                                onChange={(e) => updateFilters({ from: e.target.value || undefined })}
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm text-muted-foreground">To</label>
                            <Input
                                type="date"
                                defaultValue={filters.to ?? ''}
                                className="w-40"
                                onChange={(e) => updateFilters({ to: e.target.value || undefined })}
                            />
                        </div>

                        {(filters.status || filters.from || filters.to || filters.search) && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setSearch('');
                                    router.get(
                                        index().url,
                                        viewingTrashed ? { trashed: 'only' } : {},
                                        { preserveState: true, preserveScroll: true },
                                    );
                                }}
                            >
                                Clear filters
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {selectedRequests.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-accent/40 p-3">
                        <span className="text-sm font-medium">
                            {selectedRequests.length} selected
                        </span>

                        {viewingTrashed ? (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={bulkRestoring}
                                    onClick={restoreSelected}
                                >
                                    {bulkRestoring ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        <RotateCcw className="size-4" />
                                    )}
                                    Restore
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setPendingForceDelete(selectedRequests)}
                                >
                                    <Trash2 className="size-4" />
                                    Delete permanently
                                </Button>
                            </>
                        ) : (
                            <>
                                <Select onValueChange={bulkUpdateStatus} disabled={bulkUpdating}>
                                    <SelectTrigger className="w-44">
                                        <SelectValue placeholder="Mark as…" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((status) => (
                                            <SelectItem key={status} value={status} className="capitalize">
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {bulkUpdating && <Loader2 className="size-4 animate-spin text-muted-foreground" />}

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setPendingDelete(selectedRequests)}
                                >
                                    <Trash2 className="size-4" />
                                    Delete
                                </Button>
                            </>
                        )}

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
                                <TableHead>Name</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Telegram</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead className="w-12 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.data.map((request) => (
                                <TableRow
                                    key={request.id}
                                    className="cursor-pointer"
                                    data-state={selectedIds.has(request.id) ? 'selected' : undefined}
                                    onClick={() => setViewing(request)}
                                >
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedIds.has(request.id)}
                                            onCheckedChange={() => toggleSelect(request.id)}
                                            aria-label={`Select ${request.name}`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-8">
                                                <AvatarFallback className="text-xs">
                                                    {initials(request.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{request.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <Building2 className="size-3.5" />
                                            {request.company}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={telegramUrl(request.telegram_username)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-muted-foreground hover:text-foreground hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {request.telegram_username}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <StatusBadge status={request.status} />
                                            {updatingId === request.id && (
                                                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(request.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell
                                        className="text-right"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-8">
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem onClick={() => setViewing(request)}>
                                                    <Eye className="size-4" />
                                                    View details
                                                </DropdownMenuItem>

                                                {viewingTrashed ? (
                                                    <>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            disabled={restoringId === request.id}
                                                            onClick={() => restoreOne(request)}
                                                        >
                                                            <RotateCcw className="size-4" />
                                                            Restore
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            variant="destructive"
                                                            onClick={() => setPendingForceDelete([request])}
                                                        >
                                                            <Trash2 className="size-4" />
                                                            Delete permanently
                                                        </DropdownMenuItem>
                                                    </>
                                                ) : (
                                                    <>
                                                        <DropdownMenuLabel>Mark as</DropdownMenuLabel>
                                                        {STATUS_OPTIONS.filter(
                                                            (status) => status !== request.status,
                                                        ).map((status) => (
                                                            <DropdownMenuItem
                                                                key={status}
                                                                className="capitalize"
                                                                onClick={() => updateStatus(request, status)}
                                                            >
                                                                <CheckCircle2 className="size-4" />
                                                                {status}
                                                            </DropdownMenuItem>
                                                        ))}

                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            variant="destructive"
                                                            onClick={() => setPendingDelete([request])}
                                                        >
                                                            <Trash2 className="size-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {paginated.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <XCircle className="size-6 text-muted-foreground/50" />
                                            {viewingTrashed ? 'No trashed demo requests.' : 'No demo requests found.'}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <TablePagination
                    paginated={paginated}
                    baseUrl={index().url}
                    filters={filters}
                />
            </div>

            <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
                <DialogContent className="sm:max-w-lg">
                    {viewing && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10">
                                        <AvatarFallback>{initials(viewing.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <DialogTitle>{viewing.name}</DialogTitle>
                                        <DialogDescription className="flex items-center gap-1.5">
                                            <Building2 className="size-3.5" />
                                            {viewing.company}
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/40 p-3">
                                <div className="flex items-center gap-1.5">
                                    <StatusBadge status={viewing.status} />
                                    {updatingId === viewing.id && (
                                        <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                                    )}
                                </div>
                                {!viewingTrashed && (
                                    <Select
                                        value={viewing.status}
                                        onValueChange={(status) => updateStatus(viewing, status)}
                                    >
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {STATUS_OPTIONS.map((status) => (
                                                <SelectItem key={status} value={status} className="capitalize">
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            <dl className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <SendHorizonal className="size-3.5" />
                                        Telegram
                                    </dt>
                                    <dd className="break-all">
                                        <a
                                            href={telegramUrl(viewing.telegram_username)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:underline"
                                        >
                                            {viewing.telegram_username}
                                        </a>
                                    </dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Phone className="size-3.5" />
                                        Phone
                                    </dt>
                                    <dd>{viewing.phone}</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Globe className="size-3.5" />
                                        Country
                                    </dt>
                                    <dd>{viewing.country}</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-muted-foreground">
                                        <Briefcase className="size-3.5" />
                                        Business Type
                                    </dt>
                                    <dd>{viewing.business_type}</dd>
                                </div>
                            </dl>

                            {viewing.message && (
                                <div className="space-y-1">
                                    <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <MessageSquareText className="size-3.5" />
                                        Message
                                    </dt>
                                    <dd className="rounded-lg border bg-muted/40 p-3 text-sm whitespace-pre-wrap">
                                        {viewing.message}
                                    </dd>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Send className="size-3.5" />
                                    Credentials Sent
                                </dt>
                                {viewing.sent_credentials.length > 0 ? (
                                    <ul className="space-y-2">
                                        {viewing.sent_credentials.map((sent) => (
                                            <li
                                                key={sent.id}
                                                className="rounded-lg border bg-muted/40 p-3 text-sm"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-medium break-all">
                                                        {sent.login_email}
                                                    </span>
                                                    <span className="shrink-0 text-xs text-muted-foreground">
                                                        {new Date(sent.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="mt-1 break-all text-xs text-muted-foreground">
                                                    {sent.url}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No credentials sent yet.
                                    </p>
                                )}
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Submitted {new Date(viewing.created_at).toLocaleString()}
                            </p>

                            <DialogFooter>
                                {viewingTrashed ? (
                                    <>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                setPendingForceDelete([viewing]);
                                                setViewing(null);
                                            }}
                                        >
                                            <Trash2 className="size-4" />
                                            Delete permanently
                                        </Button>
                                        <Button
                                            variant="outline"
                                            disabled={restoringId === viewing.id}
                                            onClick={() => {
                                                restoreOne(viewing);
                                                setViewing(null);
                                            }}
                                        >
                                            <RotateCcw className="size-4" />
                                            Restore
                                        </Button>
                                    </>
                                ) : (
                                    <>
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
                                            onClick={() => {
                                                openSendCredentials(viewing);
                                                setViewing(null);
                                            }}
                                        >
                                            <Send className="size-4" />
                                            Send credentials
                                        </Button>
                                    </>
                                )}
                                <Button variant="outline" onClick={() => setViewing(null)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={!!sendingCredentialsTo}
                onOpenChange={(open) => !open && setSendingCredentialsTo(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send login credentials</DialogTitle>
                        <DialogDescription>
                            Fill these in, then message{' '}
                            {sendingCredentialsTo && (
                                <a
                                    href={telegramUrl(sendingCredentialsTo.telegram_username)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-foreground hover:underline"
                                >
                                    {sendingCredentialsTo.telegram_username}
                                </a>
                            )}{' '}
                            on Telegram yourself — this just records that it was sent.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="send-credentials-url">URL</Label>
                            <Input
                                id="send-credentials-url"
                                placeholder="https://app.alphamastercrm.test"
                                value={credentialsForm.url}
                                onChange={(e) =>
                                    setCredentialsForm((f) => ({ ...f, url: e.target.value }))
                                }
                            />
                            {credentialsErrors.url && (
                                <p className="text-xs text-destructive">{credentialsErrors.url}</p>
                            )}
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="send-credentials-email">Email (login username)</Label>
                            <Input
                                id="send-credentials-email"
                                type="email"
                                placeholder="user@example.com"
                                value={credentialsForm.email}
                                onChange={(e) =>
                                    setCredentialsForm((f) => ({ ...f, email: e.target.value }))
                                }
                            />
                            {credentialsErrors.email && (
                                <p className="text-xs text-destructive">{credentialsErrors.email}</p>
                            )}
                        </div>

                        <div className="grid gap-1.5">
                            <Label htmlFor="send-credentials-password">Password</Label>
                            <Input
                                id="send-credentials-password"
                                placeholder="Temporary password"
                                value={credentialsForm.password}
                                onChange={(e) =>
                                    setCredentialsForm((f) => ({ ...f, password: e.target.value }))
                                }
                            />
                            {credentialsErrors.password && (
                                <p className="text-xs text-destructive">{credentialsErrors.password}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setSendingCredentialsTo(null)}
                            disabled={sendingCredentials}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={submitSendCredentials}
                            disabled={
                                sendingCredentials ||
                                !credentialsForm.url ||
                                !credentialsForm.email ||
                                !credentialsForm.password
                            }
                        >
                            {sendingCredentials ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <Send className="size-4" />
                            )}
                            Mark as sent
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {pendingDelete && pendingDelete.length > 1
                                ? `Move ${pendingDelete.length} demo requests to trash?`
                                : 'Move demo request to trash?'}
                        </DialogTitle>
                        <DialogDescription>
                            {pendingDelete && pendingDelete.length > 1 ? (
                                <>
                                    This will move{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingDelete.length} demo requests
                                    </span>{' '}
                                    to the trash. You can restore them later from the Trash view.
                                </>
                            ) : (
                                <>
                                    This will move{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingDelete?.[0]?.name}
                                    </span>
                                    {pendingDelete?.[0]?.company ? ` (${pendingDelete[0].company})` : ''} to the
                                    trash. You can restore it later from the Trash view.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPendingDelete(null)} disabled={deleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
                            {deleting && <Loader2 className="size-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={!!pendingForceDelete}
                onOpenChange={(open) => !open && setPendingForceDelete(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {pendingForceDelete && pendingForceDelete.length > 1
                                ? `Permanently delete ${pendingForceDelete.length} demo requests?`
                                : 'Permanently delete demo request?'}
                        </DialogTitle>
                        <DialogDescription>
                            {pendingForceDelete && pendingForceDelete.length > 1 ? (
                                <>
                                    This will permanently remove{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingForceDelete.length} demo requests
                                    </span>{' '}
                                    from AlphaMasterCRM. This action cannot be undone.
                                </>
                            ) : (
                                <>
                                    This will permanently remove{' '}
                                    <span className="font-medium text-foreground">
                                        {pendingForceDelete?.[0]?.name}
                                    </span>
                                    {pendingForceDelete?.[0]?.company
                                        ? ` (${pendingForceDelete[0].company})`
                                        : ''}{' '}
                                    from AlphaMasterCRM. This action cannot be undone.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setPendingForceDelete(null)}
                            disabled={forceDeleting}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmForceDelete} disabled={forceDeleting}>
                            {forceDeleting && <Loader2 className="size-4 animate-spin" />}
                            Delete permanently
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

DemoRequestsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Demo Requests', href: index() },
    ],
};
