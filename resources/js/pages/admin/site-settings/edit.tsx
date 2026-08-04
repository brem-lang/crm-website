import { Form, Head } from '@inertiajs/react';
import { ImageIcon, Mail, Search, Share2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/image-upload';
import { PanelCard } from '@/components/admin/panel-card';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes/admin';
import siteSettings, { edit } from '@/routes/admin/site-settings';

type Settings = {
    site_title: string | null;
    seo_title: string | null;
    seo_description: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    social_facebook: string | null;
    social_instagram: string | null;
    social_linkedin: string | null;
    social_twitter: string | null;
    logo_url: string | null;
    favicon_url: string | null;
};

const SOCIAL_LINKS = [
    ['social_facebook', 'Facebook'],
    ['social_instagram', 'Instagram'],
    ['social_linkedin', 'LinkedIn'],
    ['social_twitter', 'X / Twitter'],
] as const;

export default function SiteSettingsEdit({ settings }: { settings: Settings }) {
    return (
        <>
            <Head title="Site Settings" />

            <div className="w-full space-y-6 p-4">
                <Heading
                    title="Site Settings"
                    description="SEO, contact info, social links, and branding — all in one place."
                />

                <Form
                    {...siteSettings.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="columns-1 gap-6 lg:columns-2">
                                <PanelCard
                                    className="mb-6"
                                    icon={Search}
                                    title="General & SEO"
                                    description="How your site is titled and described in search results."
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="site_title">
                                            Site Title
                                        </Label>
                                        <Input
                                            id="site_title"
                                            name="site_title"
                                            defaultValue={
                                                settings.site_title ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.site_title}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_title">
                                            SEO Title
                                        </Label>
                                        <Input
                                            id="seo_title"
                                            name="seo_title"
                                            defaultValue={
                                                settings.seo_title ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.seo_title}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_description">
                                            SEO Description
                                        </Label>
                                        <Textarea
                                            id="seo_description"
                                            name="seo_description"
                                            rows={3}
                                            defaultValue={
                                                settings.seo_description ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.seo_description}
                                        />
                                    </div>
                                </PanelCard>

                                <PanelCard
                                    className="mb-6"
                                    icon={Share2}
                                    title="Social Links"
                                    description="Linked from the site footer. Leave blank to hide."
                                >
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {SOCIAL_LINKS.map(([name, label]) => (
                                            <div
                                                className="grid gap-2"
                                                key={name}
                                            >
                                                <Label htmlFor={name}>
                                                    {label}
                                                </Label>
                                                <Input
                                                    id={name}
                                                    name={name}
                                                    placeholder="https://"
                                                    defaultValue={
                                                        settings[name] ?? ''
                                                    }
                                                />
                                                <InputError
                                                    message={errors[name]}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </PanelCard>

                                <PanelCard
                                    className="mb-6"
                                    icon={Mail}
                                    title="Contact"
                                    description="Shown in the site footer for visitors to reach you."
                                >
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="contact_email">
                                                Contact Email
                                            </Label>
                                            <Input
                                                id="contact_email"
                                                name="contact_email"
                                                type="email"
                                                defaultValue={
                                                    settings.contact_email ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.contact_email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="contact_phone">
                                                Contact Phone
                                            </Label>
                                            <Input
                                                id="contact_phone"
                                                name="contact_phone"
                                                defaultValue={
                                                    settings.contact_phone ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.contact_phone}
                                            />
                                        </div>
                                    </div>
                                </PanelCard>

                                <PanelCard
                                    className="mb-6"
                                    icon={ImageIcon}
                                    title="Branding"
                                    description="Your logo and favicon, used across the site and browser tab."
                                >
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <ImageUpload
                                            name="logo"
                                            label="Logo"
                                            currentUrl={settings.logo_url}
                                            error={errors.logo}
                                        />

                                        <ImageUpload
                                            name="favicon"
                                            label="Favicon"
                                            currentUrl={settings.favicon_url}
                                            error={errors.favicon}
                                        />
                                    </div>
                                </PanelCard>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    size="lg"
                                >
                                    Save Settings
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

SiteSettingsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Site Settings', href: edit() },
    ],
};
