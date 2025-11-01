import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GoldRateSection from "@/components/GoldRateSection";
import EnquiryForm from "@/components/EnquiryForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <GoldRateSection />
        <EnquiryForm />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
