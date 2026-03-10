import { motion } from "framer-motion";
import { Factory, Cog, ShieldCheck, Package, FlaskConical, Truck } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import heroImg from "@/assets/hero-manufacturing.jpg";
import qualityImg from "@/assets/quality-control.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const capabilities = [
  { icon: Factory, title: "Factory Overview", desc: "25,000+ sq ft production facility equipped with modern machinery and climate-controlled environments for consistent product quality." },
  { icon: Cog, title: "Machines & Equipment", desc: "High-speed braiding, weaving, and knitting machines imported from Europe and Japan. Capable of producing elastic from 1mm to 150mm width." },
  { icon: ShieldCheck, title: "Quality Control", desc: "In-house testing laboratory with tensile testing machines, elongation testers, and color fastness equipment. Every batch is tested." },
  { icon: FlaskConical, title: "Testing Process", desc: "Multi-stage testing: raw material inspection, in-process quality checks, final product testing, and packaging verification." },
  { icon: Package, title: "Production Capacity", desc: "Monthly production capacity of 100+ tonnes across all product categories. Scalable production lines for urgent bulk orders." },
  { icon: Truck, title: "Packaging & Logistics", desc: "Custom packaging solutions for domestic and international shipping. Partnered with leading logistics providers for timely delivery." },
];

export default function Manufacturing() {
  return (
    <PublicLayout>
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Manufacturing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative container-wide px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Manufacturing Excellence</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto font-body">State-of-the-art production capabilities delivering consistent quality at scale.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <motion.div key={cap.title} variants={fadeUp} className="bg-card p-8 rounded-lg border border-border">
                <cap.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">{cap.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process image */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <img src={qualityImg} alt="Quality control lab" className="rounded-lg shadow-lg" loading="lazy" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Commitment to Quality</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                Our ISO 9001:2015 certified facility maintains the highest standards of quality control. From raw material sourcing to final packaging, every step is monitored and documented.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                We invest continuously in upgrading our testing equipment and training our quality team to ensure every product that leaves our facility meets or exceeds client specifications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
