import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import SellGoldForm from "@/components/SellGoldForm";
import ReleasePledgeForm from "@/components/ReleasePledgeForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutUs />
        <Services />
        <HowItWorks />
        <SellGoldForm />
        <ReleasePledgeForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
