import Footer from "@/components/web/footer";
import Header from "@/components/web/header";
import Main from "@/components/web/main";

export default function Page() {
    return (
        <div className="min-h-dvh w-full overflow-x-hidden bg-background text-foreground">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}