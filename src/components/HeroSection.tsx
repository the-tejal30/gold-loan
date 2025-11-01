import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-gold.jpg";

const HeroSection = () => {
  const scrollToEnquiry = () => {
    const element = document.getElementById("enquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: `linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--navy-light)) 100%)`,
      }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gold Loan"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/90" />
      </div>

      {/* Floating Gold Circles */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-40 left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by 50,000+ Customers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Turn Your Gold into
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              Instant Cash
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Get quick, secure gold loans at competitive interest rates. No hidden charges, instant approval, and hassle-free processing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={scrollToEnquiry}
              className="bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-gold)] transition-all duration-300 text-secondary font-semibold text-lg px-8 py-6 rounded-xl group"
            >
              Get Enquiry
              <Sparkles className="ml-2 w-5 h-5 inline-block group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("gold-rate")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-primary/50 bg-white/10 backdrop-blur-sm text-white hover:bg-primary/20 hover:border-primary text-lg px-8 py-6 rounded-xl transition-all duration-300"
            >
              Check Gold Rate
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            {[
              { label: "Instant Approval", value: "10 Minutes" },
              { label: "Interest Rate", value: "0.5% p.m." },
              { label: "Max Loan Amount", value: "₹50 Lakhs" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
