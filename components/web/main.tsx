import AboutUs from "./main/about-us"
import HeroSection from "./main/hero-section"
import Policies from "./main/policies"
import ProductGrid from "./main/products-grid"

export default function Main() {
    return (
        <main className="relative flex items-center justify-center flex-col">
            <HeroSection />
            <ProductGrid />
            <AboutUs />
            <Policies />
        </main>
    )
}