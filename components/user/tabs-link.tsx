import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeIcon, PackageIcon, Settings, ShoppingBagIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
}

interface TabsLinkProps {
  navItems: NavItem[]
}

export function TabsLink({ navItems }: TabsLinkProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-white/10 py-4 md:hidden">
      <TabsList className="flex h-20 w-full items-center justify-around px-4 bg-transparent border-none shadow-none">
        {navItems.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="group flex w-20 min-h-12 flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
          >
            {item.id === "inicio" && <HomeIcon className="h-5 w-5 group-active:scale-95 transition-transform" />}
            {item.id === "produtos" && <PackageIcon className="h-5 w-5 group-active:scale-95 transition-transform" />}
            {item.id === "carrinho" && <ShoppingBagIcon className="h-5 w-5 group-active:scale-95 transition-transform" />}
            {item.id === "ajustes" && <Settings className="h-5 w-5 group-active:scale-95 transition-transform" />}

            <span className="text-[11px] font-semibold">{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}