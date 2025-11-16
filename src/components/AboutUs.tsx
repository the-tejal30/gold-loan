import { InstantPaymentIcon } from "@/icons/InstantPaymentIcon";
import { LoanClearanceIcon } from "@/icons/LoanClearanceIcon";
import { ShieldIcon } from "@/icons/SheildIcon";
import { TransparentProcessIcon } from "@/icons/TransparentProcessIcon";
import { TrendingUpIcon } from "@/icons/TrendingUpIcon";
import { TrustedServiceIcon } from "@/icons/TrustedServiceIcon";
import { UsersIcon } from "@/icons/UsersIcon";

const AboutUs = () => {

  const features = [
    {
      Icon: InstantPaymentIcon,
      title: 'Instant',
      subtitle: 'Payment'
    },
    {
      Icon: LoanClearanceIcon,
      title: 'Loan',
      subtitle: 'Clearance'
    },
    {
      Icon: TransparentProcessIcon,
      title: 'Transparent',
      subtitle: 'Process'
    },
    {
      Icon: TrustedServiceIcon,
      title: 'Trusted',
      subtitle: 'Service'
    }
  ];

  const values = [
    {
      Icon: ShieldIcon,
      title: 'Trust & Transparency',
      description: 'Every transaction at SVS Gold is handled with honesty and clarity. We ensure a fair process so that customers always receive the right value for their gold and silver.'
    },
    {
      Icon: TrendingUpIcon,
      title: 'Fair Value',
      description: 'We provide accurate purity testing and genuine rates based on the current market value, ensuring customers get what their gold truly deserves.'
    },
    {
      Icon: UsersIcon,
      title: 'Customer First',
      description: 'Customer satisfaction is at the heart of everything we do. From quick evaluation to instant payment, we make every step easy, secure, and worry free.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary"></div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                <span className="text-foreground">ABOUT </span>
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}>
                  SVS GOLD
                </span>
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in gold transactions, dedicated to providing genuine value and reliable service with a strong focus on customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground">
                Who We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                SVS Gold is a trusted Gold and Silver buying company that offers the best value for your precious metals. Customers can visit with their gold or silver and receive instant payment after evaluation. The process is simple, transparent, and handled with complete professionalism.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For customers who are unable to repay their existing gold loans, SVS Gold helps by paying the loan amount along with the interest directly to the bank, NBFC, or pawnbroker. Once the pledged gold is released, the remaining balance is paid to the customer, ensuring a smooth and worry free experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-scale-in">
              {features.map((feature, index) => (
                <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border text-center" key={index}>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
