const Footer = () => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Sell Gold", href: "#sell-gold" },
    { label: "Release Pledge", href: "#release-pledge" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h3 className="text-2xl font-bold text-foreground">SVS Gold</h3>

        <p className="text-muted-foreground max-w-xl mx-auto">
          SVS Gold is a trusted gold and silver buying company. We offer instant payment, transparent valuation, and a simple process for both direct gold selling and pledged gold release.
        </p>

        <nav className="flex justify-center flex-wrap gap-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-secondary-foreground hover:text-accent transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="space-y-2">
          <p className="text-muted-foreground">
            Call us:{" "}
            <a
              href="tel:+919885588220"
              className="text-accent font-medium hover:underline"
            >
              +91 98855 88220
            </a>
          </p>
          <p className="text-muted-foreground">
            Email:{" "}
            <a
              href="mailto:info@svsgold.com"
              className="text-accent font-medium hover:underline"
            >
              info@svsgold.com
            </a>
          </p>
        </div>

        <p className="text-sm text-muted-foreground pt-4 border-t border-border">
          © {new Date().getFullYear()} SVS Gold. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
