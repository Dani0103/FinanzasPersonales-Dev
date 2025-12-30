const BASE_URL = import.meta.env.VITE_API_URL as string;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function api<T>(
    path: string,
    options?: {
        method?: HttpMethod;
        body?: any;
        token?: string | null;
    }
): Promise<T> {
    const method = options?.method ?? "GET";
    const token = options?.token ?? localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    // intenta leer JSON siempre
    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const msg = data?.message ?? `HTTP ${res.status}`;
        throw new Error(msg);
    }

    return data as T;
}
