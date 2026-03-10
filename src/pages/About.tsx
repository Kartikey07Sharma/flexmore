import { motion } from "framer-motion";
import { Target, Eye, Shield, Award } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import heroImg from "@/assets/hero-manufacturing.jpg";
import qualityImg from "@/assets/quality-control.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Flexmore factory" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative container-wide px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About Flexmore</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body">A decade of excellence in textile elastic manufacturing</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                Founded in 2014, Flexmore has grown from a small elastic cord manufacturer into one of the most trusted names in the textile elastic industry. Located in the Selaqui Industrial Area of Dehradun, Uttarakhand, our state-of-the-art facility spans over 25,000 sq ft of production space.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                We specialize in manufacturing elastic cords, mask dori, textile threads, elastic bands, and industrial elastic materials. Our products serve garment manufacturers, medical supply companies, and industrial clients across India and internationally.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <img src={qualityImg} alt="Flexmore quality control" className="rounded-lg shadow-lg" loading="lazy" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-card p-8 rounded-lg border border-border">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                To provide the highest quality elastic and textile products to manufacturers worldwide, enabling them to create superior finished goods while maintaining competitive pricing and reliable delivery.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-card p-8 rounded-lg border border-border">
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                To become the most trusted global supplier of elastic and textile materials, setting industry benchmarks for quality, innovation, and sustainable manufacturing practices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quality & Expertise */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-background p-8 rounded-lg border border-border">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Every product undergoes rigorous quality testing including tensile strength, stretch recovery, color fastness, and durability tests. Our ISO-certified processes ensure consistency across every batch.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li>• ISO 9001:2015 certified</li>
                <li>• In-house testing laboratory</li>
                <li>• Batch-level traceability</li>
                <li>• Third-party audit compliance</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-background p-8 rounded-lg border border-border">
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Manufacturing Expertise</h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Our team of experienced engineers and textile specialists brings decades of combined expertise. We invest continuously in advanced machinery and training to stay at the forefront of elastic manufacturing technology.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li>• 50+ skilled professionals</li>
                <li>• Advanced European machinery</li>
                <li>• Continuous R&D investment</li>
                <li>• Custom product development</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body mb-8">
              Led by a team of industry veterans with deep expertise in textile manufacturing and global supply chain management.
            </p>
            <div className="bg-card p-8 rounded-lg border border-border max-w-lg mx-auto">
              <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-2xl">FM</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Flexmore Management</h3>
              <p className="text-muted-foreground text-sm font-body mt-2">
                Our leadership team brings over 30 years of combined experience in textile manufacturing, ensuring operational excellence and customer satisfaction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
