import { useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminInboxModal from './components/AdminInboxModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative has-custom-cursor selection:bg-red-600 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
      <CustomCursor />

      {/* Portfolio Sections */}
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Admin SQLite Dispatch Terminal */}
      <AdminInboxModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
  );
}

export default App;