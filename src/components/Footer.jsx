const Footer = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              ANKITA<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
              // NETFLIX DEVELOPER SERIES &bull; SEASON 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-red-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#expertise" className="hover:text-red-500 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-red-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-red-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="https://github.com/Ankitapal122" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              GitHub ↗
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              LinkedIn ↗
            </a>
            <a 
              href="https://leetcode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              LeetCode ↗
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 hover:text-red-300 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="View SQLite messages database"
            >
              <span>🔐 SQLite Terminal</span>
            </button>
            <span className="text-white/40 tracking-widest uppercase">
              PORTFOLIO // B.SC CS
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded bg-white/5 hover:bg-red-600 hover:text-white border border-white/10 transition-all text-xs font-mono flex items-center gap-1.5 shadow-md"
              aria-label="Back to top"
            >
              <span>↑ Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Ankita Pal. All Rights Reserved.</p>
          <p className="text-red-500/80">STREAMING WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;