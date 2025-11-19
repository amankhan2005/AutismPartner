 // src/components/ContactForm.jsx
import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Heart } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const SERVICE_OPTIONS = [
  "ABA Therapy",
  "Speech Therapy",
  "Occupational Therapy",
  "Behavioral Consultation",
  "Other",
];

const LEAD_SOURCES = ["Website", "Google Ads", "Facebook", "Referral", "Other"];
const PREFERRED_CONTACTS = ["Call", "Email", "Text", "WhatsApp"];

function getUtmFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign = params.get("utm_campaign") || params.get("campaign") || "";
    const source = params.get("utm_source") || params.get("source") || "";
    const medium = params.get("utm_medium") || params.get("medium") || "";
    return { campaign, source, medium };
  } catch {
    return { campaign: "", source: "", medium: "" };
  }
}

export default function ContactForm({ apiEndpoint = "/api/contact/save" }) {
  const { settings } = useSettings();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL?.trim() || "";

  function buildEndpoint(ep) {
    if (!ep) return ep;
    if (/^https?:\/\//i.test(ep)) return ep;
    const base = BACKEND_URL.replace(/\/$/, "");
    const path = ep.startsWith("/") ? ep : `/${ep}`;
    if (base) return `${base}${path}`;
    return path;
  }

  const finalEndpoint = buildEndpoint(apiEndpoint);
  console.log("ContactForm will POST to:", finalEndpoint);

  // --- Dynamic contact values from settings (safely fallback to hardcoded originals) ---
  const defaultAddress =
    "849 Fairmount Ave, Suite 200-T8, Towson, MD 21286, USA";
  const defaultPhone = "(410) 905-5477";
  const defaultEmail = "info@autismabapartners.com";

  const HOSPITAL_ADDRESS = (settings && settings.address) || defaultAddress;
  const CLINIC_PHONE = (settings && settings.phone) || defaultPhone;
  const CONTACT_EMAIL = (settings && settings.email) || defaultEmail;
  const HOSPITAL_MAP_LINK =
    (settings && settings.mapLink) ||
    `https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_ADDRESS)}`;

  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    city: "",
    state: "",
    zipCode: "",
    message: "",
    serviceInterest: "ABA Therapy",
    preferredContact: "Call",
    bestTimeToReach: "",
    leadSource: "Website",
    utm: getUtmFromUrl(),
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setForm((s) => ({ ...s, utm: getUtmFromUrl() }));
  }, []);

  function validate() {
    const e = {};
    if (!form.parentName.trim())
      e.parentName = "Parent / Guardian name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.phone.trim() || !/^[+0-9()\-.\s]{7,}$/.test(form.phone))
      e.phone = "Valid phone number is required";
    if (!form.message.trim()) e.message = "Please describe your concern";
    if (
      form.childAge &&
      (isNaN(Number(form.childAge)) || Number(form.childAge) < 0)
    )
      e.childAge = "Child age must be a positive number";
    if (form.zipCode && !/^\d{5}(-\d{4})?$/.test(form.zipCode))
      e.zipCode = "Enter a valid US ZIP code";
    return e;
  }

  async function handleSubmit() {
    setServerError("");
    setSuccess(null);

    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        parentName: form.parentName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        childName: form.childName.trim() || undefined,
        childAge: form.childAge !== "" ? Number(form.childAge) : undefined,
        city: form.city.trim() || undefined,
        state: form.state.trim() || undefined,
        zipCode: form.zipCode.trim() || undefined,
        message: form.message.trim(),
        serviceInterest: form.serviceInterest,
        preferredContact: form.preferredContact,
        bestTimeToReach: form.bestTimeToReach,
        leadSource: form.leadSource,
        utm: form.utm,
        userAgent: navigator.userAgent || "",
      };

      const res = await fetch(finalEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        setServerError(
          data?.message || `Server error (${res.status}). Please try again.`
        );
        setSuccess(false);
      } else {
        setSuccess(true);
        setForm({
          parentName: "",
          email: "",
          phone: "",
          childName: "",
          childAge: "",
          city: "",
          state: "",
          zipCode: "",
          message: "",
          serviceInterest: "ABA Therapy",
          preferredContact: "Call",
          bestTimeToReach: "",
          leadSource: "Website",
          utm: getUtmFromUrl(),
        });
      }
    } catch (err) {
      console.error("ContactForm submit error:", err);
      setServerError("Network error. Please try again later.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setForm({
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      city: "",
      state: "",
      zipCode: "",
      message: "",
      serviceInterest: "ABA Therapy",
      preferredContact: "Call",
      bestTimeToReach: "",
      leadSource: "Website",
      utm: getUtmFromUrl(),
    });
    setErrors({});
    setSuccess(null);
    setServerError("");
  }

  // ---------- RENDER (unchanged form markup except dynamic contact values) ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Your Child's Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Request a free consultation with our experienced therapy team. We're
            here to support your family every step of the way.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">Available Mon-Sun, 8am-8pm</p>
                  <p className="text-orange-600 font-semibold mt-2">
                    <a
                      href={`tel:${CLINIC_PHONE.replace(/[^\d+]/g, "")}`}
                      className="hover:underline"
                    >
                      {CLINIC_PHONE}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-amber-500 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">We respond within 24 hours</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-amber-600 font-semibold mt-2 inline-block hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-400 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold  text-gray-900 mb-1">Visit Us</h3>
                  <p className="text-gray-600 text-sm">Our Baltimore location</p>
                  <a href={HOSPITAL_MAP_LINK} target="_blank" rel="noopener noreferrer">
                    <p className="text-orange-500 font-semibold mt-2">{HOSPITAL_ADDRESS}</p>
                  </a>
                  <p className="mt-2"></p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Fast Response</h3>
              </div>
              <p className="text-orange-50">
                Our team typically responds within 2-4 hours during business
                hours. We're committed to starting your child's journey as soon
                as possible.
              </p>
            </div>
          </div>

          {/* Form Section (unchanged) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-orange-500">
              {success === true && (
                <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Thank you for reaching out!
                    </h4>
                    <p className="text-green-700 text-sm">
                      We received your inquiry and our team will contact you
                      soon to discuss how we can support your child's
                      development.
                    </p>
                  </div>
                </div>
              )}

              {success === false && serverError && (
                <div className="mb-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-800 font-medium">{serverError}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Parent Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                      1
                    </span>
                    Parent / Guardian Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        value={form.parentName}
                        onChange={(e) =>
                          setForm({ ...form, parentName: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.parentName
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.parentName && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          ⚠ {errors.parentName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.email
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          ⚠ {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.phone
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                        placeholder="+1 (555) 555-5555"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          ⚠ {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        value={form.preferredContact}
                        onChange={(e) =>
                          setForm({ ...form, preferredContact: e.target.value })
                        }
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                      >
                        {PREFERRED_CONTACTS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Child Information */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                      2
                    </span>
                    Child's Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Name
                      </label>
                      <input
                        value={form.childName}
                        onChange={(e) =>
                          setForm({ ...form, childName: e.target.value })
                        }
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Age (years)
                      </label>
                      <input
                        type="number"
                        value={form.childAge}
                        onChange={(e) =>
                          setForm({ ...form, childAge: e.target.value })
                        }
                        className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.childAge
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                        placeholder="e.g. 4"
                      />
                      {errors.childAge && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          ⚠ {errors.childAge}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        value={form.serviceInterest}
                        onChange={(e) =>
                          setForm({ ...form, serviceInterest: e.target.value })
                        }
                        className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                      >
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      value={form.state}
                      onChange={(e) =>
                        setForm({ ...form, state: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                      placeholder="State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      value={form.zipCode}
                      onChange={(e) =>
                        setForm({ ...form, zipCode: e.target.value })
                      }
                      className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.zipCode
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                      placeholder="12345"
                    />
                    {errors.zipCode && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        ⚠ {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
                      3
                    </span>
                    Tell Us About Your Needs
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      className={`w-full rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                        errors.message
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                      placeholder="Please describe your concerns, goals, or any specific challenges your child is facing. The more details you provide, the better we can prepare for your consultation."
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        ⚠ {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Best Time to Reach You
                    </label>
                    <input
                      value={form.bestTimeToReach}
                      onChange={(e) =>
                        setForm({ ...form, bestTimeToReach: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                      placeholder="e.g., Morning, Afternoon, Evening"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How Did You Hear About Us?
                    </label>
                    <select
                      value={form.leadSource}
                      onChange={(e) =>
                        setForm({ ...form, leadSource: e.target.value })
                      }
                      className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300"
                    >
                      {LEAD_SOURCES.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                      By submitting this form, you agree to our{" "}
                      <span className="text-orange-600 font-medium">
                        privacy policy
                      </span>{" "}
                      and consent to be contacted by our team.
                    </p>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleReset}
                        className="flex-1 sm:flex-none px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                      >
                        Reset
                      </button>

                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                          </span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
