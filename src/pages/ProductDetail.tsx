import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";
import { useProduct, useCategories, useProductImages } from "@/hooks/use-products";
import productsElasticImg from "@/assets/products-elastic.jpg";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug || "");
  const { data: categories = [] } = useCategories();
  const { data: images = [] } = useProductImages(product?.id || "");

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="section-padding flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </PublicLayout>
    );
  }

  if (!product || error) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild variant="outline"><Link to="/products"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Products</Link></Button>
        </div>
      </PublicLayout>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const mainImage = images.length > 0 ? images[0].image_url : productsElasticImg;
  const specs = (product.specifications || {}) as Record<string, string>;

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-wide">
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-body">
            <ArrowLeft className="mr-1 w-4 h-4" /> Back to Products
          </Link>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1).map((img) => (
                    <div key={img.id} className="aspect-square rounded overflow-hidden border border-border">
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {category && <p className="text-sm font-medium text-secondary-foreground/60 uppercase tracking-wider mb-2 font-body">{category.name}</p>}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed mb-8 font-body">{product.description}</p>
              {Object.keys(specs).length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="bg-muted p-3 rounded-md">
                        <p className="text-xs text-muted-foreground font-body">{key}</p>
                        <p className="font-semibold text-sm text-foreground font-body">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Material</h3>
                <p className="text-muted-foreground font-body">{product.material}</p>
              </div>
              {product.applications.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span key={app} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-body">{app}</span>
                    ))}
                  </div>
                </div>
              )}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span key={color} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-body">{color}</span>
                    ))}
                  </div>
                </div>
              )}
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/quote"><MessageSquare className="mr-2 w-4 h-4" /> Request Quote for This Product</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
