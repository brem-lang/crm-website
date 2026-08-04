import { Head } from '@inertiajs/react';
import type { SiteSettings } from '@/types/sections';

export function SiteHead({ settings }: { settings: SiteSettings }) {
    const title = settings.seo_title ?? settings.site_title ?? 'AlphaMasterCRM';
    const description = settings.seo_description ?? '';

    return (
        <Head title={title}>
            {description && <meta name="description" content={description} />}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            {settings.logo_url && <meta property="og:image" content={settings.logo_url} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {settings.favicon_url && <link rel="icon" href={settings.favicon_url} />}
        </Head>
    );
}
