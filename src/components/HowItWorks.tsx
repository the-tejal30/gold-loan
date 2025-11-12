import { IconBanknote } from "@/icons/IconBankNote";
import { IconIdCard } from "@/icons/IconIdCard";
import { IconMapPin } from "@/icons/IconMapPin";
import { IconScale } from "@/icons/IconScale";

const steps = [
  {
    icon: IconMapPin,
    title: "Visit Branch",
    description:
      "Walk in with your gold and meet our team for a quick evaluation.",
    number: "01",
  },
  {
    icon: IconIdCard,
    title: "Carry ID Proof",
    description:
      "Bring your Aadhaar card. Customer must be at least 21 years old.",
    number: "02",
  },
  {
    icon: IconScale,
    title: "Purity Check",
    description:
      "We check the purity using XRF technology without damaging your gold.",
    number: "03",
  },
  {
    icon: IconBanknote,
    title: "Instant Payment",
    description:
      "Get cash or bank transfer instantly after purity confirmation.",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple process to sell your gold and get instant payment
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/70 backdrop-blur-md border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shadow-sm z-10">
                  {(index + 1).toString().padStart(2)}
                </div>



                <div className="relative bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border hover:border-primary/50 transition-all duration-300 group h-full">
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
