import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

export function AiAutomation({ section }: { section: PublicSection }) {
    return (
        <section className="relative overflow-hidden bg-background py-20 sm:py-28">
            <div
                className="absolute inset-0 -z-10 bg-linear-to-b from-blue-600/5 via-transparent to-transparent"
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

                <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.items.map((item, index) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem
                                key={item.id}
                                delay={index * 0.06}
                                className="group rounded-2xl border bg-linear-to-br from-card to-blue-600/5 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/5"
                            >
                                {Icon && (
                                    <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon className="size-5" />
                                    </div>
                                )}
                                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
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
