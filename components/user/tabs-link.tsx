import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HomeIcon, PackageIcon, Settings, ShoppingBagIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
}

interface TabsLinkProps {
  navItems: NavItem[]
}

export function TabsLink({navItems}: TabsLinkProps) {
  return (
    <div className="flex-none md:hidden bg-background/80 backdrop-blur-md border-t">
      <TabsList className="flex h-16 w-full items-center justify-around bg-transparent border-none">
        {navItems.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="flex flex-col gap-1 text-muted-foreground data-[state=active]:text-primary bg-transparent shadow-none"
          >
            {item.id === "inicio" && <HomeIcon className="size-5" />}
            {item.id === "produtos" && <PackageIcon className="size-5" />}
            {item.id === "carrinho" && <ShoppingBagIcon className="size-5" />}
            {item.id === "ajustes" && <Settings className="size-5" />}
            <span className="text-[10px] font-medium">{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}