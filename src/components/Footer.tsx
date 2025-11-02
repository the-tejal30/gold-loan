import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">SVS GOLD</h3>
            <p className="text-secondary-foreground/80 text-sm">Your trusted partner for instant gold transactions and pledge release services across 100+ branches.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Gold Rate", "Services", "Contact", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  100+ Branches across Karnataka, Andhra Pradesh, Kerala & Telangana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919590704444" className="text-white/80 hover:text-primary transition-colors">
                  +91 95907 04444
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:support@goldmoney.com" className="text-white/80 hover:text-primary transition-colors">
                  support@goldmoney.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label={`Visit our ${social.icon.name}`}
                >
                  <social.icon className="w-5 h-5 text-white/80 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-white/60 text-sm mt-6 leading-relaxed">
              Stay connected for the latest updates on gold rates and special offers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} Gold Money. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Legal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
