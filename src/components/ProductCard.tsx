import { Link } from "react-router-dom";
import type { Product } from "@/hooks/use-products";
import productsElasticImg from "@/assets/products-elastic.jpg";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={productsElasticImg}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.short_description}</p>
        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-navy-light transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
