import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function Reveal({
    children,
    delay = 0,
    className,
    ...props
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'style'>) {
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
            {...props}
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
    ...props
}: {
    children: ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'className' | 'children' | 'style'>) {
    return (
        <Reveal className={className} {...props}>
            {children}
        </Reveal>
    );
}
