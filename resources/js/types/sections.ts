export type PublicSectionItem = {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
    link_url: string | null;
    image_url: string | null;
    meta: Record<string, string> | null;
};

export type PublicSection = {
    id: number;
    key: string;
    title: string | null;
    subtitle: string | null;
    body: string | null;
    content: Record<string, string> | null;
    items: PublicSectionItem[];
};

export type SiteSettings = {
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
