import { JSX } from "react";

export type UserRole = "ADMIN" | "USER";

export type ItemMin = {
    id: string;
    itemCode: string;
    quantity: number;
}

export type AppSidebarProps = {
    username: string;
    role: string;
}

export type Categories = {
    name: string;
    href: string;
    icon: JSX.Element;
};

export type NavItem = {
    id: string;
    label: string;
}