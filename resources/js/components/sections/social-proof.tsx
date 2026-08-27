import { Star } from 'lucide-react';
import { Container } from '@/components/sections/container';
import { Reveal, RevealGroup, RevealItem } from '@/components/sections/reveal';
import { Card, CardContent } from '@/components/ui/card';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

function kindOf(item: PublicSection['items'][number]) {
    return item.meta?.kind ?? null;
}

export function SocialProof({ section }: { section: PublicSection }) {
    const logos = section.items.filter((item) => kindOf(item) === 'logo');
    const testimonials = section.items.filter(
        (item) => kindOf(item) === 'testimonial',
    );
    const badges = section.items.filter((item) => kindOf(item) === 'badge');

    return (
        <section className="py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                {logos.length > 0 && (
                    <RevealGroup className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {logos.map((logo, index) => (
                            <RevealItem key={logo.id} delay={index * 0.03}>
                                <span className="text-lg font-semibold tracking-tight text-muted-foreground/70 grayscale">
                                    {logo.title}
                                </span>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                )}

                {testimonials.length > 0 && (
                    <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <RevealItem key={testimonial.id} delay={index * 0.08}>
                                <Card className="h-full">
                                    <CardContent>
                                        <div className="flex gap-0.5 text-amber-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="size-4 fill-current"
                                                />
                                            ))}
                                        </div>
                                        {testimonial.description && (
                                            <p className="mt-4 text-sm leading-7 text-foreground">
                                                &ldquo;{testimonial.description}&rdquo;
                                            </p>
                                        )}
                                        <div className="mt-6">
                                            <p className="font-medium text-foreground">
                                                {testimonial.title}
                                            </p>
                                            {(testimonial.meta?.role ||
                                                testimonial.meta?.company) && (
                                                <p className="text-sm text-muted-foreground">
                                                    {[
                                                        testimonial.meta?.role,
                                                        testimonial.meta?.company,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' · ')}
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                )}

                {badges.length > 0 && (
                    <RevealGroup className="mt-12 flex flex-wrap items-center justify-center gap-3">
                        {badges.map((badge, index) => {
                            const Icon = getIcon(badge.icon);

                            return (
                                <RevealItem key={badge.id} delay={index * 0.05}>
                                    <span className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground">
                                        {Icon && (
                                            <Icon className="size-4 text-indigo-500" />
                                        )}
                                        {badge.title}
                                    </span>
                                </RevealItem>
                            );
                        })}
                    </RevealGroup>
                )}
            </Container>
        </section>
    );
}
