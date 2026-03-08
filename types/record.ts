export const paymentTranslations: Record<string, string> = {
    SYSTEM: "Pix",
    CARD: "Cartão",
    INSTALLMENT_PLAN: "Crediário",
    LOYAL_CUSTOMER: "Cliente Fidelizado"
};

export const statusTranslations: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
    IN_PROGRESS: { label: "Em Produção", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    COMPLETED: { label: "Concluído", color: "bg-green-500/10 text-green-600 border-green-200" },
    CANCELED: { label: "Cancelado", color: "bg-red-500/10 text-red-600 border-red-200" },
};

export const routeNames: Record<string, string> = {
    "/admin": "Início",
    "/admin/dashboard": "Dashboard",
    "/admin/clients": "Clientes",
    "/admin/itens": "Gerenciar Itens",
    "/admin/orders": "Pedidos",
    "/admin/settings": "Configurações",
};

export const ROLE_REDIRECT: Record<string, string> = {
  ADMIN: "/admin",
  USER: "/user",
};