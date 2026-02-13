import Body from "@/components/admins/body";
import { PrivateRoute } from "@/routes/private-route";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateRoute>
            <Body>{children}</Body>
        </PrivateRoute>
    );
}