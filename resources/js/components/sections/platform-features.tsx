import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function PlatformFeatures({ section }: { section: PublicSection }) {
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

                <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);
                        const highlighted = item.meta?.highlighted === 'true';
                        const badge = item.meta?.badge;

                        return (
                            <RevealItem key={item.id} delay={index * 0.05} className="h-full">
                                <Card
                                    className={cn(
                                        'group relative h-full overflow-hidden border-border/60 bg-muted/30 py-7 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-muted/60 hover:shadow-xl hover:shadow-indigo-600/10',
                                        highlighted && 'border-t-2 border-t-indigo-500',
                                        badge &&
                                            'border-indigo-900 bg-gradient-to-br from-indigo-950 to-indigo-900 hover:border-indigo-800 hover:bg-gradient-to-br hover:from-indigo-950 hover:to-indigo-900',
                                    )}
                                >
                                    <CardContent className="relative flex h-full flex-col">
                                        {badge && (
                                            <span className="absolute top-0 right-0 rounded-full bg-indigo-500 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                                                {badge}
                                            </span>
                                        )}

                                        {Icon && (
                                            <div
                                                className={cn(
                                                    'inline-flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 transition-colors duration-300 group-hover:bg-indigo-500 group-hover:text-white',
                                                    badge && 'bg-white/10 text-white group-hover:bg-white/10',
                                                )}
                                            >
                                                <Icon className="size-5" />
                                            </div>
                                        )}
                                        <h3
                                            className={cn(
                                                'mt-5 text-lg font-medium text-foreground',
                                                badge && 'text-white',
                                            )}
                                        >
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p
                                                className={cn(
                                                    'mt-2 text-sm leading-7 text-muted-foreground',
                                                    badge && 'text-indigo-100/70',
                                                )}
                                            >
                                                {item.description}
                                            </p>
                                        )}

                                        {!badge && (
                                            <ArrowUpRight className="absolute top-0 right-0 size-4 -translate-y-1 translate-x-1 text-indigo-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100" />
                                        )}
                                    </CardContent>
                                </Card>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
