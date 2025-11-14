import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-gold.jpg";
import { SparklesIcon } from "@/icons/SparklesIcon";
import { WaveDivider } from "@/icons/WaveDivider";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import "./HeroSection.css";
import { RedirectIcon } from "@/icons/RedirectIcon";
import { ChevronRightIcon } from "@/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/icons/ChevronLeftIcon";

const HeroSection = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Stats data
  const stats = [
    { label: "Process Time", value: "15 Minutes" },
    { label: "Interest Rate", value: "From 0.5%" },
    { label: "Locations", value: "Pan India" },
  ];

  const scrollToEnquiry = () => {
    const element = document.getElementById("enquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setIsLoading(true);
      // Simulate OTP sending
      setTimeout(() => {
        setShowOtpInput(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        navigate("/gold-rates");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <section className="hero-section py-20 md:px-6">
      {/* Background Image with Overlay */}
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
            <div className="hero-badge">
              <SparklesIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">New & Innovative Gold Loan Service</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line hero-title-transform">Transform Your</span>
              <span className="hero-title-gradient">Gold into Cash</span>
              <span className="hero-title-instant">Instantly</span>
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
                    Check Live Gold Rate Today
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
                        disabled={mobileNumber.length !== 10 || isLoading}
                        className="hero-rate-submit"
                      >
                        {isLoading ? (
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
                          onClick={handleSendOtp}
                          className="hero-resend-link"
                        >
                          Resend OTP
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={otp.length !== 6 || isLoading}
                        className="hero-rate-submit"
                      >
                        {isLoading ? (
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