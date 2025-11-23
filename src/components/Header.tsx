import { useState } from "react";
import { MenuIcon } from "@/icons/MenuIcon";
import { XIcon } from "@/icons/XIcon";
import SVSLogo from "@/assets/svslogo.png";
import { SparklesIcon } from "@/icons/SparklesIcon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-secondary/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 md:px-11 md:py-3">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-primary cursor-pointer">
            <img
              src={SVSLogo}
              alt="SVS Gold Logo"
              className="w-[130px] h-[60px]"
              onClick={() => window.location.href = "/"}
            />
          </div>

          <div className="flex space-x-8">
            <div className="hidden md:flex hero-badge">
              <span className="text-sm font-medium text-primary">+919885588220</span>
            </div>

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
          </div>


          <div className="flex md:hidden items-center gap-3">
            <div className="hero-badge">
              <span className="text-sm font-medium text-primary">+919885588220</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <XIcon className="w-6 h-6 text-secondary-foreground" /> : <MenuIcon className="w-6 h-6 text-secondary-foreground" />}
            </button>
          </div>
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

export default Header;