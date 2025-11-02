import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import SellGoldForm from "@/components/SellGoldForm";
import ReleasePledgeForm from "@/components/ReleasePledgeForm";
import FAQ from "@/components/FAQ";
import AdminGoldRate from "@/components/AdminGoldRate";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutUs />
        <Services />
        <SellGoldForm />
        <ReleasePledgeForm />
        <FAQ />
        <AdminGoldRate />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
