import { Menu } from 'lucide-react';
import { useState } from 'react';

import { AppearanceToggleButton } from '@/components/appearance-toggle-button';
import { Container } from '@/components/sections/container';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { home, login } from '@/routes';
import type { SiteSettings } from '@/types/sections';

const NAV_LINKS = [
    { href: '#platform-features', label: 'Features' },
    { href: '#product-showcase', label: 'Product' },
    { href: '#pipeline', label: 'Pipeline' },
    { href: '#industries', label: 'Industries' },
    { href: '#pricing', label: 'Pricing' },
    { href: '/api-docs', label: 'API' },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
            <Container className="flex h-16 items-center justify-between">
                <a href={home().url} className="flex items-center gap-2 font-semibold tracking-tight">
                    {settings.logo_url ? (
                        <img
                            src={settings.logo_url}
                            alt={settings.site_title ?? ''}
                            className="h-12"
                        />
                    ) : (
                        <span className="text-base">
                            {settings.site_title ?? 'AlphaMasterCRM'}
                        </span>
                    )}
                </a>

                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                    <AppearanceToggleButton />
                    <a
                        href={login().url}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Log in
                    </a>
                    <Button asChild variant="gradient">
                        <a href="#demo">Book a Demo</a>
                    </Button>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <AppearanceToggleButton />
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-xs">
                            <SheetHeader>
                                <SheetTitle>
                                    {settings.site_title ?? 'AlphaMasterCRM'}
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-4">
                                {NAV_LINKS.map((link) => (
                                    <SheetClose key={link.href} asChild>
                                        <a
                                            href={link.href}
                                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                        >
                                            {link.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                            <div className="mt-2 flex flex-col gap-2 px-4">
                                <SheetClose asChild>
                                    <Button asChild variant="outline" className="w-full">
                                        <a href={login().url}>Log in</a>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button asChild variant="gradient" className="w-full">
                                        <a href="#demo">Book a Demo</a>
                                    </Button>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
