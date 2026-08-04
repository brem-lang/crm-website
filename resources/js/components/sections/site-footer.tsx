import { Container } from '@/components/sections/container';
import type { SiteSettings } from '@/types/sections';

const SOCIAL_LINKS: { key: keyof SiteSettings; label: string }[] = [
    { key: 'social_facebook', label: 'Facebook' },
    { key: 'social_instagram', label: 'Instagram' },
    { key: 'social_linkedin', label: 'LinkedIn' },
    { key: 'social_twitter', label: 'X / Twitter' },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
    const socials = SOCIAL_LINKS.filter((link) => settings[link.key]);

    return (
        <footer className="border-t py-10">
            <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
                <p>
                    &copy; {new Date().getFullYear()} {settings.site_title ?? 'AlphaMasterCRM'}. All
                    rights reserved.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    {settings.contact_email && (
                        <a href={`mailto:${settings.contact_email}`} className="hover:text-foreground">
                            {settings.contact_email}
                        </a>
                    )}
                    {settings.contact_phone && (
                        <a href={`tel:${settings.contact_phone}`} className="hover:text-foreground">
                            {settings.contact_phone}
                        </a>
                    )}
                    {socials.map((link) => (
                        <a
                            key={link.key}
                            href={settings[link.key] ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </Container>
        </footer>
    );
}
