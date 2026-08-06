import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import type { PublicSection } from '@/types/sections';

export function Hero({ section }: { section: PublicSection }) {
    const content = section.content ?? {};

    return (
        <section className="relative overflow-hidden bg-background pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div
                className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent"
                aria-hidden
            />

            <Container className="grid items-center gap-16 lg:grid-cols-2">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        {section.title}
                    </h1>

                    {section.subtitle && (
                        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                            {section.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        {content.primary_button_text && (
                            <Button size="lg" asChild className="bg-blue-600 text-white hover:bg-blue-700">
                                <a href={content.primary_button_url ?? '#demo'}>
                                    {content.primary_button_text}
                                </a>
                            </Button>
                        )}

                        {content.secondary_button_text && (
                            <Button size="lg" variant="outline" asChild>
                                <a href={content.secondary_button_url ?? '#'}>
                                    {content.secondary_button_text}
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
                    <div className="rounded-2xl border bg-card p-4 shadow-2xl shadow-primary/10">
                        <div className="flex items-center gap-1.5 border-b px-2 pb-3">
                            <span className="size-2.5 rounded-full bg-destructive/60" />
                            <span className="size-2.5 rounded-full bg-yellow-500/60" />
                            <span className="size-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 p-4">
                            <div className="col-span-1 space-y-3">
                                <div className="h-3 w-3/4 rounded bg-muted" />
                                <div className="h-20 rounded-lg bg-primary/10" />
                                <div className="h-20 rounded-lg bg-muted" />
                                <div className="h-20 rounded-lg bg-muted" />
                            </div>
                            <div className="col-span-2 space-y-3">
                                <div className="h-40 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5" />
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="h-16 rounded-lg bg-muted" />
                                    <div className="h-16 rounded-lg bg-muted" />
                                    <div className="h-16 rounded-lg bg-muted" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-3xl"
                        aria-hidden
                    />
                </div>
            </Container>
        </section>
    );
}
