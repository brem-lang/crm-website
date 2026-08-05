import { router } from '@inertiajs/react';
import type { MouseEvent } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type PaginationLinkData = { url: string | null; label: string; active: boolean };

export type Paginated<T> = {
    data: T[];
    links: PaginationLinkData[];
    current_page: number;
    last_page: number;
    per_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

const PER_PAGE_OPTIONS = [10, 20, 50, 100];

function visitPage(url: string | null) {
    return (e: MouseEvent) => {
        e.preventDefault();

        if (url) {
            router.visit(url, { preserveScroll: true, preserveState: true });
        }
    };
}

export function TablePagination<T>({
    paginated,
    baseUrl,
    filters,
}: {
    paginated: Paginated<T>;
    baseUrl: string;
    filters: Record<string, unknown>;
}) {
    function changePerPage(value: string) {
        router.get(
            baseUrl,
            { ...filters, per_page: value, page: 1 },
            { preserveScroll: true, preserveState: true },
        );
    }

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Rows per page</span>
                    <Select
                        value={String(paginated.per_page)}
                        onValueChange={changePerPage}
                    >
                        <SelectTrigger className="w-18">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={String(option)}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <p className="text-sm text-muted-foreground">
                    Showing {paginated.from ?? 0}-{paginated.to ?? 0} of{' '}
                    {paginated.total}
                </p>
            </div>

            {paginated.links.length > 3 && (
                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        {paginated.links.map((link, i) => {
                            const isFirst = i === 0;
                            const isLast = i === paginated.links.length - 1;
                            const disabled = !link.url;

                            if (isFirst) {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationPrevious
                                            href={link.url ?? '#'}
                                            aria-disabled={disabled}
                                            className={
                                                disabled
                                                    ? 'pointer-events-none opacity-50'
                                                    : undefined
                                            }
                                            onClick={visitPage(link.url)}
                                        />
                                    </PaginationItem>
                                );
                            }

                            if (isLast) {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationNext
                                            href={link.url ?? '#'}
                                            aria-disabled={disabled}
                                            className={
                                                disabled
                                                    ? 'pointer-events-none opacity-50'
                                                    : undefined
                                            }
                                            onClick={visitPage(link.url)}
                                        />
                                    </PaginationItem>
                                );
                            }

                            if (link.label === '...') {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href={link.url ?? '#'}
                                        isActive={link.active}
                                        onClick={visitPage(link.url)}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
