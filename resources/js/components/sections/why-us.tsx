import { ArrowUpRight } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function WhyUs({ section }: { section: PublicSection }) {
    return (
        <section id="why-us" className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem
                                key={item.id}
                                delay={index * 0.06}
                                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-600/5"
                            >
                                <div
                                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-blue-600 transition-transform duration-300 group-hover:scale-x-100"
                                    aria-hidden
                                />
                                <div className="flex items-start justify-between">
                                    {Icon && (
                                        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <Icon className="size-5" />
                                        </div>
                                    )}
                                    <ArrowUpRight className="size-4 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-foreground">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                )}
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
