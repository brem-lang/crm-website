import { Head, Link, router } from '@inertiajs/react';
import { Download } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import demoRequests, { index } from '@/routes/admin/demo-requests';

type DemoRequest = {
    id: number;
    name: string;
    company: string;
    email: string;
    status: string;
    created_at: string;
};

type Paginated<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
};

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];

const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'outline'> = {
    new: 'default',
    contacted: 'secondary',
    converted: 'default',
    closed: 'outline',
};

export default function DemoRequestsIndex({
    demoRequests: paginated,
    filters,
}: {
    demoRequests: Paginated<DemoRequest>;
    filters: { status?: string; from?: string; to?: string };
}) {
    function updateFilters(next: Partial<typeof filters>) {
        router.get(
            index().url,
            { ...filters, ...next },
            { preserveState: true, preserveScroll: true },
        );
    }

    return (
        <>
            <Head title="Demo Requests" />

            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Heading
                        title="Demo Requests"
                        description="Review submissions and follow up with prospects."
                    />

                    <Button variant="outline" asChild>
                        <a href={demoRequests.export().url}>
                            <Download className="size-4" />
                            Export CSV
                        </a>
                    </Button>
                </div>

                <div className="flex flex-wrap items-end gap-3">
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
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-1.5">
                        <label className="text-sm text-muted-foreground">From</label>
                        <Input
                            type="date"
                            defaultValue={filters.from ?? ''}
                            onChange={(e) => updateFilters({ from: e.target.value || undefined })}
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <label className="text-sm text-muted-foreground">To</label>
                        <Input
                            type="date"
                            defaultValue={filters.to ?? ''}
                            onChange={(e) => updateFilters({ to: e.target.value || undefined })}
                        />
                    </div>
                </div>

                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Submitted</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginated.data.map((request) => (
                                <TableRow
                                    key={request.id}
                                    className="cursor-pointer"
                                    onClick={() => router.visit(demoRequests.show(request).url)}
                                >
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.company}</TableCell>
                                    <TableCell>{request.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={STATUS_VARIANT[request.status] ?? 'outline'}>
                                            {request.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(request.created_at).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {paginated.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                        No demo requests found.
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
                                    <Link href={link.url}>
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </Link>
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

DemoRequestsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Demo Requests', href: index() },
    ],
};
