import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function LeadPipeline({ section }: { section: PublicSection }) {
    return (
        <section className="bg-muted/30 py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="relative mt-16 grid gap-6 lg:grid-cols-5">
                    <div
                        className="absolute top-9 right-0 left-0 hidden h-px bg-border lg:block"
                        aria-hidden
                    />

                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem
                                key={item.id}
                                delay={index * 0.08}
                                className="relative flex flex-col items-start gap-3 rounded-2xl border bg-card p-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                        {index + 1}
                                    </div>
                                    {Icon && (
                                        <div className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Icon className="size-4" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-base font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-sm leading-relaxed text-muted-foreground">
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
