import type { ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const { ref, inView } = useInView<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out',
                inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                className,
            )}
            style={{ transitionDelay: `${delay * 1000}ms` }}
        >
            {children}
        </div>
    );
}

export function RevealGroup({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={className}>{children}</div>;
}

export function RevealItem({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return <Reveal className={className}>{children}</Reveal>;
}
