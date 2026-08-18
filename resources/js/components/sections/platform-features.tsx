import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

const ACCENTS = [
    { bar: 'bg-blue-600', icon: 'bg-blue-600/10 text-blue-600' },
    { bar: 'bg-indigo-500', icon: 'bg-indigo-500/10 text-indigo-500' },
];

function hasHighlights(item: PublicSection['items'][number]) {
    return Boolean(item.meta && Object.values(item.meta).filter(Boolean).length > 0);
}

export function PlatformFeatures({ section }: { section: PublicSection }) {
    const compactItems = section.items.filter((item) => !hasHighlights(item));
    const featuredItems = section.items.filter((item) => hasHighlights(item));

    return (
        <section id="platform-features" className="py-20 sm:py-28">
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
                    {compactItems.map((item, index) => {
                        const Icon = getIcon(item.icon);

                        return (
                            <RevealItem key={item.id} delay={index * 0.05}>
                                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                                    <CardContent>
                                        {Icon && (
                                            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                                                <Icon className="size-5" />
                                            </div>
                                        )}
                                        <h3 className="mt-5 text-lg font-medium text-foreground">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                                {item.description}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>

                {featuredItems.length > 0 && (
                    <RevealGroup className="mt-8 grid gap-6 lg:grid-cols-2">
                        {featuredItems.map((item, index) => {
                            const Icon = getIcon(item.icon);
                            const highlights = item.meta
                                ? Object.values(item.meta).filter(Boolean)
                                : [];
                            const accent = ACCENTS[index % ACCENTS.length];

                            return (
                                <RevealItem
                                    key={item.id}
                                    delay={index * 0.08}
                                    className="overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-xl"
                                >
                                    <div className={`h-1.5 ${accent.bar}`} aria-hidden />
                                    <div className="p-8">
                                        {Icon && (
                                            <div
                                                className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl ${accent.icon}`}
                                            >
                                                <Icon className="size-6" />
                                            </div>
                                        )}
                                        <h3 className="text-xl font-semibold text-foreground">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
                                                        <span
                                                            className={`mt-1.5 size-1.5 shrink-0 rounded-full ${accent.bar}`}
                                                        />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </RevealItem>
                            );
                        })}
                    </RevealGroup>
                )}
            </Container>
        </section>
    );
}
