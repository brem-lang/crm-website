import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';

import { BrandMark, SiteWordmark } from '@/components/sections/brand-mark';
import { Container } from '@/components/sections/container';
import { apiDocs, home, login } from '@/routes';
import type { SiteSettings } from '@/types/sections';

const PLATFORM_LINKS = [
    { href: '#platform-features', label: 'Features' },
    { href: '#industries', label: 'Solutions' },
    { href: '#pipeline', label: 'Integrations' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#security', label: 'Security' },
    { href: apiDocs().url, label: 'API Docs' },
];

const SOCIAL_LINKS: { key: keyof SiteSettings; label: string; icon: typeof Facebook }[] = [
    { key: 'social_facebook', label: 'Facebook', icon: Facebook },
    { key: 'social_instagram', label: 'Instagram', icon: Instagram },
    { key: 'social_linkedin', label: 'LinkedIn', icon: Linkedin },
    { key: 'social_twitter', label: 'X / Twitter', icon: Twitter },
];

function resolveHref(href: string) {
    return href.startsWith('#') ? `${home().url}${href}` : href;
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
    const socials = SOCIAL_LINKS.filter((link) => settings[link.key]);
    const siteTitle = settings.site_title ?? 'AlphaMasterCRM';

    return (
        <footer className="border-t border-white/10 bg-neutral-950 text-neutral-300">
            <Container className="py-16">
                <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
                    <div className="max-w-sm">
                        <a href={home().url} className="flex items-center gap-2.5 font-semibold tracking-tight">
                            {settings.logo_url ? (
                                <img src={settings.logo_url} alt={siteTitle} className="h-7" />
                            ) : (
                                <>
                                    <BrandMark className="size-8" />
                                    <SiteWordmark title={siteTitle} className="text-base text-white" />
                                </>
                            )}
                        </a>
                        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
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
                                            className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-neutral-400 transition-colors hover:border-indigo-500 hover:text-indigo-400"
                                        >
                                            <Icon className="size-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Platform</h3>
                        <ul className="mt-4 space-y-3">
                            {PLATFORM_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={resolveHref(link.href)}
                                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Company</h3>
                        <ul className="mt-4 space-y-3">
                            {settings.contact_email && (
                                <li>
                                    <a
                                        href={`mailto:${settings.contact_email}`}
                                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
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
                                        className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
                                    >
                                        <Phone className="size-4 shrink-0" />
                                        {settings.contact_phone}
                                    </a>
                                </li>
                            )}
                            <li>
                                <a
                                    href="/privacy"
                                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/terms"
                                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                                >
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a
                                    href={login().url}
                                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                                >
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-sm text-neutral-500">
                    &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
