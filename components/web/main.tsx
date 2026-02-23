import AboutUs from "./about-us"
import HeroSection from "./hero-section"
import Policies from "./policies"
import ProductGrid from "./products-grid"

export default function Main() {
    return (
        <main className="relative min-h-dvh overflow-hidden flex items-center justify-center flex-col">
            <HeroSection />
            <ProductGrid />
            <AboutUs />
            <Policies />
        </main>
    )
}