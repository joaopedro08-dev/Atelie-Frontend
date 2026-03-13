import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { navigation } from "./app-sidebar";

export function NavGroup({ group, groupIndex, pathname, closeSidebar, }: { group: typeof navigation[0]; groupIndex: number; pathname: string; closeSidebar: () => void; }) {
    const [open, setOpen] = useState(true);

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <SidebarGroup className={groupIndex > 0 ? "border-t border-border/40 pt-2 mt-1" : ""}>
                <CollapsibleTrigger>
                    <SidebarGroupLabel className="cursor-pointer flex items-center justify-between hover:text-primary transition-colors">
                        {group.category}
                        <motion.span
                            animate={{ rotate: open ? 0 : -90 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="inline-flex"
                        >
                            <ChevronDown className="size-3 opacity-50" />
                        </motion.span>
                    </SidebarGroupLabel>
                </CollapsibleTrigger>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                                opacity: { duration: 0.2, ease: "easeInOut" }
                            }}
                            style={{ overflow: "hidden" }}
                        >
                            <SidebarMenu>
                                {group.items.map((item: any) => {
                                    const isActive = pathname === item.link;
                                    const Icon = item.icon;
                                    return (
                                        <SidebarMenuItem className="mb-0.5" key={item.link}>
                                            <Link
                                                href={item.link}
                                                onClick={() => closeSidebar()}
                                                className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm transition-colors ${isActive
                                                    ? "bg-primary/10 text-primary border-primary font-medium"
                                                    : "border-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                                                }`}
                                            >
                                                {Icon && <Icon className="size-4 shrink-0" />}
                                                <span className="truncate">{item.label}</span>
                                                {(item.badge ?? 0) > 0 && (
                                                    <span className="ml-auto text-xs bg-primary text-white rounded-full px-1.5 min-w-4.5 text-center leading-5">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </motion.div>
                    )}
                </AnimatePresence>
            </SidebarGroup>
        </Collapsible>
    );
}