import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { Industries } from '@/components/sections/industries';
import { LeadPipeline } from '@/components/sections/lead-pipeline';
import { PlatformFeatures } from '@/components/sections/platform-features';
import { PowerfulManagement } from '@/components/sections/powerful-management';
import { ProductShowcase } from '@/components/sections/product-showcase';
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
