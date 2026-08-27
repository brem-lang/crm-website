import { SectionRenderer } from '@/components/sections/section-renderer';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHead } from '@/components/sections/site-head';
import { SiteHeader } from '@/components/sections/site-header';
import type { PublicSection, SiteSettings } from '@/types/sections';

export default function Welcome({
    sections,
    settings,
    demoRequestSubmitted,
}: {
    sections: PublicSection[];
    settings: SiteSettings;
    demoRequestSubmitted: boolean;
}) {
    // Renders in whatever appearance the visitor already has (system default
    // is light, per the site's light :root tokens) — same as every other
    // page. Previously this forced dark mode, but the reference design is a
    // light, airy page by default; forcing dark actively fought that look.
    return (
        <>
            <SiteHead settings={settings} />

            <div className="font-landing flex min-h-screen flex-col bg-background text-foreground">
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
