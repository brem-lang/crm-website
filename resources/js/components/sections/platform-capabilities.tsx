import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function PlatformCapabilities({ section }: { section: PublicSection }) {
    return (
        <section className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border">
                    {section.items.map((item, index) => (
                        <RevealItem
                            key={item.id}
                            delay={index * 0.04}
                            className={cn(
                                'flex flex-col gap-3 border-b p-5 last:border-b-0 sm:flex-row sm:items-start sm:gap-5 sm:p-6',
                                index % 2 === 1 && 'bg-muted/30',
                            )}
                        >
                            <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                                <CheckCircle2 className="size-4 shrink-0 text-blue-600" />
                                <h3 className="text-sm font-semibold text-foreground">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </Container>
        </section>
    );
}
