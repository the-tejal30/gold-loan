import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import OTPVerification from "./OTPVerification";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LiveGoldRate = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"mobile" | "otp" | "rate">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentRate, setCurrentRate] = useState<any>(null);
  const [hourlyRates, setHourlyRates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentRate = async () => {
    const { data, error } = await supabase
      .from("gold_rates")
      .select("*")
      .order("effective_date", { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      setCurrentRate(data);
    }
  };

  const fetchHourlyRates = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("hourly_gold_rates")
      .select("*")
      .eq("rate_date", today)
      .order("hour", { ascending: true });

    if (!error && data) {
      const formattedData = data.map((rate) => ({
        hour: `${rate.hour}:00`,
        "22K": Number(rate.rate_22k),
        "24K": Number(rate.rate_24k),
        "18K": Number(rate.rate_18k),
      }));
      setHourlyRates(formattedData);
    }
  };

  const handleSendOTP = async () => {
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setStep("otp");
  };

  const handleVerified = async () => {
    setIsLoading(true);
    try {
      await fetchCurrentRate();
      await fetchHourlyRates();

      // Track the view
      if (currentRate) {
        await supabase.from("live_rate_views").insert({
          mobile_number: mobileNumber,
          rate_22k: Number(currentRate.rate_22k),
          rate_24k: Number(currentRate.rate_24k),
          rate_18k: Number(currentRate.rate_18k),
        });
      }

      setStep("rate");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch gold rates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep("mobile");
    setMobileNumber("");
    setCurrentRate(null);
    setHourlyRates([]);
  };

  if (step === "mobile") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">View Live Gold Rate</h3>
          <p className="text-muted-foreground">
            Enter your mobile number to view today's gold rates
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
            maxLength={10}
            className="h-12 text-lg"
          />

          <button
            onClick={handleSendOTP}
            disabled={mobileNumber.length !== 10}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed transition-all duration-300 text-primary-foreground font-semibold text-lg shadow-[var(--shadow-gold)]"
          >
            Get OTP
          </button>
        </div>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <OTPVerification
        mobileNumber={mobileNumber}
        purpose="view_live_rate"
        onVerified={handleVerified}
        onBack={() => setStep("mobile")}
      />
    );
  }

  if (step === "rate" && currentRate) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Today's Gold Rates</h3>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Last updated: {new Date(currentRate.updated_at).toLocaleString()}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border-2 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">22K Gold</div>
            <div className="text-3xl font-bold text-foreground">
              ₹{parseFloat(currentRate.rate_22k).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">per gram</div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border-2 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">24K Gold</div>
            <div className="text-3xl font-bold text-foreground">
              ₹{parseFloat(currentRate.rate_24k).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">per gram</div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border-2 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">18K Gold</div>
            <div className="text-3xl font-bold text-foreground">
              ₹{parseFloat(currentRate.rate_18k).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">per gram</div>
          </div>
        </div>

        {hourlyRates.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-4">Today's Rate Trend (9 AM - 8 PM)</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="22K"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="24K"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="18K"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <button
          onClick={handleClose}
          className="w-full h-12 rounded-xl border-2 border-border bg-background hover:bg-muted transition-all duration-300 text-foreground font-semibold"
        >
          Close
        </button>
      </div>
    );
  }

  return null;
};

export default LiveGoldRate;
