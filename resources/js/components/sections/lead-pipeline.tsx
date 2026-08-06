import { Container } from '@/components/sections/container';
import { Reveal, RevealItem } from '@/components/sections/reveal';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicSection } from '@/types/sections';

export function LeadPipeline({ section }: { section: PublicSection }) {
    return (
        <section id="pipeline" className="bg-muted/30 py-20 sm:py-28">
            <Container>
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-muted-foreground">{section.subtitle}</p>
                    )}
                </Reveal>

                <div className="relative mt-16">
                    <div
                        className="absolute top-0 bottom-0 left-5 w-px bg-border sm:left-1/2"
                        aria-hidden
                    />

                    <div className="space-y-8">
                        {section.items.map((item, index) => {
                            const Icon = getIcon(item.icon);
                            const isEven = index % 2 === 0;

                            return (
                                <RevealItem
                                    key={item.id}
                                    delay={index * 0.08}
                                    className={cn(
                                        'relative flex flex-col gap-4 pl-14 sm:w-1/2 sm:pl-0',
                                        isEven
                                            ? 'sm:pr-12'
                                            : 'sm:ml-auto sm:pl-12',
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'absolute top-0 flex size-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25',
                                            'left-0 sm:left-auto',
                                            isEven ? 'sm:-right-5' : 'sm:-left-5',
                                        )}
                                    >
                                        {index + 1}
                                    </div>

                                    <div className="rounded-2xl border bg-card p-6">
                                        <div className="flex items-center gap-3">
                                            {Icon && (
                                                <div className="inline-flex size-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                                                    <Icon className="size-4" />
                                                </div>
                                            )}
                                            <h3 className="text-base font-semibold text-foreground">
                                                {item.title}
                                            </h3>
                                        </div>
                                        {item.description && (
                                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </RevealItem>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
