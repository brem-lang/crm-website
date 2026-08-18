import { SectionRenderer } from '@/components/sections/section-renderer';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHead } from '@/components/sections/site-head';
import { SiteHeader } from '@/components/sections/site-header';
import type { PublicSection, SiteSettings } from '@/types/sections';
import { useEffect } from 'react';

export default function Welcome({
    sections,
    settings,
    demoRequestSubmitted,
}: {
    sections: PublicSection[];
    settings: SiteSettings;
    demoRequestSubmitted: boolean;
}) {
    // The theme tokens resolve against the root element, so forcing dark
    // mode has to happen on <html> itself — not on a wrapper div further
    // down the tree. Scoped to this page only; restores whatever the
    // user's normal appearance was when they navigate away.
    useEffect(() => {
        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');
        const previousColorScheme = root.style.colorScheme;

        root.classList.add('dark');
        root.style.colorScheme = 'dark';

        return () => {
            root.classList.toggle('dark', wasDark);
            root.style.colorScheme = previousColorScheme;
        };
    }, []);

    return (
        <>
            <SiteHead settings={settings} />

            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <SiteHeader settings={settings} />

                <main className="flex-1">
                    <SectionRenderer
                        sections={sections}
                        demoRequestSubmitted={demoRequestSubmitted}
                    />
                </main>

                <SiteFooter settings={settings} />
            </div>
        </>
    );
}
