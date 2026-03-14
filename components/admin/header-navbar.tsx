"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { routeNames } from "@/types/record";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";

export default function HeaderNavbar() {
    const pathname = usePathname();
    const router = useRouter();

    const segments = pathname.split('/').filter(Boolean)

    const crumbs = segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/')
        const name = routeNames[path] || segment.replace(/-/g, ' ')
        const isLast = index === segments.length - 1
        return { path, name, isLast }
    })

    const handleNavigate = (path: string) => {
        router.push(path)
    }

    return (
        <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="h-4 w-px bg-border mx-2" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {crumbs.map((crumb) => (
                            <>
                                <BreadcrumbItem key={crumb.path}>
                                    {crumb.isLast ? (
                                        <BreadcrumbPage className="capitalize">
                                            {crumb.name}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            onClick={() => handleNavigate(crumb.path)}
                                            className="capitalize cursor-pointer"
                                        >
                                            {crumb.name}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!crumb.isLast && <BreadcrumbSeparator key={`sep-${crumb.path}`} />}
                            </>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center">
                <ModeToggle />
            </div>
        </header>
    );
}