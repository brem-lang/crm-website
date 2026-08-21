import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
            {/* Brand-colored ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-400/25 via-blue-500/15 to-transparent blur-3xl" />
                <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl dark:bg-blue-700/10" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <img
                                src="/images/alphamastercrm-logo.png"
                                alt={title}
                                className="mt-6 h-16 w-auto drop-shadow-[0_4px_18px_rgba(37,99,235,0.35)]"
                            />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1.5 text-center">
                            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {title}
                            </h1>
                            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/20">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
