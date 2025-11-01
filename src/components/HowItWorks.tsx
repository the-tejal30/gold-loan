import { MapPin, BadgeCheck, Scale, Banknote } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Visit Branch & Carry ID",
    description: "Find your nearest branch and bring Aadhaar card for KYC verification. We have 100+ branches across India",
    number: "01",
  },
  {
    icon: Scale,
    title: "Gold Purity Check",
    description: "We test your gold using German spectrometers for accurate valuation. The process takes just 15 minutes",
    number: "02",
  },
  {
    icon: BadgeCheck,
    title: "KYC & Payment",
    description: "Complete quick KYC verification and get instant payment transferred to your bank account",
    number: "03",
  },
  {
    icon: Banknote,
    title: "Get Cash Instantly",
    description: "Receive money directly in your bank account. You can verify the transfer before leaving our branch",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get cash for your gold in four easy steps
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-bold text-primary/10">
                  {step.number}
                </div>

                {/* Card */}
                <div className="relative bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  {/* Icon */}
                  <div className="relative mb-6 mx-auto w-20 h-20">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-10 h-10 text-secondary" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent opacity-30" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
