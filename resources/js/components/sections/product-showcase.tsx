import { useState } from 'react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { PublicSection, PublicSectionItem } from '@/types/sections';

export function ProductShowcase({ section }: { section: PublicSection }) {
    const [viewing, setViewing] = useState<PublicSectionItem | null>(null);

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
                            role="button"
                            tabIndex={0}
                            onClick={() => setViewing(item)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    setViewing(item);
                                }
                            }}
                            className="group cursor-pointer overflow-hidden rounded-xl border bg-card text-left transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

            <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{viewing?.title}</DialogTitle>
                        {viewing?.description && (
                            <DialogDescription>{viewing.description}</DialogDescription>
                        )}
                    </DialogHeader>
                    {viewing?.image_url && (
                        <div className="overflow-hidden rounded-lg border">
                            <img
                                src={viewing.image_url}
                                alt={viewing.title}
                                className="w-full object-cover"
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
