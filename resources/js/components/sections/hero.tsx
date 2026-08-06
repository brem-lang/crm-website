import { BarChart3, TrendingUp, Users } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import type { PublicSection } from '@/types/sections';

export function Hero({ section }: { section: PublicSection }) {
    const content = section.content ?? {};

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div
                className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent"
                aria-hidden
            />

            <Container className="grid items-center gap-16 lg:grid-cols-2">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {section.title}
                    </h1>

                    {section.subtitle && (
                        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                            {section.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        {content.primary_button_text && (
                            <Button size="lg" asChild className="bg-blue-600 text-white hover:bg-blue-700">
                                <a href={content.primary_button_url ?? '#demo'}>
                                    {content.primary_button_text}
                                </a>
                            </Button>
                        )}

                        {content.secondary_button_text && (
                            <Button size="lg" variant="outline" asChild>
                                <a href={content.secondary_button_url ?? '#'}>
                                    {content.secondary_button_text}
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    <div className="rounded-2xl border bg-card p-4 shadow-2xl shadow-primary/10">
                        <div className="flex items-center gap-1.5 border-b px-2 pb-3">
                            <span className="size-2.5 rounded-full bg-destructive/60" />
                            <span className="size-2.5 rounded-full bg-yellow-500/60" />
                            <span className="size-2.5 rounded-full bg-green-500/60" />
                            <div className="ml-3 h-5 flex-1 rounded-md bg-muted/70" />
                        </div>

                        <div className="grid grid-cols-3 gap-3 p-4">
                            <div className="col-span-1 space-y-3">
                                <div className="h-3 w-3/4 rounded bg-muted" />

                                <div className="space-y-2 rounded-lg border bg-primary/5 p-3">
                                    <Users className="size-4 text-primary" />
                                    <p className="text-lg font-semibold text-foreground">2,481</p>
                                    <p className="text-[11px] text-muted-foreground">Active leads</p>
                                </div>

                                <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
                                    <TrendingUp className="size-4 text-emerald-500" />
                                    <p className="text-lg font-semibold text-foreground">+18%</p>
                                    <p className="text-[11px] text-muted-foreground">Conversion rate</p>
                                </div>

                                <div className="space-y-2 rounded-lg border bg-muted/40 p-3">
                                    <BarChart3 className="size-4 text-primary" />
                                    <p className="text-lg font-semibold text-foreground">$92k</p>
                                    <p className="text-[11px] text-muted-foreground">Pipeline value</p>
                                </div>
                            </div>

                            <div className="col-span-2 space-y-3">
                                <div className="flex h-40 items-end gap-2 rounded-lg border bg-linear-to-br from-primary/15 to-primary/5 p-4">
                                    {[45, 70, 55, 85, 60, 95, 75].map((height, index) => (
                                        <div
                                            key={index}
                                            className="flex-1 rounded-t-sm bg-primary/70"
                                            style={{ height: `${height}%` }}
                                        />
                                    ))}
                                </div>
                                <div className="space-y-2 rounded-lg border bg-card p-3">
                                    {['Acme Corp', 'Globex Inc.', 'Initech LLC'].map((name) => (
                                        <div
                                            key={name}
                                            className="flex items-center justify-between gap-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="size-6 rounded-full bg-primary/15" />
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
                    </div>
                    <div
                        className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-3xl"
                        aria-hidden
                    />
                </div>
            </Container>
        </section>
    );
}
