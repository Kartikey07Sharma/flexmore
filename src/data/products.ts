export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  material: string;
  applications: string[];
  specifications: Record<string, string>;
  colors: string[];
  images: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  { id: "1", name: "Elastic Cords", slug: "elastic-cords", description: "High-quality elastic cords for garment and industrial use" },
  { id: "2", name: "Mask Dori", slug: "mask-dori", description: "Premium mask ear loop elastic" },
  { id: "3", name: "Textile Threads", slug: "textile-threads", description: "Industrial-grade textile threads" },
  { id: "4", name: "Elastic Bands", slug: "elastic-bands", description: "Woven and knitted elastic bands" },
  { id: "5", name: "Industrial Elastic", slug: "industrial-elastic", description: "Heavy-duty elastic materials for industrial applications" },
];

export const products: Product[] = [
  {
    id: "1", name: "Premium Round Elastic Cord", slug: "premium-round-elastic-cord",
    categoryId: "1", shortDescription: "High-stretch round elastic cord ideal for garments and accessories.",
    description: "Our Premium Round Elastic Cord is manufactured using top-grade latex core wrapped with polyester yarn. It offers exceptional elasticity and recovery, making it perfect for garment waistbands, drawstrings, and accessories. Available in multiple diameters and colors to suit your manufacturing needs.",
    material: "Latex core with polyester wrapping",
    applications: ["Garment waistbands", "Drawstrings", "Accessories", "Bags & luggage"],
    specifications: { "Diameter": "1.5mm - 6mm", "Stretch": "200-300%", "Tensile Strength": "2.5 - 8 kg", "Min Order": "500 kg" },
    colors: ["White", "Black", "Navy", "Red", "Custom colors available"],
    images: ["/placeholder.svg"], featured: true,
  },
  {
    id: "2", name: "Flat Braided Elastic", slug: "flat-braided-elastic",
    categoryId: "1", shortDescription: "Versatile flat braided elastic for diverse textile applications.",
    description: "Our Flat Braided Elastic combines durability with comfort. Manufactured on high-speed braiding machines, this elastic provides consistent quality and uniform stretch across the entire width. Ideal for underwear, sportswear, and medical garments.",
    material: "Polyester and natural rubber",
    applications: ["Underwear", "Sportswear", "Medical garments", "Baby clothing"],
    specifications: { "Width": "5mm - 50mm", "Stretch": "150-250%", "Tensile Strength": "3 - 15 kg", "Min Order": "300 kg" },
    colors: ["White", "Black", "Skin tone", "Custom"],
    images: ["/placeholder.svg"], featured: true,
  },
  {
    id: "3", name: "Surgical Mask Ear Loop", slug: "surgical-mask-ear-loop",
    categoryId: "2", shortDescription: "Soft, skin-friendly elastic ear loops for face masks.",
    description: "Specially designed for face mask production, our Surgical Mask Ear Loops are ultra-soft, skin-friendly, and provide comfortable all-day wear. Made with premium spandex core for consistent elasticity.",
    material: "Nylon-covered spandex",
    applications: ["Surgical masks", "N95 masks", "Cloth masks", "Medical PPE"],
    specifications: { "Diameter": "2.5mm - 3mm", "Stretch": "250-350%", "Softness Grade": "A+", "Min Order": "1000 kg" },
    colors: ["White", "Blue", "Black"],
    images: ["/placeholder.svg"], featured: true,
  },
  {
    id: "4", name: "Industrial Polyester Thread", slug: "industrial-polyester-thread",
    categoryId: "3", shortDescription: "Heavy-duty polyester thread for industrial sewing applications.",
    description: "Our Industrial Polyester Thread is engineered for high-speed industrial sewing machines. It offers excellent tensile strength, abrasion resistance, and color fastness. Suitable for denim, leather, upholstery, and heavy-duty garments.",
    material: "100% High-tenacity polyester",
    applications: ["Denim stitching", "Leather goods", "Upholstery", "Heavy garments"],
    specifications: { "Count": "20/2 - 60/3", "Tenacity": "6.5 - 7.5 g/d", "Elongation": "15-25%", "Min Order": "200 kg" },
    colors: ["200+ colors available"],
    images: ["/placeholder.svg"], featured: false,
  },
  {
    id: "5", name: "Woven Elastic Band", slug: "woven-elastic-band",
    categoryId: "4", shortDescription: "Premium woven elastic bands with excellent recovery.",
    description: "Our Woven Elastic Bands are produced on needle looms with precision-controlled tension. They maintain their width under stretch and offer excellent recovery properties. Used in premium garments, medical applications, and industrial products.",
    material: "Polyester with latex or spandex core",
    applications: ["Premium garments", "Medical braces", "Industrial strapping", "Furniture"],
    specifications: { "Width": "10mm - 100mm", "Stretch": "100-200%", "Recovery": ">95%", "Min Order": "500 kg" },
    colors: ["White", "Black", "Custom printed"],
    images: ["/placeholder.svg"], featured: true,
  },
  {
    id: "6", name: "Heavy-Duty Industrial Elastic", slug: "heavy-duty-industrial-elastic",
    categoryId: "5", shortDescription: "Extra-strong elastic for industrial and automotive applications.",
    description: "Engineered for demanding industrial applications, our Heavy-Duty Industrial Elastic provides superior strength and durability. Used in automotive, furniture manufacturing, and heavy machinery applications where standard elastic won't suffice.",
    material: "Reinforced rubber with polyester casing",
    applications: ["Automotive", "Furniture manufacturing", "Machinery", "Packaging"],
    specifications: { "Width": "20mm - 150mm", "Tensile Strength": "20 - 50 kg", "Temperature Range": "-20°C to 80°C", "Min Order": "1000 kg" },
    colors: ["Black", "Natural"],
    images: ["/placeholder.svg"], featured: false,
  },
];
