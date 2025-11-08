import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface OTPVerificationProps {
  mobileNumber: string;
  purpose: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification = ({ mobileNumber, purpose, onVerified, onBack }: OTPVerificationProps) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  const sendOTP = async () => {
    setIsSendingOTP(true);
    try {
      // Generate 6-digit OTP
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in database with 10-minute expiry
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);

      const { error } = await supabase.from("otp_verifications").insert({
        mobile_number: mobileNumber,
        otp: generatedOTP,
        expires_at: expiresAt.toISOString(),
        purpose,
        verified: false,
      });

      if (error) throw error;

      // In a real application, you would send the OTP via SMS here
      console.log(`OTP for ${mobileNumber}: ${generatedOTP}`);
      
      toast({
        title: "OTP Sent!",
        description: `A 6-digit OTP has been sent to ${mobileNumber}. (Check console for demo)`,
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Find the OTP record
      const { data, error } = await supabase
        .from("otp_verifications")
        .select("*")
        .eq("mobile_number", mobileNumber)
        .eq("otp", otp)
        .eq("purpose", purpose)
        .eq("verified", false)
        .gte("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error || !data) {
        throw new Error("Invalid or expired OTP");
      }

      // Mark as verified
      await supabase
        .from("otp_verifications")
        .update({ verified: true })
        .eq("id", data.id);

      toast({
        title: "Verified!",
        description: "Mobile number verified successfully",
      });

      onVerified();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Verification Failed",
        description: "Invalid or expired OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Verify Mobile Number</h3>
        <p className="text-muted-foreground">
          Enter the OTP sent to <span className="font-semibold text-foreground">{mobileNumber}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            className="text-center text-2xl tracking-widest font-semibold h-14"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 h-12 rounded-xl border-2 border-border bg-background hover:bg-muted transition-all duration-300 text-foreground font-semibold"
          >
            Back
          </button>
          <button
            onClick={verifyOTP}
            disabled={isVerifying || otp.length !== 6}
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed transition-all duration-300 text-primary-foreground font-semibold shadow-[var(--shadow-gold)]"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

        <button
          onClick={sendOTP}
          disabled={isSendingOTP}
          className="w-full text-sm text-muted-foreground hover:text-primary transition-colors underline"
        >
          {isSendingOTP ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
