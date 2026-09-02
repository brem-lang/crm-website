import { useMemo, useState } from 'react';

import { Container } from '@/components/sections/container';
import { Reveal } from '@/components/sections/reveal';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import type { PublicSection } from '@/types/sections';

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export function RoiCalculator({ section }: { section: PublicSection }) {
    const [leadsPerMonth, setLeadsPerMonth] = useState(500);
    const [closeRate, setCloseRate] = useState(12);
    const [dealValue, setDealValue] = useState(600);

    const { currentMonthly, projectedMonthly, projectedAnnualGain, currentShare } = useMemo(() => {
        const rate = closeRate / 100;
        const projectedRate = Math.min(1, rate + 0.05);

        const current = leadsPerMonth * rate * dealValue;
        const projected = leadsPerMonth * projectedRate * dealValue;

        return {
            currentMonthly: current,
            projectedMonthly: projected,
            projectedAnnualGain: (projected - current) * 12,
            currentShare: projected > 0 ? (current / projected) * 100 : 0,
        };
    }, [leadsPerMonth, closeRate, dealValue]);

    return (
        <section id="roi-calculator" className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-20 sm:py-28">
            <Container className="max-w-4xl">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 text-lg text-white/80">{section.subtitle}</p>
                    )}
                </Reveal>

                <Reveal
                    delay={0.1}
                    className="mt-14 rounded-3xl border bg-card p-8 shadow-xl shadow-slate-900/5 sm:p-10"
                >
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div className="grid gap-8 self-center">
                            <div className="grid gap-3">
                                <div className="flex items-baseline justify-between">
                                    <Label htmlFor="roi-leads">Leads per month</Label>
                                    <span className="text-sm font-semibold tabular-nums text-indigo-600">
                                        {leadsPerMonth.toLocaleString()}
                                    </span>
                                </div>
                                <Slider
                                    id="roi-leads"
                                    min={50}
                                    max={5000}
                                    step={50}
                                    value={[leadsPerMonth]}
                                    onValueChange={([value]) => setLeadsPerMonth(value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-baseline justify-between">
                                    <Label htmlFor="roi-close-rate">Current close rate</Label>
                                    <span className="text-sm font-semibold tabular-nums text-indigo-600">
                                        {closeRate}%
                                    </span>
                                </div>
                                <Slider
                                    id="roi-close-rate"
                                    min={1}
                                    max={60}
                                    step={1}
                                    value={[closeRate]}
                                    onValueChange={([value]) => setCloseRate(value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-baseline justify-between">
                                    <Label htmlFor="roi-deal-value">Average deal value</Label>
                                    <span className="text-sm font-semibold tabular-nums text-indigo-600">
                                        {currency.format(dealValue)}
                                    </span>
                                </div>
                                <Slider
                                    id="roi-deal-value"
                                    min={50}
                                    max={5000}
                                    step={50}
                                    value={[dealValue]}
                                    onValueChange={([value]) => setDealValue(value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-center gap-4 rounded-2xl border bg-muted/30 p-6">
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                    Revenue today
                                </p>
                                <p className="mt-1 text-3xl font-extrabold tabular-nums text-foreground">
                                    {currency.format(currentMonthly)}
                                    <span className="text-base font-medium text-muted-foreground">
                                        {' '}
                                        / mo
                                    </span>
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase">
                                    With AlphaMasterCRM (+5pp close rate)
                                </p>
                                <p className="mt-1 text-3xl font-extrabold tabular-nums text-indigo-600">
                                    {currency.format(projectedMonthly)}
                                    <span className="text-base font-medium text-muted-foreground">
                                        {' '}
                                        / mo
                                    </span>
                                </p>

                                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-indigo-600/15">
                                    <div
                                        className="h-full rounded-full bg-indigo-600"
                                        style={{ width: `${Math.min(100, currentShare)}%` }}
                                    />
                                </div>
                                <p className="mt-1.5 text-xs text-muted-foreground">
                                    Revenue today vs. projected
                                </p>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                That's{' '}
                                <span className="font-semibold tabular-nums text-foreground">
                                    {currency.format(Math.max(0, projectedAnnualGain))}
                                </span>{' '}
                                in extra revenue a year from leads you're already generating.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
