import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [products, categories, blogPosts, inquiries] = await Promise.all([
        api<any[]>("/api/products?limit=1000", { auth: false }),
        api<any[]>("/api/categories", { auth: false }),
        api<any[]>("/api/blog?all=true"),
        api<any[]>("/api/inquiries"),
      ]);
      return {
        products: products.length,
        categories: categories.length,
        blogPosts: blogPosts.length,
        inquiries: inquiries.length,
      };
    },
  });
}
