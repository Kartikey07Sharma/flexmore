// Centralized REST client for the Flexmore Express backend.
// Set VITE_API_URL in your .env (e.g. http://localhost:4000 or https://api.flexmore.com)
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "";

const TOKEN_KEY = "flexmore_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

type Options = RequestInit & { auth?: boolean };

export async function api<T = any>(path: string, opts: Options = {}): Promise<T> {
  const headers = new Headers(opts.headers);
  const isForm = opts.body instanceof FormData;
  if (!isForm && !headers.has("Content-Type") && opts.body) {
    headers.set("Content-Type", "application/json");
  }
  if (opts.auth !== false) {
    const t = tokenStore.get();
    if (t) headers.set("Authorization", `Bearer ${t}`);
  }
  const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as any)?.message || (data as any)?.error || `Request failed (${res.status})`);
  }
  return data as T;
}

export const apiUrl = (path: string) =>
  path?.startsWith("http") ? path : `${API_URL}${path?.startsWith("/") ? "" : "/"}${path || ""}`;
