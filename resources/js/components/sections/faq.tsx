import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function Faq({ section }: { section: PublicSection }) {
    const [openId, setOpenId] = useState<number | null>(
        section.items[0]?.id ?? null,
    );

    return (
        <section id="faq" className="py-20 sm:py-28">
            <Container className="max-w-3xl">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <RevealGroup className="mt-12 divide-y divide-border rounded-2xl border">
                    {section.items.map((item, index) => {
                        const isOpen = openId === item.id;

                        return (
                            <RevealItem key={item.id} delay={index * 0.04}>
                                <Collapsible
                                    open={isOpen}
                                    onOpenChange={(open) => setOpenId(open ? item.id : null)}
                                >
                                    <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                                        <span className="font-medium text-foreground">
                                            {item.title}
                                        </span>
                                        <Plus
                                            className={cn(
                                                'size-4 shrink-0 text-indigo-500 transition-transform duration-200',
                                                isOpen && 'rotate-45',
                                            )}
                                        />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="px-6 pb-5 text-sm leading-7 text-muted-foreground">
                                        {item.description}
                                    </CollapsibleContent>
                                </Collapsible>
                            </RevealItem>
                        );
                    })}
                </RevealGroup>
            </Container>
        </section>
    );
}
