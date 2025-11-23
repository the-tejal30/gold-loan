import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-gold.jpg";
import { SparklesIcon } from "@/icons/SparklesIcon";
import { WaveDivider } from "@/icons/WaveDivider";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import "./HeroSection.css";
import { RedirectIcon } from "@/icons/RedirectIcon";
import { ChevronRightIcon } from "@/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/icons/ChevronLeftIcon";
import { sendOtp, validateOtp } from "@/integrations/api";
import { useToast } from "@/hooks/use-toast";


const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const stats = [
    { label: "Process Time", value: "<30 Minutes" },
    { label: "Purity Test", value: "XRF Technology" },
    { label: "Locations", value: "Pan India" },
  ];

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

  const scrollToEnquiry = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsSendingOtp(true);

    sendOtp(mobileNumber)
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

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingOtp(true);

    validateOtp(mobileNumber, otp)
      .then((response) => {
        if (response === true) {
          toast({
            title: "OTP Verified",
            description: "Your mobile number has been verified successfully",
          });
          sessionStorage.setItem('otpVerified', 'true');
          sessionStorage.setItem('verifiedMobile', mobileNumber);
          navigate("/live-gold-rate");
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


  return (
    <section id="home" className="hero-section py-[108px] md:px-6">
      <div className="hero-background">
        <img
          src={heroImage}
          alt="Gold Loan"
          className="hero-background-image"
        />
        <div className="hero-background-overlay" />
      </div>

      {/* Floating Gold Circles */}
      <div className="floating-circle floating-circle-1" />
      <div className="floating-circle floating-circle-2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-grid">

          {/* Left Section - Main Content */}
          <div className="hero-content">

            <h1 className="hero-title">
              <span className="hero-title-line hero-title-transform">More Than Gold Buyers</span>
              <span className="hero-title-gradient">We're the People</span>
              <span className="hero-title-instant">Who Stand With You.</span>
            </h1>

            <p className="hero-description">
              Get instant cash against your gold with transparent pricing.
              Fast approval and secure process.
            </p>

            <div className="hero-cta">
              <button
                onClick={scrollToEnquiry}
                className="hero-button-primary"
              >
                Get Enquiry
                <SparklesIcon className="hero-button-icon" />
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="hero-stat-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Gold Rate Card */}
          <div className="hero-rate-section">
            <div className="hero-rate-container">
              <div className="decorative-coin decorative-coin-1">
                <SparklesIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="decorative-coin decorative-coin-2">
                <SparklesIcon className="w-5 h-5 text-accent" />
              </div>
              <div className="decorative-coin decorative-coin-3">
                <SparklesIcon className="w-4 h-4 text-primary" />
              </div>

              {/* Glow Effect */}
              <div className="glow-effect"></div>

              {/* Main Card */}
              <div className="hero-rate-card">
                <div className="hero-rate-content">
                  {/* Animated Gold Icon */}
                  <div className="hero-rate-icon">
                    <div className="gold-shimmer"></div>
                    <SparklesIcon className="w-10 h-10 text-white relative z-10" />
                  </div>

                  <h3 className="hero-rate-title">
                    Check Live Gold Rate
                  </h3>

                  <p className="hero-rate-subtitle">
                    {!showOtpInput
                      ? "Enter your mobile number to get started"
                      : "Enter the OTP sent to your mobile"}
                  </p>

                  {!showOtpInput ? (
                    <form onSubmit={handleSendOtp} className="hero-rate-form">
                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="hero-rate-input"
                        maxLength={10}
                        required
                      />
                      <button
                        type="submit"
                        disabled={mobileNumber.length !== 10 || isSendingOtp}
                        className="hero-rate-submit"
                      >
                        {isSendingOtp ? (
                          <span className="flex items-center justify-center">
                            <LoadingSpinner className="h-5 w-5 mr-2" />
                            Sending OTP...
                          </span>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center">
                            Continue
                            <ChevronRightIcon className="ml-2 w-5 aspect-square" />
                          </span>
                        )}
                        <div className="hero-button-overlay" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="hero-rate-form">
                      <input
                        type="tel"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="hero-rate-input"
                        maxLength={6}
                        required
                        autoFocus
                      />
                      <div className="flex items-center justify-between text-sm mb-2">
                        <p
                          onClick={() => {
                            setShowOtpInput(false);
                            setOtp("");
                            setMobileNumber("");
                          }}
                          className="hero-change-number flex items-center justify-center"
                        >
                          <ChevronLeftIcon className="inline-block w-5 aspect-square mr-1" />
                          Change number
                        </p>
                        <p
                          onClick={() => {
                            if (canResend) {
                              handleSendOtp();
                            }
                          }}
                          className={`hero-resend-link ${!canResend ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={otp.length !== 6 || isVerifyingOtp}
                        className="hero-rate-submit"
                      >
                        {isVerifyingOtp ? (
                          <span className="flex items-center justify-center">
                            <LoadingSpinner className="h-5 w-5 mr-2" />
                            Verifying...
                          </span>
                        ) : (
                          <span className="relative z-10 flex items-center justify-center">
                            View Gold Rates
                            <RedirectIcon className="ml-2 w-5 h-5 hero-arrow-icon" />
                          </span>
                        )}
                        <div className="hero-button-overlay" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave Divider */}
      <div className="hero-wave">
        <WaveDivider />
      </div>
    </section>
  );
};

export default HeroSection;