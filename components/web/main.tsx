import AboutUs from "../users/about-us"
import ContactUs from "../users/contact-us"
import HeroSection from "../users/hero-section"
import Policies from "../users/policies"
import ProductGrid from "../users/products-grid"

export default function Main() {
    return (
        <main className="relative min-h-screen overflow-hidden flex items-center justify-center flex-col">
            <HeroSection />
            <ProductGrid />
            <AboutUs />
            <Policies />
            <ContactUs />
        </main>
    )
}