import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import type { SiteSettings } from '@/types/sections';

export function SiteHeader({ settings }: { settings: SiteSettings }) {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-semibold">
                    {settings.logo_url ? (
                        <img src={settings.logo_url} alt={settings.site_title ?? ''} className="h-7" />
                    ) : (
                        <span>{settings.site_title ?? 'AlphaMasterCRM'}</span>
                    )}
                </a>

                <Button asChild>
                    <a href="#demo">Book a Demo</a>
                </Button>
            </Container>
        </header>
    );
}
