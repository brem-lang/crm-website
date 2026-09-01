import { LegalPage } from '@/components/sections/legal-page';
import type { SiteSettings } from '@/types/sections';

export default function Privacy({ settings }: { settings: SiteSettings }) {
    return (
        <LegalPage settings={settings} title="Privacy Policy">
            <p>
                Our full privacy policy is coming soon. In the meantime, if you have
                questions about how your data is collected, used, or stored, reach out
                to{' '}
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
