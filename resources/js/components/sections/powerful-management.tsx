import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import type { PublicSection } from '@/types/sections';

export function PowerfulManagement({ section }: { section: PublicSection }) {
    return (
        <section className="relative overflow-hidden bg-foreground py-20 text-background sm:py-28">
            <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]"
                aria-hidden
            />
            <div
                className="absolute top-1/2 left-1/2 -z-10 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
                aria-hidden
            />

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

                <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {section.items.map((item, index) => (
                        <RevealItem
                            key={item.id}
                            delay={index * 0.05}
                            className="rounded-2xl border border-background/10 bg-background/5 p-6 transition-colors hover:bg-background/10"
                        >
                            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
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
