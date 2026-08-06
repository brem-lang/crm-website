import { AiAutomation } from '@/components/sections/ai-automation';
import { FinalCta } from '@/components/sections/final-cta';
import { Hero } from '@/components/sections/hero';
import { Industries } from '@/components/sections/industries';
import { LeadPipeline } from '@/components/sections/lead-pipeline';
import { PlatformCapabilities } from '@/components/sections/platform-capabilities';
import { PlatformModules } from '@/components/sections/platform-modules';
import { PowerfulManagement } from '@/components/sections/powerful-management';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { WhyUs } from '@/components/sections/why-us';
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
                    case 'why_us':
                        return <WhyUs key={section.id} section={section} />;
                    case 'product_showcase':
                        return <ProductShowcase key={section.id} section={section} />;
                    case 'industries':
                        return <Industries key={section.id} section={section} />;
                    case 'powerful_management':
                        return <PowerfulManagement key={section.id} section={section} />;
                    case 'platform_modules':
                        return <PlatformModules key={section.id} section={section} />;
                    case 'lead_pipeline':
                        return <LeadPipeline key={section.id} section={section} />;
                    case 'platform_capabilities':
                        return <PlatformCapabilities key={section.id} section={section} />;
                    case 'ai_automation':
                        return <AiAutomation key={section.id} section={section} />;
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
