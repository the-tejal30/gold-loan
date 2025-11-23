import { IconMapPin } from "@/icons/IconMapPin";
import { SocialIcons } from "./SocialIcons";
import SVSLogo from "@/assets/svslogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Sell Gold", href: "#sell-gold" },
    { label: "Release Pledge", href: "#release-pledge" },
    { label: "FAQ", href: "#faq" }
  ];

  const contactInfo = [
    {
      icon: IconMapPin,
      content: "D. No : 3-4-659/3, YMCA, STN, Narayanguda, Himayathnagar, Hyderabad - 500029, Telangana",
      type: "text"
    },
    {
      icon: SocialIcons.Phone,
      content: "+91 9885588220",
      href: "tel:+919885588220",
      type: "link"
    },
    {
      icon: SocialIcons.Mail,
      content: "info@svsgold.com",
      href: "mailto:info@svsgold.com",
      type: "link"
    }
  ];

  const socialLinks = [
    { icon: SocialIcons.Facebook, href: "https://www.facebook.com/share/1ACgUok982/", label: "Facebook" },
    { icon: SocialIcons.Instagram, href: "https://www.instagram.com/svs_gold_", label: "Instagram" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 pb-8">
          <div>
            <img
              src={SVSLogo}
              alt="SVS Gold Logo"
              className="w-[130px] h-[60px]"
            />
            <p className="text-secondary-foreground/80 text-sm mt-4">SVS Gold is a trusted gold and silver buying company. We offer instant payment, transparent valuation, and a simple process for both direct gold selling and pledged gold release.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-primary transition-colors inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
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
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {item.type === "link" ? (
                    <a href={item.href} className="text-white/80 hover:text-primary transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-white/80">{item.content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 border border-white/20 hover:border-primary flex items-center justify-center transition-all duration-300 group"
                  aria-label={`Visit our ${social.label}`}
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
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} SVS Gold. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;