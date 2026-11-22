const Footer = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10 select-none overflow-hidden z-10">
      {/* Background Crimson Waves & Glows (Matching 1st Reference Image) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left crimson corner wave glow */}
        <div className="absolute -top-28 -left-24 w-[420px] h-[260px] bg-gradient-to-br from-red-600/35 via-rose-800/15 to-transparent rounded-full blur-[85px]" />
        {/* Bottom-center & bottom-right red ambient glow */}
        <div className="absolute -bottom-24 left-1/3 w-[500px] h-[220px] bg-red-600/15 rounded-full blur-[110px]" />
        <div className="absolute -bottom-20 -right-16 w-[420px] h-[240px] bg-gradient-to-tl from-red-600/35 via-rose-700/15 to-transparent rounded-full blur-[90px]" />

        {/* Curved SVG Glowing Red Ribbons (Top-Left & Bottom-Right) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-55"
          viewBox="0 0 1440 420"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Top-left wave */}
          <path
            d="M0 150 C 130 95, 250 35, 380 0 L 0 0 Z"
            fill="url(#footerTopLeftFill)"
          />
          <path
            d="M0 155 C 135 98, 255 38, 390 0"
            stroke="url(#footerRedLine1)"
            strokeWidth="2"
          />

          {/* Bottom-right wave */}
          <path
            d="M980 420 C 1140 365, 1300 330, 1440 315 L 1440 420 Z"
            fill="url(#footerBottomRightFill)"
          />
          <path
            d="M970 420 C 1135 362, 1295 328, 1440 312"
            stroke="url(#footerRedLine2)"
            strokeWidth="2"
          />

          <defs>
            <linearGradient id="footerTopLeftFill" x1="0" y1="0" x2="380" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#120204" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footerBottomRightFill" x1="980" y1="420" x2="1440" y2="315" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#120204" stopOpacity="0" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="0.38" />
            </linearGradient>
            <linearGradient id="footerRedLine1" x1="0" y1="155" x2="390" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff3b47" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footerRedLine2" x1="970" y1="420" x2="1440" y2="312" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E50914" stopOpacity="0" />
              <stop offset="100%" stopColor="#ff3b47" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
        
        {/* Top Row: Left Brand + Tagline + Sub-nav | Right Navigation + Hire Me Pill */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-12">
          
          {/* Left Column: ANKITA. + Tagline + Secondary Pipe Links */}
          <div className="flex flex-col items-start space-y-3">
            <a
              href="#home"
              className="text-3xl md:text-4xl font-extrabold text-white tracking-wider flex items-baseline gap-1.5"
            >
              <span>ANKITA</span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shadow-[0_0_12px_#E50914]" />
            </a>

            <p className="text-sm sm:text-base text-white/75 font-normal tracking-wide">
              Turning Ideas Into Innovation
            </p>

            {/* Subtle horizontal divider line under tagline */}
            <div className="w-64 sm:w-80 h-[1px] bg-gradient-to-r from-white/15 via-white/10 to-transparent my-2" />

            {/* Pipe-separated quick links row */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/75 pt-2">
              <a href="#home" className="hover:text-red-500 transition-colors">
                Home
              </a>
              <span className="text-white/25">|</span>
              <a href="#expertise" className="hover:text-red-500 transition-colors">
                Services
              </a>
              <span className="text-white/25">|</span>
              <a href="#contact" className="hover:text-red-500 transition-colors">
                Contact
              </a>
              <span className="text-white/25">|</span>
              <a href="#about" className="hover:text-red-500 transition-colors">
                About
              </a>
            </div>
          </div>

          {/* Right Column: Main Nav Links + Glowing Red Hire Me Pill */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:pt-2">
            <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-white/85">
              <a href="#about" className="hover:text-red-500 transition-colors">
                About
              </a>
              <a href="#expertise" className="hover:text-red-500 transition-colors">
                Services
              </a>
              <a href="#skills" className="hover:text-red-500 transition-colors">
                Digital Skills
              </a>
              <a href="#contact" className="hover:text-red-500 transition-colors">
                Contact
              </a>
              <a href="#projects" className="hover:text-red-500 transition-colors">
                Portfolio
              </a>
            </nav>

            <a
              href="#contact"
              className="px-6 py-2 rounded-full bg-[#1a070a] hover:bg-red-600 text-white font-semibold text-xs sm:text-sm border border-red-500/70 shadow-[0_0_22px_rgba(229,9,20,0.5)] hover:shadow-[0_0_32px_rgba(229,9,20,0.9)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Full-Width Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/15 to-red-500/30" />

        {/* Bottom Bar: Copyright Left | Privacy, Terms, Social Icons & Red Circle Scroll-Top Right */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/70">
          
          {/* Left: Copyright with Red Ankita Pal */}
          <div className="flex flex-wrap items-center gap-3">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <span className="text-red-500 font-semibold">Ankita Pal.</span> All rights reserved.
            </p>
          </div>

          {/* Right: Links + Social SVG Icons + Circular Up Arrow Button */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-white/60 hover:text-red-400 transition-colors cursor-pointer"
              title="Open SQLite Messages Terminal"
            >
              SQLite Terminal
            </button>
            <span className="text-white/25">|</span>
            <a href="#home" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/25">|</span>
            <a href="#home" className="text-white/70 hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-white/25 hidden sm:inline">|</span>

            {/* Social Icons: GitHub, LinkedIn, YouTube/Portfolio */}
            <div className="flex items-center gap-3.5 pl-1">
              {/* GitHub */}
              <a
                href="https://github.com/Ankitapal122"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white/80 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ankita-dharmraj-pal-411892341"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/80 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* YouTube / Video Play Icon */}
              <a
                href="https://github.com/Ankitapal122"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Projects"
                className="text-white/80 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Glowing Red Circle Scroll-to-Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 w-10 h-10 rounded-full bg-[#1a0709] hover:bg-red-600 border border-red-500/60 shadow-[0_0_20px_rgba(229,9,20,0.45)] hover:shadow-[0_0_30px_rgba(229,9,20,0.9)] flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
