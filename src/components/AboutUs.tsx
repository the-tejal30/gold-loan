import { Award, Shield, Users, TrendingUp } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About SVS Gold
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in gold transactions with years of experience and commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground">
                Who We Are
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                SVS Gold is a leading name in the gold buying and pledge release services across India. With a legacy of trust and transparency, we've helped thousands of customers turn their gold assets into instant liquidity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to provide fair, transparent, and instant gold transactions using cutting-edge German technology for accurate purity testing. We believe in empowering our customers with the best market rates and seamless service experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">15+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">50,000+ Happy Customers</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 animate-scale-in">
              <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">100+</h4>
                <p className="text-sm text-muted-foreground">Branches</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">100%</h4>
                <p className="text-sm text-muted-foreground">Secure</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">Best</h4>
                <p className="text-sm text-muted-foreground">Market Rates</p>
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-[var(--shadow-card)] border border-border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">24/7</h4>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Trust & Transparency</h4>
                <p className="text-muted-foreground">
                  We believe in complete transparency in all our transactions, ensuring you get fair value for your gold.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Best Rates</h4>
                <p className="text-muted-foreground">
                  We offer the most competitive rates in the market, guaranteed to give you the best return on your gold.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Customer First</h4>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We strive to provide exceptional service at every touchpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
