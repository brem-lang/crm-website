import { ArrowRight, PlayCircle } from 'lucide-react';

import { BrowserMock } from '@/components/sections/browser-mock';
import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icon-map';
import type { PublicSection } from '@/types/sections';

/**
 * Splits the title around `highlight` (if it's actually present in it) and
 * wraps that substring in the brand color — lets the seeded content control
 * which part of the headline gets the accent, e.g. "Forex, Crypto &".
 */
function renderTitle(title: string | null, highlight?: string) {
    if (!title || !highlight) {
        return title;
    }

    const index = title.indexOf(highlight);

    if (index === -1) {
        return title;
    }

    return (
        <>
            {title.slice(0, index)}
            <span className="text-indigo-600">{highlight}</span>
            {title.slice(index + highlight.length)}
        </>
    );
}

export function Hero({ section }: { section: PublicSection }) {
    const content = section.content ?? {};

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-0 sm:pt-28">
            <div
                className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-linear-to-b from-indigo-600/10 via-transparent to-transparent"
                aria-hidden
            />
            <div
                className="absolute top-24 -right-32 -z-10 size-[420px] rounded-full bg-indigo-500/20 blur-3xl"
                aria-hidden
            />
            <div
                className="absolute top-64 -left-40 -z-10 size-[420px] rounded-full bg-indigo-700/10 blur-3xl"
                aria-hidden
            />

            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {content.eyebrow_text && (
                        <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                            {content.eyebrow_text}
                        </span>
                    )}

                    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {renderTitle(section.title, content.highlight_text)}
                    </h1>

                    {section.subtitle && (
                        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                            {section.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        {content.primary_button_text && (
                            <Button
                                size="lg"
                                variant="gradient"
                                asChild
                                className="h-12 px-7 text-base"
                            >
                                <a href={content.primary_button_url ?? '#demo'}>
                                    {content.primary_button_text}
                                    <ArrowRight className="size-4" />
                                </a>
                            </Button>
                        )}

                        {content.secondary_button_text && (
                            <Button
                                size="lg"
                                variant="ghost"
                                asChild
                                className="h-12 px-5 text-base text-indigo-600 hover:bg-indigo-600/5 hover:text-indigo-700"
                            >
                                <a href={content.secondary_button_url ?? '#'}>
                                    <PlayCircle className="size-4" />
                                    {content.secondary_button_text}
                                </a>
                            </Button>
                        )}
                    </div>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex -space-x-2">
                            {['bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700'].map((color) => (
                                <span
                                    key={color}
                                    className={`size-6 rounded-full border-2 border-background ${color}`}
                                    aria-hidden
                                />
                            ))}
                        </span>
                        <span>
                            Trusted by{' '}
                            <span className="font-semibold tabular-nums text-foreground">500+</span>{' '}
                            sales teams
                        </span>
                    </div>
                </div>

                <div className="relative w-full animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    <div className="animate-float-hero">
                        <BrowserMock title="AlphaMasterCRM — Dashboard" className="text-left" noPadding>
                            <img
                                src="/images/dashboard-screenshot.png"
                                alt="AlphaMasterCRM dashboard showing leads sent, conversions, pending FTDs, rejection rate, total leads, and a leads-and-conversions chart"
                                className="w-full"
                            />
                        </BrowserMock>
                    </div>
                </div>
            </Container>

            {section.items.length > 0 && (
                <Container className="mt-16 border-t py-10 sm:mt-20">
                    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-8">
                        {section.items.map((item) => {
                            const Icon = getIcon(item.icon);

                            return (
                                <div key={item.id}>
                                    {Icon && (
                                        <div className="inline-flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                                            <Icon className="size-5" />
                                        </div>
                                    )}
                                    <p className="mt-4 text-base font-semibold text-foreground">
                                        {item.title}
                                    </p>
                                    {item.description && (
                                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Container>
            )}
        </section>
    );
}
