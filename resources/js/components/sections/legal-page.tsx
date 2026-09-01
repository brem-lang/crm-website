import type { ReactNode } from 'react';

import { Container } from '@/components/sections/container';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHead } from '@/components/sections/site-head';
import { SiteHeader } from '@/components/sections/site-header';
import type { SiteSettings } from '@/types/sections';

/**
 * Shared shell for static legal pages (Privacy Policy, Terms) — same header/
 * footer as the rest of the site, just a simple prose column for the body.
 */
export function LegalPage({
    settings,
    title,
    children,
}: {
    settings: SiteSettings;
    title: string;
    children: ReactNode;
}) {
    return (
        <>
            <SiteHead settings={settings} />

            <div className="font-landing flex min-h-screen flex-col bg-background text-foreground">
                <SiteHeader settings={settings} />

                <main className="flex-1 py-16 sm:py-20">
                    <Container className="max-w-3xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                            {title}
                        </h1>
                        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground">
                            {children}
                        </div>
                    </Container>
                </main>

                <SiteFooter settings={settings} />
            </div>
        </>
    );
}
