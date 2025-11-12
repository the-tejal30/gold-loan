import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { MenuIcon } from "@/icons/MenuIcon";
import { XIcon } from "@/icons/XIcon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Sell Gold", href: "#sell-gold" },
    { label: "Release Pledge", href: "#release-pledge" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-secondary/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-primary">SVS GOLD</div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-secondary-foreground hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <XIcon className="w-6 h-6 text-secondary-foreground" /> : <MenuIcon className="w-6 h-6 text-secondary-foreground" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};