import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';

import { Container } from '@/components/sections/container';
import type { SiteSettings } from '@/types/sections';

const NAV_LINKS = [
    { href: '#why-us', label: 'Features' },
    { href: '#product-showcase', label: 'Product' },
    { href: '#platform', label: 'Platform' },
    { href: '#pipeline', label: 'Pipeline' },
    { href: '#industries', label: 'Industries' },
];

const SOCIAL_LINKS: { key: keyof SiteSettings; label: string; icon: typeof Facebook }[] = [
    { key: 'social_facebook', label: 'Facebook', icon: Facebook },
    { key: 'social_instagram', label: 'Instagram', icon: Instagram },
    { key: 'social_linkedin', label: 'LinkedIn', icon: Linkedin },
    { key: 'social_twitter', label: 'X / Twitter', icon: Twitter },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
    const socials = SOCIAL_LINKS.filter((link) => settings[link.key]);
    const siteTitle = settings.site_title ?? 'AlphaMasterCRM';

    return (
        <footer className="border-t border-border/60 bg-muted/30">
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
                    <div className="max-w-sm">
                        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
                            {settings.logo_url ? (
                                <img src={settings.logo_url} alt={siteTitle} className="h-7" />
                            ) : (
                                <span className="text-base">{siteTitle}</span>
                            )}
                        </a>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            The all-in-one CRM for Forex, crypto, call centers, and sales teams —
                            manage leads, close deals, and scale your operation from one platform.
                        </p>

                        {socials.length > 0 && (
                            <div className="mt-6 flex items-center gap-3">
                                {socials.map((link) => {
                                    const Icon = link.icon;

                                    return (
                                        <a
                                            key={link.key}
                                            href={settings[link.key] ?? '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.label}
                                            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-blue-600 hover:text-blue-600"
                                        >
                                            <Icon className="size-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Platform</h3>
                        <ul className="mt-4 space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Get in touch</h3>
                        <ul className="mt-4 space-y-3">
                            {settings.contact_email && (
                                <li>
                                    <a
                                        href={`mailto:${settings.contact_email}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <Mail className="size-4 shrink-0" />
                                        {settings.contact_email}
                                    </a>
                                </li>
                            )}
                            {settings.contact_phone && (
                                <li>
                                    <a
                                        href={`tel:${settings.contact_phone}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <Phone className="size-4 shrink-0" />
                                        {settings.contact_phone}
                                    </a>
                                </li>
                            )}
                            <li>
                                <a
                                    href="#demo"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Book a Demo →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
