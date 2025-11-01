import { TrendingUp, Calendar } from "lucide-react";

const GoldRateSection = () => {
  // Mock data - can be replaced with real API integration
  const goldRate = "6,450";
  const change = "+₹50";
  const changePercent = "+0.78%";

  return (
    <section id="gold-rate" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Live Gold Rate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with real-time gold prices in your area
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/20 shadow-[var(--shadow-card)] animate-scale-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Updated Today
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  22K Gold (10g)
                </h3>
                <p className="text-muted-foreground">Current market rate</p>
              </div>

              <div className="flex-1 text-center">
                <div className="space-y-2">
                  <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ₹{goldRate}
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xl font-semibold">
                      {change} ({changePercent})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">₹6,400</div>
                  <div className="text-sm text-muted-foreground mt-1">24K Gold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">₹5,800</div>
                  <div className="text-sm text-muted-foreground mt-1">18K Gold</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">₹850</div>
                  <div className="text-sm text-muted-foreground mt-1">Silver (10g)</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            *Rates may vary based on location and purity. Contact us for accurate valuation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoldRateSection;
