import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";
import { blogPosts } from "@/data/blog";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Blog() {
  return (
    <PublicLayout>
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Industry Insights</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body">Knowledge and expertise from the world of textile manufacturing.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/blog/${post.slug}`} className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow h-full">
                  <div className="p-6 flex flex-col h-full">
                    <p className="text-xs text-muted-foreground font-body mb-2">{post.createdAt} · {post.author}</p>
                    <h2 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-sm text-muted-foreground font-body flex-1">{post.excerpt}</p>
                    <span className="text-sm font-medium text-primary mt-4 inline-block font-body">Read More →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
