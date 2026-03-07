import BodyPage from "@/components/user/body";
import { PrivateRoute } from "@/routes/private-route";

export default function UserPage() {
    return (
        <PrivateRoute allowedRoles={["USER"]}>
            <BodyPage />
        </PrivateRoute>
    )
}