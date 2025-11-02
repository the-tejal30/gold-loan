import { Coins, Lock, Zap, Shield, TrendingUp, Clock } from "lucide-react";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive gold solutions tailored to meet your financial needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Sell Gold Service */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm animate-scale-in group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Coins className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Sell Your Gold
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get instant cash for your gold jewelry, coins, or bars. We offer the best market rates with transparent evaluation using German technology for accurate purity testing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">No waiting period - instant payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Best market rates guaranteed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">German technology for purity check</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Safe and secure process</span>
                </div>
              </div>
              <a 
                href="#sell-gold"
                className="mt-6 inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
              >
                Sell Gold Now
              </a>
            </div>

            {/* Release Pledge Service */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm animate-scale-in group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Release Pledge Gold
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Release your pledged gold from any financier instantly. We handle all the paperwork and process, ensuring a hassle-free experience with immediate gold release.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Works with any financier</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Quick loan clearance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Minimal documentation required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">Same-day gold release</span>
                </div>
              </div>
              <a 
                href="#release-pledge"
                className="mt-6 inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
              >
                Release Gold Now
              </a>
            </div>
          </div>

          {/* Why Choose Our Services */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Why Choose SVS Gold Services
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Instant Process</h4>
                <p className="text-sm text-muted-foreground">
                  Complete your transaction within minutes with our streamlined process.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Secure & Safe</h4>
                <p className="text-sm text-muted-foreground">
                  Bank-grade security measures to protect your valuable assets.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Best Rates</h4>
                <p className="text-sm text-muted-foreground">
                  Competitive market rates updated daily to ensure maximum value.
                </p>
              </div>
              <div className="flex flex-col items-center text-center md:col-span-3">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h4>
                <p className="text-sm text-muted-foreground max-w-md">
                  Our dedicated support team is always available to assist you with any queries or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
