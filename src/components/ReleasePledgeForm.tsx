import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { releasePledgeGoldForm } from "@/integrations/api";

const ReleasePledgeForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    gold_weight: "",
    loanAmount: "",
    bankName: "",
    location: "",
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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

    releasePledgeGoldForm(formData)
      .then(() => {
        toast({
          title: "Form Submitted Successfully!",
          description: "Our team will contact you shortly.",
        });

        setFormData({
          name: "",
          mobileNumber: "",
          gold_weight: "",
          loanAmount: "",
          bankName: "",
          location: "",
        });
        setConsent(false);
      })
      .catch((error) => {
        console.error("Submission error:", error);
        toast({
          title: "Submission Failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields = [
    {
      id: "release-name",
      label: "Full Name *",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "release-mobile",
      label: "Mobile Number *",
      name: "mobileNumber",
      type: "tel",
      placeholder: "Enter your mobile number",
      required: true,
      pattern: "[0-9]{10}",
    },
    {
      id: "release-weight",
      label: "Weight in Grams *",
      name: "gold_weight",
      type: "number",
      step: "0.01",
      placeholder: "Enter weight in grams",
      required: true,
      min: "0.01",
    },
    {
      id: "release-amount",
      label: "Loan Amount (₹) *",
      name: "loanAmount",
      type: "number",
      step: "0.01",
      placeholder: "Enter loan amount",
      required: true,
      min: "0.01",
    },
    {
      id: "release-financier",
      label: "Financier Name *",
      name: "bankName",
      type: "text",
      placeholder: "Enter financier name",
      required: true,
    },
    {
      id: "release-location",
      label: "Location *",
      name: "location",
      type: "text",
      placeholder: "Enter your location",
      required: true,
    },
  ];

  return (
    <section id="release-pledge" className="py-20 bg-muted relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Release Pledge Gold
            </h2>
            <p className="text-lg text-muted-foreground">
              Get your pledged gold released instantly with our seamless service
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border backdrop-blur-sm animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div className="space-y-2" key={field.name}>
                  <label htmlFor={field.id} className="block text-foreground font-medium text-sm">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    pattern={field.pattern}
                    step={field.step}
                    min={field.min}
                    className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              ))}

              <div className="flex items-start space-x-3 p-4 bg-muted rounded-xl">
                <input
                  id="release-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                />
                <label htmlFor="release-consent" className="text-sm text-foreground leading-relaxed">
                  I authorize SVS Gold and its representatives to contact me via Call, SMS, WhatsApp, Email, RCS regarding their products and offers. This consent overrides any registration made under DND/NDNC.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold text-lg group"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                {!isSubmitting && (
                  <Send className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleasePledgeForm;
