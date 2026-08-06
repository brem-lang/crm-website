import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
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

                <RevealGroup className="mt-16 overflow-hidden rounded-2xl border">
                    <div className="grid grid-cols-1 divide-y sm:grid-cols-[minmax(0,220px)_1fr] sm:divide-x sm:divide-y-0">
                        <div className="hidden bg-muted/50 px-6 py-4 text-sm font-semibold text-foreground sm:block">
                            Area
                        </div>
                        <div className="hidden bg-muted/50 px-6 py-4 text-sm font-semibold text-foreground sm:block">
                            Functionality
                        </div>

                        {section.items.map((item) => (
                            <RevealItem key={item.id} className="contents">
                                <div className="bg-card px-6 py-4 text-sm font-semibold text-foreground sm:border-t sm:border-border">
                                    {item.title}
                                </div>
                                <div className="bg-card px-6 py-4 text-sm text-muted-foreground sm:border-t sm:border-border">
                                    {item.description}
                                </div>
                            </RevealItem>
                        ))}
                    </div>
                </RevealGroup>
            </Container>
        </section>
    );
}
