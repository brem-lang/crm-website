import { Form } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/sections/container';
import { Reveal } from '@/components/sections/reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import demoRequests from '@/routes/demo-requests';
import type { PublicSection } from '@/types/sections';

const BUSINESS_TYPES = [
    'Forex & CFD',
    'Crypto',
    'Call Centers',
    'Lead Generation',
    'Sales Organizations',
    'Other',
];

export function FinalCta({
    section,
    submitted,
}: {
    section: PublicSection;
    submitted: boolean;
}) {
    const content = section.content ?? {};

    return (
        <section id="demo" className="bg-primary py-20 text-primary-foreground sm:py-28">
            <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <Reveal>
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        {section.title}
                    </h2>
                    {section.subtitle && (
                        <p className="mt-4 max-w-md text-lg text-primary-foreground/80">
                            {section.subtitle}
                        </p>
                    )}
                </Reveal>

                <Reveal
                    delay={0.1}
                    className="rounded-2xl bg-background p-6 text-foreground shadow-2xl sm:p-8"
                >
                    {submitted ? (
                        <div className="flex flex-col items-center gap-3 py-10 text-center">
                            <CheckCircle2 className="size-10 text-primary" />
                            <p className="text-lg font-medium">Thanks — we got your request.</p>
                            <p className="text-sm text-muted-foreground">
                                A member of our team will be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <Form
                            {...demoRequests.store.form()}
                            resetOnSuccess
                            options={{ preserveScroll: true }}
                            className="grid gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" name="name" required />
                                            {errors.name && (
                                                <p className="text-xs text-destructive">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="company">Company</Label>
                                            <Input id="company" name="company" required />
                                            {errors.company && (
                                                <p className="text-xs text-destructive">
                                                    {errors.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" required />
                                            {errors.email && (
                                                <p className="text-xs text-destructive">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="phone">Phone / WhatsApp</Label>
                                            <Input id="phone" name="phone" required />
                                            {errors.phone && (
                                                <p className="text-xs text-destructive">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="country">Country</Label>
                                            <Input id="country" name="country" required />
                                            {errors.country && (
                                                <p className="text-xs text-destructive">
                                                    {errors.country}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid gap-1.5">
                                            <Label htmlFor="business_type">Business Type</Label>
                                            <Select name="business_type" defaultValue={BUSINESS_TYPES[0]}>
                                                <SelectTrigger id="business_type" className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {BUSINESS_TYPES.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.business_type && (
                                                <p className="text-xs text-destructive">
                                                    {errors.business_type}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="message">Message (optional)</Label>
                                        <Textarea id="message" name="message" rows={3} />
                                        {errors.message && (
                                            <p className="text-xs text-destructive">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {errors.form && (
                                        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                            {errors.form}
                                        </p>
                                    )}

                                    <Button type="submit" size="lg" disabled={processing} className="mt-2">
                                        {content.submit_button_text ?? 'Request My Demo'}
                                    </Button>
                                </>
                            )}
                        </Form>
                    )}
                </Reveal>
            </Container>
        </section>
    );
}
