import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sellGoldForm, sendOtp, validateOtp } from "@/integrations/api";
import SendButton from "@/icons/Send";

const SellGoldForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    gold_weight: "",
    location: "",
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsSendingOtp(true);

    sendOtp(formData.mobileNumber)
      .then(() => {
        toast({
          title: "OTP Sent",
          description: "Please check your mobile for the OTP",
        });
        setShowOtpInput(true);
        setResendTimer(120);
        setCanResend(false);
      })
      .catch((error) => {
        console.error("OTP sending error:", error);
        toast({
          title: "Failed to Send OTP",
          description: "Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSendingOtp(false);
      });
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingOtp(true);

    validateOtp(formData.mobileNumber, otp)
      .then((response) => {
        if (response === true) {
          toast({
            title: "OTP Verified",
            description: "Your mobile number has been verified successfully",
          });
          setOtpVerified(true);
          setShowOtpInput(false);
        } else {
          toast({
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("OTP validation error:", error);
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsVerifyingOtp(false);
      });
  };

  const handleSubmit = () => {
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (!otpVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your mobile number first",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    sellGoldForm(formData)
      .then(() => {
        toast({
          title: "Form Submitted Successfully!",
          description: "Our team will contact you shortly.",
        });

        setFormData({
          name: "",
          mobileNumber: "",
          gold_weight: "",
          location: "",
        });
        setConsent(false);
        setOtpVerified(false);
        setOtp("");
        setShowOtpInput(false);
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
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: numericValue });

      if (otpVerified) {
        setOtpVerified(false);
        setShowOtpInput(false);
        setOtp("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fields = [
    {
      id: "sell-name",
      label: "Full Name *",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "sell-mobile",
      label: "Mobile Number *",
      name: "mobileNumber",
      type: "tel",
      placeholder: "Enter your mobile number",
      required: true,
      pattern: "[0-9]{10}",
    },
    {
      id: "sell-weight",
      label: "Weight in Grams *",
      name: "gold_weight",
      type: "number",
      step: "0.01",
      placeholder: "Enter weight in grams",
      required: true,
      min: "0.01",
    },
    {
      id: "sell-location",
      label: "Location *",
      name: "location",
      type: "text",
      placeholder: "Enter your location",
      required: true,
    },
  ];

  return (
    <>
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="sell-name-embedded" className="block text-foreground font-medium text-sm">
              Full Name *
            </label>
            <input
              id="sell-name-embedded"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sell-mobile-embedded" className="block text-foreground font-medium text-sm">
              Mobile Number *
            </label>
            <div className="relative">
              <input
                id="sell-mobile-embedded"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
                pattern="[0-9]{10}"
                disabled={otpVerified}
                className="w-full h-12 px-4 pr-24 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {!otpVerified && formData.mobileNumber.length === 10 && !showOtpInput && (
                <button
                  onClick={handleSendOtp}
                  disabled={isSendingOtp}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 h-8 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground text-xs font-semibold transition-all"
                >
                  {isSendingOtp ? "Sending..." : "Send OTP"}
                </button>
              )}
              {otpVerified && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm font-medium">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* OTP Verification Section */}
        {showOtpInput && !otpVerified && (
          <div className="flex gap-5 w-full justify-between items-center">
            <div className="space-y-2 w-3/4">
              <label htmlFor="otp-input" className="block text-foreground font-medium text-sm">
                Enter OTP *
              </label>
              <input
                id="otp-input"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <div className="w-full flex items-center justify-end">
                <button
                  onClick={() => {
                    if (canResend) {
                      handleSendOtp();
                    }
                  }}
                  disabled={isSendingOtp}
                  className={`text-xs underline text-primary ${!canResend ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
                </button>
              </div>
            </div>
            <div className="flex gap-3 w-1/4">
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-primary-foreground font-semibold transition-all shadow-[var(--shadow-gold)]"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {fields.slice(2).map((field) => (
            <div className="space-y-2" key={field.name}>
              <label htmlFor={field.id} className="block text-foreground font-medium text-sm">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                step={field.step}
                min={field.min}
                className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex items-start space-x-3 p-4 bg-muted rounded-xl">
          <input
            id="sell-consent-embedded"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
          />
          <label htmlFor="sell-consent-embedded" className="text-sm text-foreground leading-relaxed">
            I authorize SVS Gold and its representatives to contact me via Call, SMS, WhatsApp, Email, RCS regarding their products and offers. This consent overrides any registration made under DND/NDNC.
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !otpVerified}
          className="w-full flex gap-1 items-center justify-center h-14 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold text-lg group"
        >
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          {!isSubmitting && (
            <SendButton className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </>
  );
};

export default SellGoldForm;