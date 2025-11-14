import { IconCoins } from "@/icons/IconCoins";
import { IconLock } from "@/icons/IconLock";

const Services = () => {

  const sellGoldFeatures = [
    "Instant cash on the spot",
    "Transparent and safe process",
    "Best market value",
    "No hidden charges",
  ];

  const releasePledgedFeatures = [
    "Support for any financier",
    "Quick loan clearance",
    "Simple and clear process",
    "Immediate balance payout",
  ];

  return (
    <section id="services" className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              SVS Gold buys Gold and Silver from customers at the best market
              value. We also help release pledged gold by paying the loan amount
              and interest to the respective bank, NBFC, or pawnbroker, and
              return the remaining balance to the customer.
            </p>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Sell Gold */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconCoins className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Sell Your Gold
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Walk in with your gold and get instant cash. We offer fair and
                transparent rates based on real time market value with accurate
                purity testing.
              </p>
              <div className="space-y-3">
                {sellGoldFeatures.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-sm text-foreground"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <a
                href="#sell-gold"
                className="mt-6 inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
              >
                Sell Gold Now
              </a>
            </div>

            {/* Release Pledged Gold */}
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm group hover:shadow-[var(--shadow-gold)] transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconLock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Release Pledged Gold
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If your gold is pledged, we help by paying the loan and interest
                directly to the bank, NBFC, or pawnbroker. Once released, the
                remaining amount is paid to you.
              </p>
              <div className="space-y-3">
                {releasePledgedFeatures.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-sm text-foreground"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <a
                href="#release-pledge"
                className="mt-6 inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
              >
                Release Gold Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
