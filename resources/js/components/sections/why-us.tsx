import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function WhyUs({ section }: { section: PublicSection }) {
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

                <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem
                                key={item.id}
                                className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg"
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
