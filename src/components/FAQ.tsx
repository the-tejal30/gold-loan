import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What does SVS Gold do?",
      answer: "SVS Gold is a trusted gold and silver buying company. We buy gold directly from customers and also help those who are unable to pay their existing gold loan by clearing the loan with interest on their behalf and returning the remaining balance amount to them."
    },
    {
      question: "Do you provide gold loans?",
      answer: "No, SVS Gold does not provide loans. We only buy gold from customers who either visit our branch directly or wish to sell their pledged gold."
    },
    {
      question: "What documents are required?",
      answer: "Customers are required to carry a valid Aadhaar card for KYC verification, and the person selling gold must be at least 21 years of age."
    },
    {
      question: "How do you check gold purity?",
      answer: "We use advanced XRF technology to accurately test the purity of gold without causing any damage or loss to the item."
    },
    {
      question: "How soon will I get the payment?",
      answer: "Once the gold purity check and KYC process are completed, the customer receives the payment instantly through cash or bank transfer."
    },
    {
      question: "Is there any interest or hidden charge?",
      answer: "No, there are absolutely no hidden charges or deductions. The amount we quote after purity testing is the exact amount you receive."
    },
    {
      question: "What types of gold do you buy?",
      answer: "We buy all types of gold items, including jewelry, coins, bars, and ornaments, irrespective of their karat value."
    },
    {
      question: "Is my information safe with SVS Gold?",
      answer: "Yes, your personal information and gold items are completely safe with us. We maintain full confidentiality and handle every transaction with transparency and care."
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