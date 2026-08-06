import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function PlatformModules({ section }: { section: PublicSection }) {
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

                <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-2">
                    {section.items.map((item) => {
                        const Icon = getIcon(item.icon);
                        const highlights = item.meta
                            ? Object.values(item.meta).filter(Boolean)
                            : [];

                        return (
                            <RevealItem
                                key={item.id}
                                className="rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg"
                            >
                                {Icon && (
                                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="size-6" />
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                        {item.description}
                                    </p>
                                )}
                                {highlights.length > 0 && (
                                    <ul className="mt-5 space-y-2 border-t pt-5">
                                        {highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex items-start gap-2 text-sm text-foreground"
                                            >
                                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
