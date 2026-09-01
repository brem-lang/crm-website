import type { ReactNode } from 'react';

/** macOS-style window chrome wrapper used around dashboard mockups in the
 *  hero and feature-explainer sections, so every mockup shares the same
 *  light, bordered "app screenshot" frame. */
export function BrowserMock({
    title,
    children,
    className,
    noPadding,
}: {
    title?: string;
    children: ReactNode;
    className?: string;
    /** Skip the inner padding — for real screenshots that should fill the frame. */
    noPadding?: boolean;
}) {
    return (
        <div
            className={`overflow-hidden rounded-2xl border bg-card shadow-xl shadow-slate-900/5 ${className ?? ''}`}
        >
            <div className="flex items-center gap-1.5 border-b bg-muted/40 px-4 py-3">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-yellow-400" />
                <span className="size-2.5 rounded-full bg-green-400" />
                {title && (
                    <span className="ml-2 text-xs font-medium text-muted-foreground">
                        {title}
                    </span>
                )}
            </div>
            <div className={noPadding ? undefined : 'p-4'}>{children}</div>
        </div>
    );
}
