"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Logout from "@/components/logout";

export function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                    <CardDescription>Ajustes de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                    <Logout />
                </CardContent>
            </Card>
        </div>
    );
}