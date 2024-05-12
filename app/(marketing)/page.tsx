import { HeroLanding } from "@/components/sections/hero-landing";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SiteFooter } from "@/components/sections/site-footer";

export default function IndexPage() {
  return (
    <main>
      <HeroLanding />
      <PreviewLanding />
      <PricingCards />
      <SiteFooter />
    </main>
  );
}
