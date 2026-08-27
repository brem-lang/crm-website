import { ArrowRight, BarChart3, PlayCircle, TrendingUp, Users } from 'lucide-react';

import { BrowserMock } from '@/components/sections/browser-mock';
import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function Hero({ section }: { section: PublicSection }) {
    const content = section.content ?? {};

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-0 sm:pt-28">
            <div
                className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-linear-to-b from-indigo-600/10 via-transparent to-transparent"
                aria-hidden
            />
            <div
                className="absolute top-24 -right-32 -z-10 size-[420px] rounded-full bg-indigo-500/20 blur-3xl"
                aria-hidden
            />
            <div
                className="absolute top-64 -left-40 -z-10 size-[420px] rounded-full bg-indigo-700/10 blur-3xl"
                aria-hidden
            />

            <Container className="flex flex-col items-center text-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {content.eyebrow_text && (
                        <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                            {content.eyebrow_text}
                        </span>
                    )}

                    <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {section.title}
                    </h1>

                    {section.subtitle && (
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            {section.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        {content.primary_button_text && (
                            <Button
                                size="lg"
                                variant="gradient"
                                asChild
                                className="h-12 px-7 text-base"
                            >
                                <a href={content.primary_button_url ?? '#demo'}>
                                    {content.primary_button_text}
                                    <ArrowRight className="size-4" />
                                </a>
                            </Button>
                        )}

                        {content.secondary_button_text && (
                            <Button
                                size="lg"
                                variant="ghost"
                                asChild
                                className="h-12 px-5 text-base text-indigo-600 hover:bg-indigo-600/5 hover:text-indigo-700"
                            >
                                <a href={content.secondary_button_url ?? '#'}>
                                    <PlayCircle className="size-4" />
                                    {content.secondary_button_text}
                                </a>
                            </Button>
                        )}
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex -space-x-2">
                            {['bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700'].map((color) => (
                                <span
                                    key={color}
                                    className={`size-6 rounded-full border-2 border-background ${color}`}
                                    aria-hidden
                                />
                            ))}
                        </span>
                        <span>
                            Trusted by{' '}
                            <span className="font-semibold tabular-nums text-foreground">500+</span>{' '}
                            sales teams
                        </span>
                    </div>
                </div>

                <div className="relative mt-16 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    <BrowserMock title="AlphaMasterCRM — Dashboard" className="text-left">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1 space-y-3">
                                <div className="h-3 w-3/4 rounded bg-muted" />

                                <div className="space-y-2 rounded-lg border bg-indigo-600/5 p-3">
                                    <Users className="size-4 text-indigo-500" />
                                    <p className="text-lg font-semibold tabular-nums text-foreground">2,481</p>
                                    <p className="text-[11px] text-muted-foreground">Active leads</p>
                                </div>

                                <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
                                    <TrendingUp className="size-4 text-emerald-500" />
                                    <p className="text-lg font-semibold tabular-nums text-foreground">+18%</p>
                                    <p className="text-[11px] text-muted-foreground">Conversion rate</p>
                                </div>

                                <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
                                    <BarChart3 className="size-4 text-indigo-500" />
                                    <p className="text-lg font-semibold tabular-nums text-foreground">$92k</p>
                                    <p className="text-[11px] text-muted-foreground">Pipeline value</p>
                                </div>
                            </div>

                            <div className="col-span-2 space-y-3">
                                <div className="flex h-40 gap-2 rounded-lg border bg-linear-to-br from-indigo-600/15 to-indigo-600/5 p-4">
                                    {(() => {
                                        const values = [45, 70, 55, 85, 60, 95, 75];
                                        const peak = Math.max(...values);

                                        return values.map((height, index) => {
                                            const isPeak = height === peak;

                                            return (
                                                <div
                                                    key={index}
                                                    className="relative flex h-full flex-1 items-end"
                                                >
                                                    {isPeak && (
                                                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded bg-indigo-600 px-1.5 py-0.5 text-[9px] font-semibold whitespace-nowrap text-white shadow-sm">
                                                            Best day
                                                        </span>
                                                    )}
                                                    <div
                                                        className={cn(
                                                            'w-full origin-bottom animate-in slide-in-from-bottom fill-mode-backwards rounded-t-sm duration-700',
                                                            isPeak
                                                                ? 'bg-indigo-600 shadow-[0_0_12px_rgba(79,70,229,0.5)]'
                                                                : 'bg-indigo-600/30',
                                                        )}
                                                        style={{
                                                            height: `${height}%`,
                                                            animationDelay: `${300 + index * 80}ms`,
                                                        }}
                                                    />
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                                <div className="space-y-2 rounded-lg border bg-card p-3">
                                    {['Acme Corp', 'Globex Inc.', 'Initech LLC'].map((name) => (
                                        <div
                                            key={name}
                                            className="flex items-center justify-between gap-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="size-6 rounded-full bg-indigo-600/15" />
                                                <span className="text-xs font-medium text-foreground">
                                                    {name}
                                                </span>
                                            </div>
                                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                                                Won
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </BrowserMock>

                    {/* Floating annotation badges, matching the reference's callouts
                        directly on the product screenshot. The outer span positions
                        the badge fully outside the card (clear of the window-chrome
                        bar, with a gap) — the inner pill owns its own transform for a
                        gentle continuous float, so the two transforms don't collide. */}
                    <span className="absolute top-0 -left-2 hidden -translate-y-full pb-3 sm:block">
                        <span className="animate-float-badge inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-emerald-600 shadow-lg">
                            <span className="relative flex size-1.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                            </span>
                            AI Summary: Ready
                        </span>
                    </span>
                    <span className="absolute right-4 bottom-0 hidden translate-y-full pt-3 sm:block">
                        <span
                            className="animate-float-badge inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-indigo-600 shadow-lg"
                            style={{ animationDelay: '1.4s' }}
                        >
                            Assigned → Agent A
                        </span>
                    </span>
                </div>

                {section.items.length > 0 && (
                    <div className="mt-20 grid w-full grid-cols-2 gap-y-8 border-t py-10 sm:grid-cols-4">
                        {section.items.map((item) => (
                            <div key={item.id}>
                                <p className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
                                    {item.meta?.value ?? '—'}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
