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
    return (
        <>
            <SiteHead settings={settings} />

            <div className="flex min-h-screen flex-col">
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
