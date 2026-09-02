import { LineChart } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Fallback logo mark shown when no `settings.logo_url` is configured — a
 * gradient square with a chart glyph, matching the reference brand mockups.
 */
export function BrandMark({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white',
                className,
            )}
            aria-hidden
        >
            <LineChart className="size-[55%]" strokeWidth={2.5} />
        </span>
    );
}

/** Two-tone wordmark: colors a trailing "CRM" (if present) in indigo. */
export function SiteWordmark({ title, className }: { title: string; className?: string }) {
    if (title.toUpperCase().endsWith('CRM') && title.length > 3) {
        const base = title.slice(0, -3);
        const suffix = title.slice(-3);

        return (
            <span className={className}>
                {base}
                <span className="text-indigo-600">{suffix}</span>
            </span>
        );
    }

    return <span className={className}>{title}</span>;
}
