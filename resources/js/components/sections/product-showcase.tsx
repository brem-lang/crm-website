import { Expand } from 'lucide-react';
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
                    {section.items.map((item, index) => (
                        <RevealItem
                            key={item.id}
                            delay={index * 0.05}
                            role="button"
                            tabIndex={0}
                            onClick={() => setViewing(item)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    setViewing(item);
                                }
                            }}
                            className="group cursor-pointer overflow-hidden rounded-2xl border bg-card text-left transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        >
                            <div className="relative aspect-video overflow-hidden bg-linear-to-br from-blue-600/15 via-blue-600/5 to-transparent">
                                {item.image_url && (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity group-hover:bg-foreground/20 group-hover:opacity-100">
                                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow">
                                        <Expand className="size-4" />
                                    </span>
                                </div>
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
