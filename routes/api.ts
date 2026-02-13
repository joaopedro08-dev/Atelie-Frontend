export const API_BASE = (process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCALHOST_API
    : process.env.NEXT_PUBLIC_PRODUCTION_API) as string;