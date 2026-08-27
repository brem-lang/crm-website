import { useState } from 'react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function LeadPipeline({ section }: { section: PublicSection }) {
    const [activeId, setActiveId] = useState(section.items[0]?.id ?? null);
    const active = section.items.find((item) => item.id === activeId) ?? section.items[0];
    const activeHighlights = active?.meta
        ? Object.values(active.meta).filter(Boolean)
        : [];

    return (
        <section id="pipeline" className="bg-muted/30 py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);
                        const isActive = item.id === active?.id;

                        return (
                            <RevealItem key={item.id} delay={index * 0.05}>
                                <button
                                    type="button"
                                    onClick={() => setActiveId(item.id)}
                                    className={cn(
                                        'flex w-32 flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors sm:w-36',
                                        isActive
                                            ? 'border-indigo-500 bg-indigo-500/5'
                                            : 'bg-card hover:border-indigo-500/40',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex size-9 items-center justify-center rounded-lg',
                                            isActive
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-muted text-muted-foreground',
                                        )}
                                    >
                                        {Icon && <Icon className="size-4" />}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {item.title}
                                    </span>
                                </button>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>

                {active && (
                    <Reveal
                        key={active.id}
                        className="mx-auto mt-8 max-w-3xl rounded-2xl border bg-card p-6 shadow-xl shadow-slate-900/5 sm:p-8"
                    >
                        <p className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
                            {active.title}
                        </p>
                        {active.description && (
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                {active.description}
                            </p>
                        )}
                        {activeHighlights.length > 0 && (
                            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                                {activeHighlights.map((highlight) => (
                                    <li
                                        key={highlight}
                                        className="flex items-start gap-2 text-sm leading-6 text-foreground"
                                    >
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo-600/60" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Reveal>
                )}
            </Container>
        </section>
    );
}
