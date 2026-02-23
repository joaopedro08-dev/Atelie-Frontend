import Body from "@/components/admin/body";
import { PrivateRoute } from "@/routes/private-route";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateRoute allowedRoles={["ADMIN"]}>
            <Body>{children}</Body>
        </PrivateRoute>
    );
}