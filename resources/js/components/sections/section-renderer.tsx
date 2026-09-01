import { CtaBanner } from '@/components/sections/cta-banner';
import { Faq } from '@/components/sections/faq';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { IconGrid } from '@/components/sections/icon-grid';
import { Industries } from '@/components/sections/industries';
import { LeadPipeline } from '@/components/sections/lead-pipeline';
import { PlatformFeatures } from '@/components/sections/platform-features';
import { PowerfulManagement } from '@/components/sections/powerful-management';
import { Pricing } from '@/components/sections/pricing';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { RoiCalculator } from '@/components/sections/roi-calculator';
import { SocialProof } from '@/components/sections/social-proof';
import type { PublicSection } from '@/types/sections';

export function SectionRenderer({
    sections,
    demoRequestSubmitted,
}: {
    sections: PublicSection[];
    demoRequestSubmitted: boolean;
}) {
    return (
        <>
            {sections.map((section) => {
                switch (section.key) {
                    case 'hero':
                        return <Hero key={section.id} section={section} />;
                    case 'platform_features':
                        return <PlatformFeatures key={section.id} section={section} />;
                    case 'mid_page_cta':
                        return <CtaBanner key={section.id} section={section} />;
                    case 'forex_brokers':
                        return <IconGrid key={section.id} section={section} id="forex-brokers" />;
                    case 'sales_team':
                        return <IconGrid key={section.id} section={section} id="sales-team" />;
                    case 'security':
                        return <IconGrid key={section.id} section={section} id="security" />;
                    case 'product_showcase':
                        return <ProductShowcase key={section.id} section={section} />;
                    case 'industries':
                        return <Industries key={section.id} section={section} />;
                    case 'powerful_management':
                        return <PowerfulManagement key={section.id} section={section} />;
                    case 'lead_pipeline':
                        return <LeadPipeline key={section.id} section={section} />;
                    case 'social_proof':
                        return <SocialProof key={section.id} section={section} />;
                    case 'roi_calculator':
                        return <RoiCalculator key={section.id} section={section} />;
                    case 'pricing':
                        return <Pricing key={section.id} section={section} />;
                    case 'faq':
                        return <Faq key={section.id} section={section} />;
                    case 'final_cta':
                        return (
                            <FinalCta
                                key={section.id}
                                section={section}
                                submitted={demoRequestSubmitted}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}
