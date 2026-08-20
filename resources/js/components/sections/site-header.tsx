import { Menu } from 'lucide-react';
import { useState } from 'react';

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
import type { SiteSettings } from '@/types/sections';

const NAV_LINKS = [
    { href: '#platform-features', label: 'Features' },
    { href: '#product-showcase', label: 'Product' },
    { href: '#pipeline', label: 'Pipeline' },
    { href: '#industries', label: 'Industries' },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
            <Container className="flex h-16 items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
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

                <div className="hidden lg:block">
                    <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                        <a href="#demo">Book a Demo</a>
                    </Button>
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
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
                        <div className="mt-2 px-4">
                            <SheetClose asChild>
                                <Button
                                    asChild
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    <a href="#demo">Book a Demo</a>
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </Container>
        </header>
    );
}
