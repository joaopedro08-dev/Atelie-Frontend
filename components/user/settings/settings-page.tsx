import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                    <CardDescription>Ajustes de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="gap-2">
                        <ShieldCheck className="size-4" /> Alterar Senha
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}