import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";
import { products, categories } from "@/data/products";
import productsElasticImg from "@/assets/products-elastic.jpg";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button asChild variant="outline"><Link to="/products"><ArrowLeft className="mr-2 w-4 h-4" /> Back to Products</Link></Button>
        </div>
      </PublicLayout>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container-wide">
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-body">
            <ArrowLeft className="mr-1 w-4 h-4" /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                <img src={productsElasticImg} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div>
              {category && <p className="text-sm font-medium text-secondary-foreground/60 uppercase tracking-wider mb-2 font-body">{category.name}</p>}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed mb-8 font-body">{product.description}</p>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground font-body">{key}</p>
                      <p className="font-semibold text-sm text-foreground font-body">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Material</h3>
                <p className="text-muted-foreground font-body">{product.material}</p>
              </div>

              {/* Applications */}
              <div className="mb-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span key={app} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full font-body">{app}</span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-body">{color}</span>
                  ))}
                </div>
              </div>

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
