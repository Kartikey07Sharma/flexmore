import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  category_name?: string;
  category_slug?: string;
  description: string;
  short_description: string;
  material?: string;
  applications?: string[];
  specifications: Record<string, any>;
  colors?: string[];
  featured: boolean;
  primary_image?: string | null;
  images?: { id: string; url: string; sort_order: number }[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api<Category[]>("/api/categories", { auth: false }),
  });
}

export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: ["products", categorySlug],
    queryFn: () => {
      const qs = categorySlug && categorySlug !== "all" ? `?category=${encodeURIComponent(categorySlug)}` : "";
      return api<Product[]>(`/api/products${qs}`, { auth: false });
    },
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => api<Product[]>("/api/products?featured=true&limit=4", { auth: false }),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => api<Product>(`/api/products/${slug}`, { auth: false }),
    enabled: !!slug,
  });
}

export function useProductImages(productId: string) {
  return useQuery({
    queryKey: ["product-images", productId],
    queryFn: async () => {
      // images are returned with the single product fetch; this is a fallback
      const all = await api<Product[]>("/api/products?limit=1000", { auth: false });
      const p = all.find((x) => x.id === productId);
      return p?.images ?? [];
    },
    enabled: !!productId,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (product: Partial<Product>) =>
      api<Product>("/api/products", { method: "POST", body: JSON.stringify(product) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updates }: Partial<Product> & { id: string }) =>
      api<Product>(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<void>(`/api/products/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (category: { name: string; slug: string; description: string }) =>
      api<Category>("/api/categories", { method: "POST", body: JSON.stringify(category) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api<void>(`/api/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}
