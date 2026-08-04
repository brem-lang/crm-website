import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import type { PublicSection } from '@/types/sections';

export function ProductShowcase({ section }: { section: PublicSection }) {
    return (
        <section id="product-showcase" className="bg-muted/30 py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {section.items.map((item) => (
                        <RevealItem
                            key={item.id}
                            className="group overflow-hidden rounded-xl border bg-card"
                        >
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent">
                                {item.image_url && (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <p className="px-4 py-3 text-sm font-medium text-foreground">
                                {item.title}
                            </p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </Container>
        </section>
    );
}
