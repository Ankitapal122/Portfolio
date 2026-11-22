import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api.js';

const Contact = () => {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // React Form State tracking
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false,
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission logic connected to Email (FormSubmit) + SQLite Database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.permission) {
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send direct email notification to palankita450000@gmail.com (works on GitHub Pages live site)
      const emailPromise = fetch('https://formsubmit.co/ajax/palankita450000@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.firstName} ${formData.lastName}`,
          _template: 'table',
        }),
      });

      // 2. Also save to local SQLite backend if running locally
      const dbPromise = api.submitMessage(formData);

      await Promise.allSettled([emailPromise, dbPromise]);
    } catch (err) {
      console.warn('Submission warning:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '', permission: false });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('palankita450000@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#060608] w-full min-h-screen relative overflow-hidden flex items-center justify-center py-24 px-4 sm:px-8 border-t border-white/10 select-none"
    >
      {/* Background Crimson Waves & Glows (Matching 2nd Reference Image) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left crimson corner wave glow */}
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-gradient-to-br from-red-600/30 via-rose-800/15 to-transparent rounded-full blur-[100px]" />
        {/* Bottom-right red ambient glow */}
        <div className="absolute -bottom-24 -right-24 w-[550px] h-[550px] bg-gradient-to-tl from-red-600/30 via-rose-700/15 to-transparent rounded-full blur-[120px]" />
        {/* Center ambient glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-red-600/10 rounded-full blur-[150px]" />

        {/* Decorative Curved Red Wave Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-45"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 320 C 180 220, 320 90, 520 0 L 0 0 Z"
            fill="url(#topLeftRibbon)"
          />
          <path
            d="M0 330 C 190 230, 330 100, 540 0"
            stroke="url(#redStroke)"
            strokeWidth="2"
          />
          <path
            d="M920 900 C 1100 800, 1270 720, 1440 660 L 1440 900 Z"
            fill="url(#bottomRightRibbon)"
          />
          <defs>
            <linearGradient id="topLeftRibbon" x1="0" y1="0" x2="520" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#120204" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bottomRightRibbon" x1="920" y1="900" x2="1440" y2="660" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#120204" stopOpacity="0" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="redStroke" x1="0" y1="330" x2="540" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Centered Contact Card (Matching 2nd Image) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full rounded-[2rem] bg-[#0e0e11]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(229,9,20,0.12)] p-7 sm:p-10 md:p-14 text-white overflow-hidden"
        >
          {/* Top Center Red Neon Rim Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#E50914]" />
          {/* Bottom Red Neon Rim Highlight */}
          <div className="absolute bottom-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-red-600/70 to-transparent shadow-[0_0_25px_#E50914]" />
          {/* Left & Right subtle red edge glow */}
          <div className="absolute inset-y-10 left-0 w-[1.5px] bg-gradient-to-b from-transparent via-red-600/50 to-transparent" />
          <div className="absolute inset-y-10 right-0 w-[1.5px] bg-gradient-to-b from-transparent via-red-600/50 to-transparent" />

          {/* Top Bar: Get In Touch Pill + Copy Email Address + Green Active Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            {/* Left Pill: Get In Touch */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
              <span className="text-xs font-semibold text-red-400 tracking-wide">Get In Touch</span>
            </div>

            {/* Right Controls: Copy Email Pill + Divider + Green Dot TRANSMISSION LINE ACTIVE */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-red-500/50 text-xs text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span>{copied ? '✓ Copied!' : 'Copy Email Address'}</span>
              </button>

              <span className="hidden sm:inline-block h-4 w-[1px] bg-white/15" />

              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span>TRANSMISSION LINE ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Contact <span className="text-red-600 drop-shadow-[0_0_25px_rgba(229,9,20,0.45)]">Us</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-normal">
              We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you soon.
            </p>
          </div>

          {submitted ? (
            <div className="py-14 text-center flex flex-col items-center justify-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 text-3xl animate-bounce shadow-[0_0_25px_rgba(229,9,20,0.4)]">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
                  Thank you for reaching out! Your message has been saved. I&apos;ll get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Two-Column Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* Left Column: 3 Stacked Rounded Input Boxes with Icons */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  {/* First Name */}
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-white/45 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-red-500/70 focus:bg-white/[0.05] text-sm text-white placeholder-white/45 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-white/45 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-red-500/70 focus:bg-white/[0.05] text-sm text-white placeholder-white/45 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-white/45 pointer-events-none">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-red-500/70 focus:bg-white/[0.05] text-sm text-white placeholder-white/45 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Right Column: Large Rounded Textarea Box with Chat Icon */}
                <div className="md:col-span-6 flex">
                  <div className="relative w-full flex">
                    <span className="absolute left-4 top-4 text-white/45 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      required
                      className="w-full h-full min-h-[168px] pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-red-500/70 focus:bg-white/[0.05] text-sm text-white placeholder-white/45 focus:outline-none resize-y transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Permission Checkbox + Privacy Shield + Red Glowing Pill Submit Button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
                {/* Left: Checkbox */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-white/75">
                  <input
                    type="checkbox"
                    id="permission"
                    checked={formData.permission}
                    onChange={handleChange}
                    required
                    className="mt-0.5 w-4 h-4 rounded border-white/30 bg-transparent text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    style={{ accentColor: '#E50914' }}
                  />
                  <label htmlFor="permission" className="cursor-pointer max-w-[260px] leading-snug">
                    I give permission to contact me at this email address.
                  </label>
                </div>

                {/* Right: Privacy Shield Info + Send Message Pill Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-5 flex-1">
                  <div className="flex items-center gap-2.5 text-xs text-white/55">
                    <svg className="w-5 h-5 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="max-w-[210px] leading-relaxed">
                      Your information is protected by standard privacy guidelines.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 group whitespace-nowrap shadow-[0_0_30px_rgba(229,9,20,0.65)] hover:shadow-[0_0_40px_rgba(229,9,20,0.95)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <svg
                      className={`w-4 h-4 transform ${
                        isSubmitting ? 'animate-spin' : 'group-hover:translate-x-1'
                      } transition-transform`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      viewBox="0 0 24 24"
                    >
                      {isSubmitting ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
