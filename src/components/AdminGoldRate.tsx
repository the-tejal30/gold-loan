import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminGoldRate = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    rate_22k: "",
    rate_24k: "",
    rate_18k: "",
    silver_rate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const today = new Date().toISOString().split('T')[0];

      // Check if a rate already exists for today
      const { data: existingRate } = await supabase
        .from("gold_rates")
        .select("*")
        .eq("effective_date", today)
        .single();

      if (existingRate) {
        // Update existing rate
        const { error } = await supabase
          .from("gold_rates")
          .update({
            rate_22k: parseFloat(formData.rate_22k),
            rate_24k: parseFloat(formData.rate_24k),
            rate_18k: parseFloat(formData.rate_18k),
            silver_rate: formData.silver_rate ? parseFloat(formData.silver_rate) : null,
          })
          .eq("effective_date", today);

        if (error) throw error;
      } else {
        // Insert new rate
        const { error } = await supabase
          .from("gold_rates")
          .insert([{
            rate_22k: parseFloat(formData.rate_22k),
            rate_24k: parseFloat(formData.rate_24k),
            rate_18k: parseFloat(formData.rate_18k),
            silver_rate: formData.silver_rate ? parseFloat(formData.silver_rate) : null,
            effective_date: today,
          }]);

        if (error) throw error;
      }

      toast({
        title: "Gold Rate Updated!",
        description: "The current gold rate has been successfully updated.",
      });
      
      setFormData({ rate_22k: "", rate_24k: "", rate_18k: "", silver_rate: "" });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update gold rate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="admin" className="py-20 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground">
              Admin: Update Gold Rate
            </h2>
            <p className="text-lg text-secondary-foreground/80">
              Set today's gold and silver rates (per gram)
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-primary/20 backdrop-blur-sm animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="rate_22k" className="block text-foreground font-medium text-sm">
                  22K Gold Rate (₹ per gram) *
                </label>
                <input
                  id="rate_22k"
                  name="rate_22k"
                  type="number"
                  step="0.01"
                  value={formData.rate_22k}
                  onChange={handleChange}
                  placeholder="e.g., 6450.00"
                  required
                  min="0.01"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rate_24k" className="block text-foreground font-medium text-sm">
                  24K Gold Rate (₹ per gram) *
                </label>
                <input
                  id="rate_24k"
                  name="rate_24k"
                  type="number"
                  step="0.01"
                  value={formData.rate_24k}
                  onChange={handleChange}
                  placeholder="e.g., 6800.00"
                  required
                  min="0.01"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rate_18k" className="block text-foreground font-medium text-sm">
                  18K Gold Rate (₹ per gram) *
                </label>
                <input
                  id="rate_18k"
                  name="rate_18k"
                  type="number"
                  step="0.01"
                  value={formData.rate_18k}
                  onChange={handleChange}
                  placeholder="e.g., 5100.00"
                  required
                  min="0.01"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="silver_rate" className="block text-foreground font-medium text-sm">
                  Silver Rate (₹ per gram)
                </label>
                <input
                  id="silver_rate"
                  name="silver_rate"
                  type="number"
                  step="0.01"
                  value={formData.silver_rate}
                  onChange={handleChange}
                  placeholder="e.g., 85.00 (Optional)"
                  min="0.01"
                  className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold text-lg"
              >
                {isSubmitting ? "Updating..." : "Update Gold Rate"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminGoldRate;
