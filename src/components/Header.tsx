import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-secondary/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-primary">SVS GOLD</div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-secondary-foreground hover:text-accent transition-colors font-medium">About</a>
            <a href="#services" className="text-secondary-foreground hover:text-accent transition-colors font-medium">Services</a>
            <a href="#sell-gold" className="text-secondary-foreground hover:text-accent transition-colors font-medium">Sell Gold</a>
            <a href="#release-pledge" className="text-secondary-foreground hover:text-accent transition-colors font-medium">Release Pledge</a>
            <a href="#faq" className="text-secondary-foreground hover:text-accent transition-colors font-medium">FAQ</a>
            <a href="#sell-gold" className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 text-primary-foreground font-semibold shadow-[var(--shadow-gold)]">Get Started</a>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6 text-secondary-foreground" /> : <Menu className="w-6 h-6 text-secondary-foreground" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4">
            <a href="#about" className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#services" className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#sell-gold" className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Sell Gold</a>
            <a href="#release-pledge" className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>Release Pledge</a>
            <a href="#faq" className="block py-2 text-secondary-foreground hover:text-accent transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#sell-gold" className="block w-full text-center px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 text-primary-foreground font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
          </nav>
        )}
      </div>
    </header>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("gold-rate")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Gold Rate
            </button>
            <button
              onClick={() => scrollToSection("why-us")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("enquiry")}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-secondary font-semibold transition-all duration-300 hover:shadow-[var(--shadow-gold)]"
            >
              Apply Now
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
