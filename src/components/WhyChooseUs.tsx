import { Shield, Zap, TrendingDown, Award } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Approval",
    description: "Get your loan approved within 10 minutes with minimal documentation",
  },
  {
    icon: TrendingDown,
    title: "Low Interest Rates",
    description: "Competitive rates starting from 0.5% per month with flexible repayment",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Your gold is stored in bank-grade lockers with complete insurance coverage",
  },
  {
    icon: Award,
    title: "Trusted Evaluation",
    description: "Certified professionals ensure accurate gold valuation using advanced technology",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the best-in-class gold loan services with transparency and trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl p-8 border border-border hover:border-primary/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
