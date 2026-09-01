import { ArrowRight, PlayCircle } from 'lucide-react';

import { BrowserMock } from '@/components/sections/browser-mock';
import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import type { PublicSection } from '@/types/sections';

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

            <Container className="flex flex-col items-center text-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {content.eyebrow_text && (
                        <span className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
                            {content.eyebrow_text}
                        </span>
                    )}

                    <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {section.title}
                    </h1>

                    {section.subtitle && (
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                            {section.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

                <div className="relative mt-16 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
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

                {section.items.length > 0 && (
                    <div className="mt-20 grid w-full grid-cols-2 gap-y-8 border-t py-10 sm:grid-cols-4">
                        {section.items.map((item) => (
                            <div key={item.id}>
                                <p className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
                                    {item.meta?.value ?? '—'}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
