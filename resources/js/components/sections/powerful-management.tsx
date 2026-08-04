import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import type { PublicSection } from '@/types/sections';

export function PowerfulManagement({ section }: { section: PublicSection }) {
    return (
        <section className="bg-foreground py-20 text-background sm:py-28">
            <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
                <Reveal>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-background/70">{section.subtitle}</p>
                    )}
                    {section.body && (
                        <p className="mt-4 text-background/70">{section.body}</p>
                    )}
                </Reveal>

                <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {section.items.map((item) => (
                        <RevealItem key={item.id} className="rounded-xl bg-background/10 p-5">
                            <p className="text-2xl font-semibold sm:text-3xl">
                                {item.meta?.value ?? '—'}
                            </p>
                            <p className="mt-1 text-sm text-background/70">{item.title}</p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </Container>
        </section>
    );
}
