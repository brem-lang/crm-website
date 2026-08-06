import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import type { PublicSection } from '@/types/sections';

export function Industries({ section }: { section: PublicSection }) {
    return (
        <section id="industries" className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid divide-y overflow-hidden rounded-2xl border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
                    {section.items.map((item, index) => (
                        <RevealItem
                            key={item.id}
                            delay={index * 0.05}
                            className="group relative flex flex-col gap-2 bg-card p-6 transition-colors hover:bg-blue-600/5"
                        >
                            <span className="text-xs font-semibold text-blue-600">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="font-medium text-foreground">{item.title}</h3>
                            {item.description && (
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            )}
                        </RevealItem>
                    ))}
                </RevealGroup>
            </Container>
        </section>
    );
}
