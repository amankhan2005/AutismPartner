 import React, { useEffect, useState } from "react";
 
 
 
import {
  FaHeart,
  FaHandsHelping,
  FaBrain,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaAward,
  FaSeedling,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import ContactCTASection from "../components/ContactSection";
import familyCard from "../assets/Home/EveryChild.webp"; // Importing local image
import evidenceCard from "../assets/Home/evidence.webp";

export default function About() {
  // ------------------ DYNAMIC MAP ADDRESS ------------------
  const [mapAddress, setMapAddress] = useState("");

useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/map`)
    .then((res) => res.json())
    .then((data) => setMapAddress(data?.mapAddress || ""));
}, []);


  const finalAddress =
    mapAddress || "849 Fairmount Ave, Suite 200-T8, Towson, MD 21286";
  // ----------------------------------------------------------

  return (
    <div className="bg-white text-gray-800">
      {/* -------- HERO SECTION -------- */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 py-20 px-6 overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/40 to-amber-100/40 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-orange-50/50 to-amber-50/50 rounded-full filter blur-3xl -z-10 animate-pulse-slow animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6 animate-fade-in-down">
            <FaHeart className="w-4 h-4" />
            Our Story
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up">
            About Our{" "}
            <span className="bg-white bg-clip-text text-transparent">
              Journey
            </span>
          </h1>
          <div className="w-20 h-1.5 bg-white rounded-full mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Empowering children and families through compassionate,
            evidence-based ABA therapy
          </p>
        </div>
      </section>

      {/* Mission Section - Enhanced with better layout */}
      <section className="py-16 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm animate-fade-in-left">
                <FaHeart className="w-4 h-4" />
                Our Mission
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] animate-fade-in-left animation-delay-200">
                  Every Child
                  <br />
                  Deserves to{" "}
                  <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Shine
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-scale-in animation-delay-400"></div>
              </div>

              <div className="space-y-6 max-w-xl">
                <p className="text-gray-700 leading-relaxed text-lg animate-fade-in-left animation-delay-300">
                  At{" "}
                  <span className="text-orange-600 font-semibold">
                    Autism ABA Partners
                  </span>
                  , we believe every child deserves personalized care, respect,
                  and the opportunity to reach their fullest potential. Our
                  mission is to provide high-quality, evidence-based Applied
                  Behavior Analysis (ABA) therapy that supports children,
                  empowers parents, and transforms lives.
                </p>

                <p className="text-gray-600 leading-relaxed text-base animate-fade-in-left animation-delay-500">
                  We focus on building essential life skills, communication, and
                  independence through compassionate therapy designed to meet
                  each family's unique goals. Our team blends scientific
                  precision with heartfelt empathy to design individualized
                  treatment plans.
                </p>
              </div>
            </div>

            {/* Right Image - Enhanced with better animations */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative group">
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.4)] animate-fade-in-right">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent z-10"></div>

                  {/* Imported image replaces the emoji/gradient box */}
                  <div className="w-full max-w-lg h-[650px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    <img
                      src={familyCard}
                      alt="Family-Centered Care"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>

                  {/* Enhanced Floating Card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/98 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-20 border border-white/20 transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-700">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
                        <FaHeart className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-bold text-gray-900 mb-1">
                          Compassionate Care
                        </div>
                        <div className="text-sm text-gray-600 leading-snug">
                          Individualized therapy plans designed for every
                          child's unique journey
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-orange-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-amber-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 animate-pulse-slow animation-delay-1500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Enhanced with better card design */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/30 to-amber-100/30 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm mb-6 animate-fade-in-down">
              <FaStar className="w-4 h-4" />
              What Drives Us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.1] animate-fade-in-up">
              Our Core Values
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-6 animate-scale-in animation-delay-300"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Compassion Card - Enhanced */}
            <div className="group relative bg-white rounded-3xl p-10 border border-gray-200 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 animate-fade-in-up animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-orange-200/50">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
                  Compassion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We lead with empathy and kindness, understanding each family's
                  unique journey and supporting them with genuine care.
                </p>
              </div>
            </div>

            {/* Collaboration Card - Enhanced */}
            <div className="group relative bg-white rounded-3xl p-10 border border-gray-200 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 animate-fade-in-up animation-delay-400">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-orange-200/50">
                  <FaHandsHelping className="text-white text-2xl" />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
                  Collaboration
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We work hand-in-hand with families, caregivers, and educators
                  to create the most effective treatment plans.
                </p>
              </div>
            </div>

            {/* Growth Card - Enhanced */}
         <div className="group relative bg-white rounded-3xl p-10 border border-gray-200 hover:border-orange-300 transition-all duration-500 hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 animate-fade-in-up animation-delay-600">
  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  <div className="relative z-10">
    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-orange-200/50">
      <FaSeedling className="text-white text-2xl" />
    </div>

    <h3 className="font-bold text-2xl mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">
      Growth
    </h3>

    <p className="text-gray-600 leading-relaxed">
      We believe in continuous progress — celebrating every milestone, big or small, along the way.
    </p>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* Our Approach - Enhanced with better layout */}
      <section className="py-16 px-6 bg-white relative overflow-hidden">
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Image - Enhanced */}
            <div className="flex justify-center lg:justify-start relative">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.4)] animate-fade-in-left">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent z-10"></div>

                  {/* ✅ Imported image replaces emoji/gradient box */}
                  <div className="w-full max-w-lg h-[650px] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                    <img
                      src={evidenceCard}
                      alt="Evidence-Based"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>

                  {/* Floating Card (unchanged) */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/98 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-20 border border-white/20 transform translate-y-0 group-hover:-translate-y-2 transition-all duration-500 animate-fade-in-up animation-delay-700">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
                        <FaBrain className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-bold text-gray-900 mb-1">
                          Proven Methods
                        </div>
                        <div className="text-sm text-gray-600 leading-snug">
                          Latest research combined with compassionate care
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-orange-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 animate-pulse-slow animation-delay-1000"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-amber-200 rounded-3xl -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 animate-pulse-slow animation-delay-1500"></div>
              </div>
            </div>

            {/* Right Content - Enhanced */}
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm animate-fade-in-right">
                <FaBrain className="w-4 h-4" />
                Our Methodology
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] animate-fade-in-right animation-delay-200">
                  Our{" "}
                  <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Approach
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-scale-in animation-delay-400"></div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed animate-fade-in-right animation-delay-300">
                We combine the latest research in behavioral science with
                compassionate, individualized care. Our therapists create
                engaging programs focused on:
              </p>

              <div className="space-y-5">
                {[
                  "Communication and language development",
                  "Social skills and peer interaction",
                  "Emotional regulation and coping strategies",
                  "Daily living and independence skills",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 group/item animate-fade-in-right"
                    style={{ animationDelay: `${500 + i * 100}ms` }}
                  >
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl p-2.5 mt-0.5 group-hover/item:scale-110 transition-transform shadow-md group-hover/item:shadow-orange-300/50">
                      <FaCheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-base text-gray-700 font-medium group-hover/item:text-orange-600 transition-colors pt-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with better animations */}

      {/* Map inserted above contact section - keeps rest unchanged */}
      <section className="py-12 px-6 bg-white">
        <div className=" mx-auto">
          <div className="w-full h-120 rounded-2xl overflow-hidden shadow-lg">
          <iframe
  title="Autism ABA Partners Location"
  src={`https://www.google.com/maps?q=${encodeURIComponent(finalAddress)}&z=13&output=embed`}
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

          </div>
        </div>
      </section>

      <ContactCTASection />

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
