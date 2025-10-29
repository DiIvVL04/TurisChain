import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TransparencySection } from "@/components/transparency-section"
import { AboutSection } from "@/components/about-section"

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TransparencySection />
                <AboutSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    )
}
