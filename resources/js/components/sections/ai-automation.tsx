import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function AiAutomation({ section }: { section: PublicSection }) {
    return (
        <section className="relative overflow-hidden bg-background py-20 sm:py-28">
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
                aria-hidden
            />

            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem
                                key={item.id}
                                className="rounded-2xl border bg-gradient-to-br from-card to-primary/5 p-6"
                            >
                                {Icon && (
                                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="size-5" />
                                    </div>
                                )}
                                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                                {item.description && (
                                    <p className="mt-2 text-sm text-muted-foreground">
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
