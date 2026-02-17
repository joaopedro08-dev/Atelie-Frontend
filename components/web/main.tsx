import AboutUs from "../users/about-us"
import HeroSection from "../users/hero-section"
import Policies from "../users/policies"
import ProductGrid from "../users/products-grid"

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