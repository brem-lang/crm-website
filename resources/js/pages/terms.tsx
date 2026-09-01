import { LegalPage } from '@/components/sections/legal-page';
import type { SiteSettings } from '@/types/sections';

export default function Terms({ settings }: { settings: SiteSettings }) {
    return (
        <LegalPage settings={settings} title="Terms of Service">
            <p>
                Our full terms of service are coming soon. In the meantime, if you have
                questions about using AlphaMasterCRM, reach out to{' '}
                {settings.contact_email ? (
                    <a
                        href={`mailto:${settings.contact_email}`}
                        className="font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        {settings.contact_email}
                    </a>
                ) : (
                    'our team'
                )}
                .
            </p>
        </LegalPage>
    );
}
