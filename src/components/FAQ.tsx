import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is the purity of my gold determined?",
      answer: "We use advanced German technology for accurate gold purity testing. Our state-of-the-art equipment provides precise readings of your gold's karat value, ensuring you get the correct valuation for your gold assets."
    },
    {
      question: "What documents do I need to bring?",
      answer: "You need to bring a valid government-issued ID proof (Aadhaar, PAN Card, Passport, or Driving License) along with your gold items. For pledge release, you'll also need the original pledge documents from your financier."
    },
    {
      question: "How quickly will I receive payment?",
      answer: "Payment is instant! Once the purity is verified and the amount is agreed upon, we transfer the funds immediately to your bank account or provide cash, depending on your preference."
    },
    {
      question: "Do you accept all types of gold items?",
      answer: "Yes, we accept all forms of gold including jewelry, coins, bars, and ornaments. Whether it's 18K, 22K, or 24K gold, we provide fair valuation for all types."
    },
    {
      question: "Is the gold rate fixed for the entire day?",
      answer: "Our gold rates are updated daily and guaranteed across all our branches for that day. However, rates may change the next day based on market fluctuations. We recommend checking our website or calling our branches for the latest rates."
    },
    {
      question: "How does the pledge release process work?",
      answer: "Simply fill out our Release Pledge Gold form with your details and loan information. Our team will contact you, coordinate with your financier to clear the loan, and release your gold back to you on the same day."
    },
    {
      question: "Are there any hidden charges?",
      answer: "No, we believe in complete transparency. The rate we quote is the rate you get. There are no processing fees, hidden charges, or deductions. What you see is what you get."
    },
    {
      question: "Is my gold and information safe with SVS Gold?",
      answer: "Absolutely! We maintain bank-grade security measures and follow strict confidentiality protocols. Your gold is handled with utmost care, and all your personal information is kept completely secure and confidential."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center animate-fade-in">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="tel:+919590704444"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all shadow-[var(--shadow-gold)]"
            >
              Call Us: +91 95907 04444
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
