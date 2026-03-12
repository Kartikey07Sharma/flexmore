import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PublicLayout from "@/components/PublicLayout";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories } from "@/hooks/use-products";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const categoryFilter = searchParams.get("category") || "all";
  const { data: products = [], isLoading } = useProducts(categoryFilter);
  const { data: categories = [] } = useCategories();

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q) || p.material.toLowerCase().includes(q)
    );
  }, [search, products]);

  return (
    <PublicLayout>
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Products</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body">Browse our complete range of elastic and textile manufacturing products.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 font-body" />
            </div>
            <Select value={categoryFilter} onValueChange={(v) => setSearchParams(v === "all" ? {} : { category: v })}>
              <SelectTrigger className="w-full sm:w-[220px] font-body"><SelectValue placeholder="All Categories" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-20"><p className="text-muted-foreground font-body text-lg">Loading products...</p></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20"><p className="text-muted-foreground font-body text-lg">No products found matching your criteria.</p></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
