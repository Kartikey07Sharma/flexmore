import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Factory, Users, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";
import { Seo } from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { useFeaturedProducts, useCategories } from "@/hooks/use-products";
import { useBlogPosts } from "@/hooks/use-blog";
import heroImg from "@/assets/hero-manufacturing.jpg";
import qualityImg from "@/assets/quality-control.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const stats = [
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Clients Served", value: "500+", icon: Users },
  { label: "Product Types", value: "50+", icon: Package },
  { label: "Production Capacity", value: "100T/mo", icon: Factory },
];

const whyChoose = [
  "ISO-certified manufacturing processes",
  "State-of-the-art machinery",
  "Customizable products for any industry",
  "Competitive bulk pricing",
  "On-time delivery guarantee",
  "Dedicated quality control team",
];

export default function Index() {
  const { data: featuredProducts = [] } = useFeaturedProducts();
  const { data: categories = [] } = useCategories();
  const { data: blogPosts = [] } = useBlogPosts();

  return (
    <PublicLayout>
      <Seo
        title="Flexmore — B2B Elastic Cords, Mask Dori & Threads | Dehradun"
        description="Flexmore manufactures premium elastic cords, mask dori and industrial threads in Dehradun, India. Request a quote for bulk orders."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Flexmore",
          url: typeof window !== "undefined" ? window.location.origin : "",
          address: { "@type": "PostalAddress", addressLocality: "Dehradun", addressCountry: "IN" },
        }}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Flexmore manufacturing facility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container-wide px-4 md:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Premium Elastic & Thread Manufacturer
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-primary-foreground/85 mb-8 font-body leading-relaxed">
              Flexmore manufactures high-quality elastic cords, mask dori, and textile threads for garment and industrial manufacturing.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary" className="font-body font-semibold">
                <Link to="/products">View Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body">
                <Link to="/quote">Request Quote</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <p className="text-sm font-semibold text-secondary-foreground/60 uppercase tracking-wider mb-2 font-body">About Flexmore</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Trusted B2B Manufacturer Since 2014</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 font-body">
                Based in Selaqui Industrial Area, Dehradun, Flexmore is a leading manufacturer of elastic cords, mask dori, textile threads, and industrial elastic materials. We serve garment manufacturers, medical supply companies, and industrial clients across India and globally.
              </p>
              <Button asChild variant="outline"><Link to="/about">Learn More About Us</Link></Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img src={qualityImg} alt="Quality control at Flexmore" className="rounded-lg shadow-lg w-full" loading="lazy" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">Comprehensive range of elastic and textile products for every manufacturing need.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link to={`/products?category=${cat.slug}`} className="block bg-card p-6 rounded-lg border border-border text-center hover:shadow-md hover:border-secondary transition-all">
                  <Package className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-heading font-semibold text-sm text-foreground">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">Our most popular products trusted by manufacturers worldwide.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg"><Link to="/products">View All Products</Link></Button>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Why Choose Flexmore?</h2>
              <ul className="space-y-4">
                {whyChoose.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-body text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
                  <s.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl font-heading font-bold mb-1">{s.value}</div>
                  <div className="text-sm opacity-75 font-body">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-wide text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Partner with Flexmore?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto font-body">Get customized pricing for your bulk manufacturing needs. Our team is ready to assist you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary"><Link to="/quote">Request Quote</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Industry Insights</h2>
            <p className="text-muted-foreground font-body">Latest articles on textile manufacturing and elastic production.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <p className="text-xs text-muted-foreground font-body mb-2">{new Date(post.created_at).toLocaleDateString()}</p>
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground font-body line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
