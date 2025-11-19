 import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ContactCTASection = () => {
  const scrollTop = () => window.scrollTo(0, 0);

  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
          Ready to Get Started?
        </h2>

        <p
          className="text-xl mb-10 text-white/95 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          Let's work together to help your child reach their full potential.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          {/* Button 1 */}
          <Link
            to="/contact-us"
            onClick={scrollTop}
            className="group inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-2xl transform hover:-translate-y-1"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Button 2 */}
          <Link
            to="/services"
            onClick={scrollTop}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
