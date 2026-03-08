"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Menu,
  StoreIcon,
  X,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";
import { Categories } from "@/types/type";

export default function ToggleMenu({ categories }: { categories: Categories[] }) {
  const { theme, setTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Sheet>
      <SheetTrigger render={
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      } />

      <SheetContent
        showCloseButton={false}
        side="left"
        className="bg-background flex flex-col h-full w-75 p-0"
      >
        <SheetHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
          <SheetTitle>
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                <StoreIcon size={18} />
              </div>
              <span className="font-bold tracking-widest uppercase text-lg">
                Ateliê
              </span>
            </Link>
          </SheetTitle>

          <SheetClose render={
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar</span>
            </Button>
          } />
        </SheetHeader>

        <div className="px-4 py-2">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
            Em Geral
          </h3>
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-all"
              >
                {cat.icon}
                {cat.name}
              </a>
            ))}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-all"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} className="text-muted-foreground" />
                  Modo Claro
                </>
              ) : (
                <>
                  <Moon size={18} className="text-muted-foreground" />
                  Modo Escuro
                </>
              )}
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-border bg-muted/20 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © {currentYear} Ateliê - Todos os direitos reservados.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}