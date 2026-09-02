import { Check } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PublicSection, PublicSectionItem } from '@/types/sections';

function highlightsOf(item: PublicSectionItem) {
    return item.meta
        ? Object.entries(item.meta)
              .filter(([key, value]) => key.startsWith('highlight_') && value)
              .map(([, value]) => value)
        : [];
}

export function Pricing({ section }: { section: PublicSection }) {
    return (
        <section id="pricing" className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-white/80">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup
                    className={cn(
                        'mx-auto mt-16 grid max-w-5xl gap-6',
                        section.items.length === 1 && 'max-w-md',
                        section.items.length === 2 && 'sm:grid-cols-2',
                        section.items.length >= 3 && 'sm:grid-cols-2 lg:grid-cols-3',
                    )}
                >
                    {section.items.map((item, index) => {
                        const highlighted =
                            item.meta?.highlighted === 'true' || section.items.length === 1;
                        const highlights = highlightsOf(item);
                        const price = item.meta?.value ?? null;

                        return (
                            <RevealItem
                                key={item.id}
                                delay={index * 0.06}
                                className={cn(
                                    'relative flex flex-col rounded-2xl border bg-card p-8 shadow-xl shadow-slate-900/5',
                                    highlighted && 'border-indigo-500 ring-1 ring-indigo-500',
                                )}
                            >
                                {highlighted && section.items.length > 1 && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
                                        Most popular
                                    </span>
                                )}

                                <h3 className="text-lg font-semibold text-foreground">
                                    {item.title}
                                </h3>

                                {price && (
                                    <p className="mt-4 text-4xl font-extrabold tracking-tight tabular-nums text-foreground">
                                        {price}
                                        <span className="text-base font-medium text-muted-foreground">
                                            /mo
                                        </span>
                                    </p>
                                )}

                                {item.description && (
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                        {item.description}
                                    </p>
                                )}

                                {highlights.length > 0 && (
                                    <ul className="mt-6 space-y-3 text-sm">
                                        {highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex items-start gap-2 text-foreground"
                                            >
                                                <Check className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Button
                                    asChild
                                    variant={highlighted ? 'gradient' : 'outline'}
                                    className="mt-8"
                                >
                                    <a href={item.link_url ?? '#demo'}>Book a Demo</a>
                                </Button>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
