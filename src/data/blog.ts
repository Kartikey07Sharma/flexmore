export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1", title: "Understanding Elastic Cord Types for Textile Manufacturing",
    slug: "understanding-elastic-cord-types",
    excerpt: "A comprehensive guide to different types of elastic cords used in the textile industry and how to choose the right one for your application.",
    content: `Elastic cords are fundamental components in textile manufacturing. Understanding the different types available can help manufacturers make informed decisions.\n\n## Types of Elastic Cords\n\n### Round Elastic Cord\nRound elastic cords are the most versatile type, commonly used in garment waistbands, drawstrings, and accessories. They come in various diameters from 1mm to 6mm.\n\n### Flat Braided Elastic\nFlat braided elastic is produced using multiple strands of rubber wrapped with textile yarns. It's ideal for underwear, sportswear, and medical garments.\n\n### Knitted Elastic\nKnitted elastic offers a softer feel and is commonly used in baby clothing and intimate apparel where comfort is paramount.\n\n## Choosing the Right Elastic\nWhen selecting elastic cord for your manufacturing needs, consider stretch percentage, recovery rate, tensile strength, and softness requirements.`,
    image: "/placeholder.svg", createdAt: "2024-12-15", author: "Flexmore Team",
  },
  {
    id: "2", title: "Quality Control in Elastic Manufacturing: Best Practices",
    slug: "quality-control-elastic-manufacturing",
    excerpt: "Learn about the quality control processes that ensure consistent, high-performance elastic products for industrial applications.",
    content: `Quality control is the backbone of reliable elastic manufacturing. At Flexmore, we implement rigorous testing at every stage of production.\n\n## Key Quality Parameters\n\n### Tensile Strength Testing\nEvery batch undergoes tensile strength testing to ensure it meets specified requirements.\n\n### Stretch and Recovery\nWe test elastic recovery to ensure products maintain their shape after repeated stretching.\n\n### Color Fastness\nAll colored elastics are tested for washing and light fastness to prevent color bleeding.`,
    image: "/placeholder.svg", createdAt: "2024-11-28", author: "Flexmore Team",
  },
  {
    id: "3", title: "The Future of Sustainable Textile Manufacturing",
    slug: "future-sustainable-textile-manufacturing",
    excerpt: "Exploring eco-friendly practices and sustainable materials in the textile elastic manufacturing industry.",
    content: `The textile industry is undergoing a significant transformation towards sustainability. As a responsible manufacturer, Flexmore is committed to reducing environmental impact.\n\n## Sustainable Practices\n\n### Recycled Materials\nWe're increasingly incorporating recycled polyester into our products.\n\n### Energy Efficiency\nOur factory uses energy-efficient machinery that reduces power consumption by up to 30%.\n\n### Water Conservation\nAdvanced dyeing techniques minimize water usage and eliminate harmful chemical discharge.`,
    image: "/placeholder.svg", createdAt: "2024-11-10", author: "Flexmore Team",
  },
];
