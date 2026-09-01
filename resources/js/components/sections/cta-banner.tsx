import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/sections/container';
import { Reveal } from '@/components/sections/reveal';
import { Button } from '@/components/ui/button';
import type { PublicSection } from '@/types/sections';

/**
 * Lightweight mid-page CTA banner — headline + one button, no form. Distinct
 * from `final-cta.tsx`, which owns the actual demo-request form at `#demo`;
 * this just scrolls the visitor down to it.
 */
export function CtaBanner({ section }: { section: PublicSection }) {
    const content = section.content ?? {};

    return (
        <section className="py-16 sm:py-20">
            <Container>
                <Reveal className="flex flex-col items-center gap-6 rounded-3xl border bg-muted/30 px-6 py-14 text-center sm:px-12">
                    <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="max-w-xl text-muted-foreground">{section.subtitle}</p>
                    )}
                    {content.button_text && (
                        <Button size="lg" variant="gradient" asChild className="h-12 px-7 text-base">
                            <a href={content.button_url ?? '#demo'}>
                                {content.button_text}
                                <ArrowRight className="size-4" />
                            </a>
                        </Button>
                    )}
                </Reveal>
            </Container>
        </section>
    );
}
