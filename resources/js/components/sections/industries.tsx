import { ChevronRight } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

// Cycled by card index so each solution gets a distinct accent color, like
// the reference mockup — not tied to any particular industry.
const ACCENTS = [
    { badge: 'bg-indigo-100 text-indigo-700', icon: 'bg-indigo-100 text-indigo-600', link: 'text-indigo-600' },
    { badge: 'bg-amber-100 text-amber-700', icon: 'bg-amber-100 text-amber-600', link: 'text-amber-600' },
    { badge: 'bg-emerald-100 text-emerald-700', icon: 'bg-emerald-100 text-emerald-600', link: 'text-emerald-600' },
    { badge: 'bg-violet-100 text-violet-700', icon: 'bg-violet-100 text-violet-600', link: 'text-violet-600' },
    { badge: 'bg-rose-100 text-rose-700', icon: 'bg-rose-100 text-rose-600', link: 'text-rose-600' },
];

export function Industries({ section }: { section: PublicSection }) {
    return (
        <section id="industries" className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);
                        const accent = ACCENTS[index % ACCENTS.length];

                        return (
                            <RevealItem key={item.id} delay={index * 0.05} className="h-full">
                                <div className="flex h-full flex-col rounded-2xl border bg-card p-7 shadow-none transition-colors duration-300 hover:border-foreground/15">
                                    <div className="flex items-start justify-between">
                                        {Icon && (
                                            <div
                                                className={cn(
                                                    'inline-flex size-11 items-center justify-center rounded-xl',
                                                    accent.icon,
                                                )}
                                            >
                                                <Icon className="size-5" />
                                            </div>
                                        )}
                                        <span
                                            className={cn(
                                                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums',
                                                accent.badge,
                                            )}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-lg font-medium text-foreground">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    )}

                                    <a
                                        href={item.link_url ?? '#'}
                                        className={cn(
                                            'mt-6 inline-flex items-center gap-1 border-t pt-5 text-sm font-medium',
                                            accent.link,
                                        )}
                                    >
                                        Explore solution
                                        <ChevronRight className="size-4" />
                                    </a>
                                </div>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
