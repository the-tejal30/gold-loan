import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import OTPVerification from "./OTPVerification";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send } from "lucide-react";

interface GoldRate {
  rate_22k: number;
  rate_24k: number;
  rate_18k: number;
  silver_rate?: number;
}

const SellGoldForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    weight_grams: "",
    location: "",
  });
  const [consent, setConsent] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [goldRate, setGoldRate] = useState<GoldRate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form data
      const { error: formError } = await supabase
        .from("sell_gold_forms")
        .insert([{
          name: formData.name,
          mobile_number: formData.mobile_number,
          weight_grams: parseFloat(formData.weight_grams),
          location: formData.location,
          consent_given: consent,
        }]);

      if (formError) throw formError;

      // Fetch today's gold rate
      const { data: rateData, error: rateError } = await supabase
        .from("gold_rates")
        .select("*")
        .eq("effective_date", new Date().toISOString().split('T')[0])
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (rateError && rateError.code !== 'PGRST116') {
        console.error("Rate fetch error:", rateError);
      }

      if (rateData) {
        setGoldRate({
          rate_22k: parseFloat(rateData.rate_22k.toString()),
          rate_24k: parseFloat(rateData.rate_24k.toString()),
          rate_18k: parseFloat(rateData.rate_18k.toString()),
          silver_rate: rateData.silver_rate ? parseFloat(rateData.silver_rate.toString()) : undefined,
        });
      }

      setShowRate(true);
      toast({
        title: "Form Submitted Successfully!",
        description: "Our team will contact you shortly.",
      });
      
      setFormData({ name: "", mobile_number: "", weight_grams: "", location: "" });
      setConsent(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (showRate && goldRate) {
    return (
      <section id="sell-gold" className="py-20 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm animate-scale-in text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Today's Gold Rate
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                  <span className="text-lg font-semibold text-foreground">22K Gold (per gram)</span>
                  <span className="text-2xl font-bold text-primary">₹{goldRate.rate_22k}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                  <span className="text-lg font-semibold text-foreground">24K Gold (per gram)</span>
                  <span className="text-2xl font-bold text-primary">₹{goldRate.rate_24k}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                  <span className="text-lg font-semibold text-foreground">18K Gold (per gram)</span>
                  <span className="text-2xl font-bold text-primary">₹{goldRate.rate_18k}</span>
                </div>
                {goldRate.silver_rate && (
                  <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl">
                    <span className="text-lg font-semibold text-foreground">Silver (per gram)</span>
                    <span className="text-2xl font-bold text-primary">₹{goldRate.silver_rate}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowRate(false)}
                className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all"
              >
                Submit Another Form
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sell-gold" className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Sell Your Gold
            </h2>
            <p className="text-lg text-muted-foreground">
              Get instant cash for your gold at the best market rates
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="sell-name" className="block text-foreground font-medium text-sm">
                  Full Name *
                </label>
                <input
                  id="sell-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sell-mobile" className="block text-foreground font-medium text-sm">
                  Mobile Number *
                </label>
                <input
                  id="sell-mobile"
                  name="mobile_number"
                  type="tel"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sell-weight" className="block text-foreground font-medium text-sm">
                  Weight in Grams *
                </label>
                <input
                  id="sell-weight"
                  name="weight_grams"
                  type="number"
                  step="0.01"
                  value={formData.weight_grams}
                  onChange={handleChange}
                  placeholder="Enter weight in grams"
                  required
                  min="0.01"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sell-location" className="block text-foreground font-medium text-sm">
                  Location *
                </label>
                <input
                  id="sell-location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  required
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-muted rounded-xl">
                <input
                  id="sell-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                />
                <label htmlFor="sell-consent" className="text-sm text-foreground leading-relaxed">
                  I authorize SVS Gold and its representatives to contact me via Call, SMS, WhatsApp, Email, RCS regarding their products and offers. This consent overrides any registration made under DND/NDNC.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold text-lg group"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                {!isSubmitting && <Send className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellGoldForm;
