import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Flexmore</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Premium manufacturer of elastic cords, mask dori, textile threads, and industrial elastic materials. Serving B2B clients worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Manufacturing", path: "/manufacturing" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:opacity-100 transition-opacity">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Elastic Cords</li>
              <li>Mask Dori</li>
              <li>Textile Threads</li>
              <li>Elastic Bands</li>
              <li>Industrial Elastic</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Selaqui Industrial Area, Dehradun, Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@flexmore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Flexmore. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/quote" className="hover:opacity-100">Request Quote</Link>
            <Link to="/contact" className="hover:opacity-100">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
