import { ArrowUpRight } from 'lucide-react';

import { BrowserMock } from '@/components/sections/browser-mock';
import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

function hasHighlights(item: PublicSection['items'][number]) {
    return Boolean(item.meta && Object.values(item.meta).filter(Boolean).length > 0);
}

/** Populated mockup content for each featured platform-feature item, so the
 *  browser-mock screenshot next to the copy shows real-looking data instead
 *  of empty skeleton boxes. Falls back to a generic-but-populated layout for
 *  any item title that isn't explicitly covered. */
function FeatureMock({ title }: { title: string }) {
    if (title === 'Advertisers') {
        const rows = [
            { name: 'Meridian Capital', used: 820, cap: 1000, tone: 'bg-indigo-600' },
            { name: 'Nova Digital', used: 540, cap: 800, tone: 'bg-indigo-600' },
            { name: 'Brightline', used: 1000, cap: 1000, tone: 'bg-destructive' },
        ];

        return (
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border bg-indigo-600/5 p-3">
                        <p className="text-lg font-semibold tabular-nums text-foreground">12</p>
                        <p className="text-[11px] text-muted-foreground">Active advertisers</p>
                    </div>
                    <div className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-lg font-semibold tabular-nums text-foreground">92%</p>
                        <p className="text-[11px] text-muted-foreground">Avg fill rate</p>
                    </div>
                </div>

                <div className="space-y-2.5 rounded-lg border bg-card p-3">
                    {rows.map((row) => (
                        <div key={row.name}>
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-medium text-foreground">{row.name}</span>
                                <span className="tabular-nums text-muted-foreground">
                                    {row.used}/{row.cap}
                                    {row.used >= row.cap && (
                                        <span className="ml-1.5 rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-medium text-destructive">
                                            Capped
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className={`h-full rounded-full ${row.tone}`}
                                    style={{ width: `${Math.min(100, (row.used / row.cap) * 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (title === 'Affiliates') {
        const rows = [
            { name: 'Acme Leads', leads: '1,204', rate: '98%', tone: 'text-emerald-600' },
            { name: 'Nova Traffic', leads: '860', rate: '91%', tone: 'text-emerald-600' },
            { name: 'Brightline Media', leads: '430', rate: 'Review', tone: 'text-amber-600' },
        ];

        return (
            <div className="space-y-3">
                <div className="space-y-1.5 rounded-lg border bg-muted/40 p-3 font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                        <span className="rounded bg-indigo-600/10 px-1.5 py-0.5 font-semibold text-indigo-600">
                            POST
                        </span>
                        <span className="text-foreground">/api/ingest/leads</span>
                    </div>
                    <p className="text-muted-foreground">Authorization: Bearer sk_live_••••2F91</p>
                </div>

                <div className="space-y-2 rounded-lg border bg-card p-3">
                    {rows.map((row) => (
                        <div key={row.name} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="size-6 rounded-full bg-indigo-600/15" />
                                <span className="text-xs font-medium text-foreground">{row.name}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs tabular-nums text-foreground">{row.leads} leads</p>
                                <p className={`text-[10px] font-medium ${row.tone}`}>{row.rate} accepted</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border bg-indigo-600/5 p-3">
                    <p className="text-lg font-semibold tabular-nums text-foreground">248</p>
                    <p className="text-[11px] text-muted-foreground">Today</p>
                </div>
                <div className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-lg font-semibold tabular-nums text-foreground">99.9%</p>
                    <p className="text-[11px] text-muted-foreground">Success rate</p>
                </div>
            </div>
            <div className="space-y-2 rounded-lg border bg-card p-3">
                {['Acme Corp', 'Globex Inc.', 'Initech LLC'].map((name) => (
                    <div key={name} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="size-6 rounded-full bg-indigo-600/15" />
                            <span className="text-xs font-medium text-foreground">{name}</span>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                            Active
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PlatformFeatures({ section }: { section: PublicSection }) {
    const compactItems = section.items.filter((item) => !hasHighlights(item));
    const featuredItems = section.items.filter((item) => hasHighlights(item));

    return (
        <section id="platform-features" className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {compactItems.map((item, index) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem key={item.id} delay={index * 0.05} className="h-full">
                                <Card className="group relative h-full overflow-hidden border-border/60 bg-muted/30 py-7 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-muted/60 hover:shadow-xl hover:shadow-indigo-600/10">
                                    <CardContent className="relative flex h-full flex-col">
                                        {Icon && (
                                            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 transition-colors duration-300 group-hover:bg-indigo-500 group-hover:text-white">
                                                <Icon className="size-5" />
                                            </div>
                                        )}
                                        <h3 className="mt-5 text-lg font-medium text-foreground">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                                {item.description}
                                            </p>
                                        )}

                                        <ArrowUpRight className="absolute top-0 right-0 size-4 -translate-y-1 translate-x-1 text-indigo-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </CardContent>
                                </Card>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>

            {featuredItems.length > 0 && (
                <div className="mt-28 space-y-28">
                    {featuredItems.map((item, index) => {
                        const Icon = getIcon(item.icon);
                        const highlights = item.meta
                            ? Object.entries(item.meta)
                                  .filter(([key, value]) => key.startsWith('highlight_') && value)
                                  .map(([, value]) => value)
                            : [];
                        const imageOnRight = index % 2 === 0;

                        return (
                            <Container key={item.id}>
                                <div className="grid items-center gap-12 lg:grid-cols-2">
                                    <RevealItem
                                        delay={0.05}
                                        className={cn(imageOnRight ? 'lg:order-1' : 'lg:order-2')}
                                    >
                                        <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
                                            Platform · «{item.title}»
                                        </p>
                                        <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-4 text-muted-foreground">
                                                {item.description}
                                            </p>
                                        )}

                                        {highlights.length > 0 && (
                                            <div className="mt-6 grid grid-cols-2 gap-3">
                                                {highlights.map((highlight) => (
                                                    <div
                                                        key={highlight}
                                                        className="rounded-xl border bg-card p-3"
                                                    >
                                                        {Icon && (
                                                            <Icon className="size-4 text-indigo-500" />
                                                        )}
                                                        <p className="mt-2 text-sm leading-snug font-medium text-foreground">
                                                            {highlight}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <Button
                                            variant="gradient"
                                            className="mt-6"
                                            asChild
                                        >
                                            <a href="#demo">See it in the live demo</a>
                                        </Button>
                                    </RevealItem>

                                    <RevealItem
                                        delay={0.1}
                                        className={cn(imageOnRight ? 'lg:order-2' : 'lg:order-1')}
                                    >
                                        <BrowserMock title={`AlphaMasterCRM — ${item.title}`}>
                                            <FeatureMock title={item.title} />
                                        </BrowserMock>
                                    </RevealItem>
                                </div>
                            </Container>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
