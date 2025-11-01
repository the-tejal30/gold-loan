import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Very transparent process. The German machine checked my gold purity accurately and I got the money in my bank account immediately. The staff explained everything clearly.",
  },
  {
    name: "Lakshmi Nair",
    location: "Kerala",
    rating: 5,
    text: "I was worried about selling my gold but the team made me feel comfortable. KYC was quick with just Aadhaar card and the rate they gave was very fair. Highly recommended!",
  },
  {
    name: "Venkat Rao",
    location: "Hyderabad",
    rating: 5,
    text: "Needed urgent cash for medical emergency. The whole process took only 15 minutes and money was transferred instantly. Thank you for the quick service!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their gold loans
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-secondary" />
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-6 space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg md:text-xl text-foreground text-center mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="text-center">
                    <div className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
