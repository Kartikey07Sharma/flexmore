import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [products, categories, blogPosts, inquiries] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
      ]);
      return {
        products: products.count ?? 0,
        categories: categories.count ?? 0,
        blogPosts: blogPosts.count ?? 0,
        inquiries: inquiries.count ?? 0,
      };
    },
  });
}
