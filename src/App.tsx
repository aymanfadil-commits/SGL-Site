/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  Shield, 
  Users, 
  Landmark, 
  Search, 
  Handshake, 
  ChevronRight 
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'services' | 'careers' | 'contact';

// --- Components ---

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12 py-4 flex items-center justify-between ${
        isScrolled ? 'bg-navy/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <button 
        onClick={() => setPage('home')}
        className="flex items-center gap-3 group text-left"
      >
        <div className="relative">
          <Globe className="w-7 h-7 text-gold transition-transform duration-700 group-hover:rotate-180" strokeWidth={1.2} />
          <div className="absolute inset-0 bg-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="leading-tight">
          <div className="font-serif text-[17px] font-medium tracking-wide text-offwhite">Sage Global Links</div>
          <div className="text-[8px] md:text-[10.67px] tracking-[3px] uppercase text-gold leading-none">Strategic Advisory</div>
        </div>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setPage(link.id)}
            className={`text-[10px] md:text-[12.67px] tracking-[2.5px] uppercase font-medium transition-all hover:text-white ${
              activePage === link.id ? 'text-white' : 'text-white/50'
            }`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy-l border-b border-white/10 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setPage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-[12px] tracking-[3px] uppercase font-medium text-left text-white/70 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-[#060c17] border-t border-white/10 pt-20 pb-10 px-6 lg:px-16">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 pb-16 border-b border-white/8 mb-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-gold" strokeWidth={1.5} />
          <span className="font-serif text-lg text-offwhite tracking-wide">Sage Global Links</span>
        </div>
        <p className="text-white/50 text-xs md:text-[14.67px] leading-relaxed font-light max-w-xs">
          Strategic advisory bridging capital and political realities across Africa and the Middle East.
        </p>
      </div>
      
      <div>
        <h4 className="text-[9.5px] md:text-[12.17px] tracking-[3px] uppercase text-gold mb-8">Navigation</h4>
        <div className="flex flex-col gap-4">
          {['about', 'services', 'careers', 'contact'].map((p) => (
            <button 
              key={p}
              onClick={() => setPage(p as Page)}
              className="text-white/60 text-xs md:text-[14.67px] text-left hover:text-white/80 font-light transition-colors capitalize"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[9.5px] md:text-[12.17px] tracking-[3px] uppercase text-gold mb-8">Contact</h4>
        <a 
          href="mailto:info@sagegloballinks.com" 
          className="text-white/60 text-xs md:text-[14.67px] font-light hover:text-white/70 transition-colors flex items-center gap-3"
        >
          <Mail className="w-4 h-4" /> info@sagegloballinks.com
        </a>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-white/40 text-[10px] md:text-[12.67px] tracking-wider">© 2026 Sage Global Links Ltd. All rights reserved.</span>
      <span className="text-white/40 text-[8px] md:text-[10.67px] tracking-[4px] uppercase hidden md:block">
        Capital · Governance · Institutional Alignment
      </span>
    </div>
  </footer>
);

// --- Page Sections ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="flex flex-col">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-16 overflow-hidden bg-navy">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 grayscale-[30%]"
        style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
      
      {/* Globe Rings Decoration */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 hidden lg:block opacity-20">
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div className="absolute inset-[100px] rounded-full border border-gold/10" />
        <div className="absolute inset-[200px] rounded-full border border-gold/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/10" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/10" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-[10px] md:text-[12.67px] font-semibold tracking-[5px] text-gold uppercase">
            Capital · Governance · Institutional Alignment
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-light leading-[1.05] text-offwhite mb-8 text-6xl md:text-8xl lg:text-9xl"
        >
          Where capital meets<br />
          <span className="text-gold italic">political reality.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-offwhite/70 font-light leading-relaxed max-w-xl text-lg md:text-[22.67px] mb-12"
        >
          Senior-level strategic advisory for corporations and institutional investors navigating Africa and the Middle East.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={() => setPage('services')}
            className="group flex items-center gap-4 border border-slate-b bg-slate-b/5 hover:bg-slate-b/20 text-offwhite px-10 py-5 text-[11px] md:text-[13.67px] tracking-[3px] uppercase font-medium transition-all"
          >
            Our Services 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </div>
    </section>

    {/* Who We Are Intro */}
    <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -30 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-3 text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold">
            <div className="h-px w-8 bg-slate-b" />
            Who We Are
          </div>
          <h2 className="font-serif font-light leading-tight text-4xl md:text-5xl lg:text-6xl">
            Advisory built for capital that demands political clarity.
          </h2>
          <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px]">
            Sage Global Links is a senior-level strategic advisory firm specialising in Africa and the Middle East. We combine rigorous political analysis with trusted regional networks to help clients move decisively in complex markets.
          </p>
          <button 
            onClick={() => setPage('about')}
            className="group self-start flex items-center gap-3 text-slate-b text-[11px] md:text-[13.67px] tracking-[2px] uppercase font-bold"
          >
            About Sage Global Links 
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-1">
          {[
            { icon: <Globe className="w-5 h-5" />, title: "Africa & Middle East", desc: "Primary corridors of operation" },
            { icon: <Users className="w-5 h-5" />, title: "Senior-Level Only", desc: "No junior teams. No delegation." },
            { icon: <Landmark className="w-5 h-5" />, title: "Political & Institutional", desc: "Analysis and relationships, combined." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-navy/20 pl-8 py-8 hover:bg-slate-b/5 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="text-slate-b group-hover:scale-110 transition-transform">{item.icon}</div>
                <span className="text-[11px] md:text-[13.67px] tracking-[3px] uppercase font-bold text-navy">{item.title}</span>
              </div>
              <p className="text-slate-500 text-sm md:text-[16.67px] font-light pl-9">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Foundation Quote */}
    <section className="py-32 px-6 lg:px-16 bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-gold text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-10"
          >
            <div className="h-px w-8 bg-gold" />
            Our Foundation
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            className="border-l-4 border-gold pl-10 py-4 mb-12"
          >
            <blockquote className="font-serif italic font-light text-offwhite leading-tight text-3xl md:text-5xl">
              "Capital deployed without political and institutional clarity is capital at risk."
            </blockquote>
          </motion.div>
          <p className="text-offwhite/70 font-light leading-relaxed mb-12 text-lg md:text-[20.67px]">
            Sage Global Links was founded to close that gap. In complex markets, the right advisory relationship shapes outcomes. It is not optional.
          </p>
          <button 
            onClick={() => setPage('about')}
            className="inline-flex items-center gap-4 border border-white/20 hover:bg-offwhite/5 text-white px-10 py-5 text-[11px] md:text-[13.67px] tracking-[3px] uppercase font-medium transition-all"
          >
            About Us
          </button>
        </div>
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          className="relative order-1 lg:order-2"
        >
          <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src="/images/home-portrait.jpg"
              alt="Strategic Advisory"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full border border-gold/30 -z-10" />
        </motion.div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold">
              <div className="h-px w-8 bg-slate-b" />
              What We Do
            </div>
            <h2 className="font-serif font-light leading-tight text-4xl md:text-6xl">
              Institutional alignment for<br />capital deployment.
            </h2>
          </div>
          <button 
            onClick={() => setPage('services')}
            className="group flex items-center gap-3 text-slate-b text-[11px] md:text-[13.67px] tracking-[2px] uppercase font-bold"
          >
            View All Services <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Search />, title: "Political Navigation Advisory", desc: "Aligning capital deployment with political and institutional reality across Africa and the Middle East." },
            { icon: <Handshake />, title: "Cross-Border Partnership", desc: "Structuring partnerships that are commercially sound, politically realistic, and institutionally durable." },
            { icon: <Landmark />, title: "Institutional Design", desc: "Building governance structures and internal frameworks that survive political transitions." }
          ].map((svc, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setPage('services')}
              className="bg-offwhite p-10 border-t-4 border-slate-b shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="text-navy group-hover:text-slate-b transition-colors">{svc.icon}</div>
                <span className="font-serif text-3xl italic text-gold/40 group-hover:text-gold transition-colors">0{i+1}</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-navy mb-4 leading-tight">{svc.title}</h3>
              <p className="text-slate-500 text-sm md:text-[16.67px] leading-relaxed mb-10 font-light">{svc.desc}</p>
              <span className="text-[10px] md:text-[12.67px] tracking-[2px] uppercase text-slate-b font-bold flex items-center gap-2">
                Learn More <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 text-center bg-navy-l relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Globe className="w-[800px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
      </div>
      <motion.div 
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto flex flex-col items-center gap-10 relative z-10"
      >
        <h2 className="font-serif font-light text-offwhite text-4xl md:text-7xl">
          Ready to discuss your <span className="text-gold italic">mandate?</span>
        </h2>
        <button 
          onClick={() => setPage('contact')}
          className="group inline-flex items-center gap-4 border border-white/30 hover:bg-offwhite/10 text-white px-12 py-6 text-[12px] tracking-[4px] uppercase font-medium transition-all"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </button>
      </motion.div>
    </section>
  </div>
);

const AboutPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="flex flex-col">
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 lg:px-16 bg-navy overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: "url('/images/hero-about.jpg')" }}
      />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-gold text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-8"
        >
          <div className="h-px w-8 bg-gold" />
          About Sage Global Links
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif font-light text-offwhite leading-tight text-5xl md:text-8xl"
        >
          Built at the intersection of<br />
          <span className="text-gold italic">capital and governance.</span>
        </motion.h1>
      </div>
    </section>

    <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-serif font-light leading-tight text-3xl md:text-5xl">
              Founded by practitioners, not observers.
            </h2>
            <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px]">
              Sage Global Links was founded by practitioners, not observers. The advisory team brings decades of direct experience operating at the highest levels of international institutions, government, and cross-border development across Africa, the Middle East, and beyond.
            </p>
            <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px]">
              The firm's background is not academic. It has been built in the field — navigating political transitions, managing institutional relationships under pressure, and structuring outcomes in environments where the margin for error is thin.
            </p>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px]">
              The firm was established out of a recognition that the gap between capital and governance in complex markets was not being adequately served. Too many investments stall, partnerships collapse, and market entries fail — not because the commercial logic is wrong, but because the political and institutional groundwork was never laid.
            </p>
            <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px]">
              Sage Global Links provides the bridge between these two worlds. The firm understands how institutions work from the inside, how political authority is exercised in practice, and how to position capital and partnerships to endure beyond a single political cycle.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Principles */}
    <section className="py-32 px-6 lg:px-16 bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase font-bold mb-6">
          <div className="h-px w-8 bg-gold" />
          How We Operate
        </div>
        <h2 className="font-serif font-light text-offwhite text-3xl md:text-5xl mb-20">Standards applied to every mandate.</h2>
        
        <div className="flex flex-col">
          {[
            { title: "Analysis before relationships", desc: "The firm maps before it engages. Regional networks complement analytical work, they do not replace it." },
            { title: "Positioning over brokering", desc: "Sage Global Links advises on structure and political feasibility. It does not execute transactions or act as an intermediary." },
            { title: "Depth over geography", desc: "The firm operates in corridors we know well. It does not claim expertise beyond what it has demonstrated across years of work." },
            { title: "Discretion as standard", desc: "The nature of this work demands confidentiality. Every engagement is handled with the same discretion expected from clients." },
            { title: "Senior counsel only", desc: "Founder-led engagements. Strategic direction and client relationships are not delegated." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 py-12 border-b border-white/10 hover:bg-offwhite/[0.02] transition-colors px-4"
            >
              <h3 className="font-serif text-2xl text-offwhite font-light">{item.title}</h3>
              <p className="text-offwhite/70 font-light leading-relaxed text-lg md:text-[20.67px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Model */}
    <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-6">
          <div className="h-px w-8 bg-slate-b" />
          Our Model
        </div>
        <h2 className="font-serif font-light text-navy text-3xl md:text-5xl mb-10">Senior-led. Deliberately lean.</h2>
        <p className="text-slate-600 font-light leading-relaxed text-lg md:text-[20.67px] max-w-3xl mb-16">
          Sage Global Links operates as a senior-led advisory core supported by a curated network of regional advisors, former policymakers, sector specialists, and governance experts. This model allows mandate-specific expertise to be deployed without the overhead of a large firm — and without compromising the quality of counsel clients receive. The firm engages selectively. A limited number of clients are taken on at any given time to ensure every mandate receives the focus it deserves.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: "Corridor-Based Insight", body: "Direct familiarity with institutional systems, political dynamics, and regulatory environments on both sides of key investment corridors." },
            { label: "Capital-First Political Economy", body: "Political systems are analysed through the lens of capital deployment and institutional durability — not academic theory." },
            { label: "Structured Networks", body: "Where appropriate, the firm facilitates introductions and strategic convening that advance alignment. Relationships support the work — they do not substitute for it." },
            { label: "Institutional Discipline", body: "Sage Global Links does not overpromise influence. The focus is structure, clarity, and risk mitigation." }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-offwhite p-10 border border-navy/20 shadow-sm"
            >
              <h3 className="text-[11px] md:text-[13.67px] tracking-[3px] uppercase text-slate-b font-bold mb-4">{pillar.label}</h3>
              <p className="text-slate-500 font-light leading-relaxed text-lg md:text-[20.67px]">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Where We Work */}
    <section className="py-32 px-6 lg:px-16 bg-navy">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-gold text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-6">
            <div className="h-px w-8 bg-gold" />
            Where We Work
          </div>
          <h2 className="font-serif font-light text-offwhite text-3xl md:text-5xl mb-8">Where we operate.</h2>
          <p className="text-offwhite/70 font-light leading-relaxed text-lg md:text-[20.67px] mb-8">
            Sage Global Links advises across three core regions where it has built institutional relationships and political knowledge over years of direct engagement. The firm does not claim regional expertise beyond what it has earned through demonstrated work.
          </p>
        </motion.div>
        
        <div className="flex flex-col">
          {[
            "The Middle East & North Africa",
            "Eastern and Southern Africa",
            "Central and Western Africa"
          ].map((region, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center py-6 border-b border-white/10"
            >
              <span className="font-serif text-2xl md:text-[26.67px] text-offwhite font-light">{region}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-12">
          <div className="h-px w-8 bg-slate-b" />
          Mission & Vision
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="border border-navy/20 p-12"
          >
            <h3 className="text-[11px] md:text-[13.67px] tracking-[3px] uppercase text-slate-b font-bold mb-6">Mission</h3>
            <p className="font-serif font-light text-2xl md:text-3xl leading-tight text-navy">
              To enable capital to operate with clarity, discipline, and institutional alignment in politically complex environments.
            </p>
          </motion.div>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-navy/20 p-12"
          >
            <h3 className="text-[11px] md:text-[13.67px] tracking-[3px] uppercase text-slate-b font-bold mb-6">Vision</h3>
            <p className="font-serif font-light text-2xl md:text-3xl leading-tight text-navy">
              To become the most trusted strategic advisory partner for investors and corporations operating where governance, capital, and long-term development intersect.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 text-center bg-navy-l border-y border-white/10">
      <motion.div 
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto flex flex-col items-center gap-10"
      >
        <h2 className="font-serif font-light text-offwhite text-4xl md:text-6xl">
          Ready to discuss your <span className="text-gold italic">mandate?</span>
        </h2>
        <button 
          onClick={() => setPage('contact')}
          className="group inline-flex items-center gap-4 border border-white/30 hover:bg-offwhite/10 text-white px-12 py-6 text-[12px] tracking-[4px] uppercase font-medium transition-all"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </button>
      </motion.div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="flex flex-col">
    <section className="relative min-h-[85vh] flex flex-col justify-center px-6 lg:px-16 bg-navy overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale"
        style={{ backgroundImage: "url('/images/hero-services.jpg')" }}
      />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3 text-gold text-[10px] tracking-[4px] uppercase font-bold mb-8">
          <div className="h-px w-8 bg-gold" />
          What We Do
        </div>
        <h1 className="font-serif font-light text-offwhite leading-tight text-5xl md:text-8xl mb-8">
          Structured advisory for<br />
          <span className="text-gold italic">unstructured environments.</span>
        </h1>
        <p className="text-offwhite/70 font-light leading-relaxed max-w-2xl text-xl md:text-[22.67px]">
          Sage Global Links provides structured advisory support to corporations and investors operating where political dynamics directly shape commercial outcomes.
        </p>
      </div>
    </section>

    {[
      {
        id: "01",
        title: "Political Navigation Advisory",
        desc: "When investment strategy meets political systems, friction emerges. Regulatory frameworks shift with political transitions. Approval pathways are formally defined but informally negotiated.",
        points: [
          "Political and stakeholder mapping for capital deployment",
          "Regulatory pathway strategy",
          "Institutional power structure analysis",
          "Government-facing engagement strategy",
          "Political risk structuring at board level"
        ],
        dark: false
      },
      {
        id: "02",
        title: "Cross-Border Partnership & Entry",
        desc: "Successful market entry requires more than a local office. It requires political alignment across both home and host institutions, and governance frameworks that can survive transitions. We structure partnerships that are commercially sound and politically durable.",
        points: [
          "Market entry structuring for foreign investors",
          "Public-private partnership viability assessments",
          "Strategic partner identification and vetting",
          "Cross-border corridor strategy",
          "Government-investor alignment frameworks"
        ],
        dark: true
      },
      {
        id: "03",
        title: "Organisational Alignment for Market Entry",
        desc: "Moving into complex markets requires your internal structure to align with political reality. We advise on how to position your organisation — governance, roles, decision-making — to operate durably in these environments.",
        points: [
          "Organisational structure assessment for new market entry",
          "Internal role and mandate clarity aligned to political context",
          "Continuity planning across political transitions",
          "Decision-making architecture for complex institutional environments",
          "Board and leadership positioning for institutional stakeholder engagement"
        ],
        dark: false
      }
    ].map((svc, i) => (
      <section key={i} className={`py-32 px-6 lg:px-16 ${svc.dark ? 'bg-navy text-white' : 'bg-offwhite text-navy'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className={`flex items-center gap-3 text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold ${svc.dark ? 'text-gold' : 'text-slate-b'}`}>
              <div className={`h-px w-8 ${svc.dark ? 'bg-gold' : 'bg-slate-b'}`} />
              {svc.id}
            </div>
            <h2 className="font-serif font-light text-4xl md:text-6xl max-w-3xl">{svc.title}</h2>
            <p className={`font-light leading-relaxed text-xl md:text-[22.67px] max-w-2xl ${svc.dark ? 'text-offwhite/70' : 'text-slate-600'}`}>
              {svc.desc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mt-8">
              {svc.points.map((p, j) => (
                <div key={j} className="flex items-start gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 ${svc.dark ? 'bg-gold' : 'bg-slate-b'}`} />
                  <span className={`text-lg md:text-[20.67px] font-light ${svc.dark ? 'text-offwhite/70' : 'text-slate-500'}`}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    ))}
  </div>
);

const CareersPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', background: '' });
  const [errors, setErrors] = useState({ name: '', email: '', background: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = { name: '', email: '', background: '' };
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Full Name is required'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email Address is required'; isValid = false; }
    if (!formData.background.trim()) { newErrors.background = 'Brief Background is required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setIsSuccess(true);
      setFormData({ name: '', email: '', background: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrors(prev => ({ ...prev, background: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 lg:px-16 bg-navy overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale"
          style={{ backgroundImage: "url('/images/hero-careers.jpg')" }}
        />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 text-gold text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-8">
            <div className="h-px w-8 bg-gold" />
            Careers
          </div>
          <h1 className="font-serif font-light text-offwhite leading-tight text-5xl md:text-8xl">
            We work with people who have<br />
            <span className="text-gold italic">earned their perspective.</span>
          </h1>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="flex flex-col gap-8">
            <h2 className="font-serif font-light text-3xl md:text-5xl">Experience forged in the field.</h2>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              Sage Global Links is built on the principle that effective advisory work in complex markets requires lived experience. We work with former senior officials, experienced practitioners, and specialists who have operated at the intersection of politics and capital.
            </p>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              If you have senior-level experience in political economy, institutional advisory, or cross-border investment in Africa or the Middle East, we welcome a conversation.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-4">Areas of Relevance</div>
            {[
              "Political economy and institutional analysis",
              "Senior government or multilateral roles",
              "Cross-border investment structuring",
              "Regulatory and governance advisory",
              "Public-private partnership design"
            ].map((area, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-200">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span className="text-slate-700 font-light text-lg md:text-[20.67px]">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-16 bg-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="font-serif font-light text-offwhite text-3xl md:text-5xl mb-8">Open Application</h2>
            <p className="text-offwhite/70 font-light leading-relaxed text-lg md:text-[20.67px] mb-12">
              No open roles are listed at this time, but we review applications on an ongoing basis.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-offwhite/5 p-10 border border-white/10">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-gold font-bold">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-gold transition-colors" 
              />
              {errors.name && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-gold font-bold">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-gold transition-colors" 
              />
              {errors.email && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-gold font-bold">Brief Background</label>
              <textarea 
                rows={4} 
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                className="bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-gold transition-colors resize-none" 
              />
              {errors.background && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.background}</span>}
            </div>
            
            {isSuccess ? (
              <div className="bg-gold/10 border border-gold/30 text-gold py-5 text-center text-[11px] md:text-[13.67px] tracking-[3px] uppercase font-bold">
                Thank you. We'll be in touch shortly.
              </div>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gold text-navy py-5 text-[11px] md:text-[13.67px] tracking-[3px] uppercase font-bold hover:bg-offwhite transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Introduction'}
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', organisation: '', email: '', mandate: '' });
  const [errors, setErrors] = useState({ name: '', organisation: '', email: '', mandate: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = { name: '', organisation: '', email: '', mandate: '' };
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = 'Full Name is required'; isValid = false; }
    if (!formData.organisation.trim()) { newErrors.organisation = 'Organisation is required'; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = 'Email Address is required'; isValid = false; }
    if (!formData.mandate.trim()) { newErrors.mandate = 'Description of Mandate is required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setIsSuccess(true);
      setFormData({ name: '', organisation: '', email: '', mandate: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrors(prev => ({ ...prev, mandate: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 lg:px-16 bg-navy overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale"
          style={{ backgroundImage: "url('/images/hero-contact.jpg')" }}
        />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 text-gold text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold mb-8">
            <div className="h-px w-8 bg-gold" />
            Contact
          </div>
          <h1 className="font-serif font-light text-offwhite leading-tight text-5xl md:text-8xl">
            Discuss a <span className="text-gold italic">mandate.</span>
          </h1>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-16 bg-offwhite text-navy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-slate-b font-bold">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-b border-navy/30 py-3 text-navy outline-none focus:border-slate-b transition-colors" 
              />
              {errors.name && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-slate-b font-bold">Organisation</label>
              <input 
                type="text" 
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                className="bg-transparent border-b border-navy/30 py-3 text-navy outline-none focus:border-slate-b transition-colors" 
              />
              {errors.organisation && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.organisation}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-slate-b font-bold">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent border-b border-navy/30 py-3 text-navy outline-none focus:border-slate-b transition-colors" 
              />
              {errors.email && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] md:text-[12.67px] tracking-[3px] uppercase text-slate-b font-bold">Description of Mandate</label>
              <textarea 
                rows={5} 
                value={formData.mandate}
                onChange={(e) => setFormData({ ...formData, mandate: e.target.value })}
                className="bg-transparent border-b border-navy/30 py-3 text-navy outline-none focus:border-slate-b transition-colors resize-none" 
              />
              {errors.mandate && <span className="text-red-500 text-[10px] md:text-[12.67px] uppercase tracking-wider">{errors.mandate}</span>}
            </div>
            
            {isSuccess ? (
              <div className="bg-navy/5 border border-navy/20 text-navy py-6 text-center text-[11px] md:text-[13.67px] tracking-[4px] uppercase font-bold">
                Thank you. We'll be in touch shortly.
              </div>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-navy text-white py-6 text-[11px] md:text-[13.67px] tracking-[4px] uppercase font-bold hover:bg-slate-b transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            )}
          </form>

          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <div className="text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold">Email</div>
              <div className="font-serif text-3xl text-navy">
                info@<span className="text-slate-b">sagegloballinks.com</span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-slate-b text-[10px] md:text-[12.67px] tracking-[4px] uppercase font-bold">Regions</div>
              <div className="flex flex-col gap-2">
                <div className="font-serif text-2xl text-navy">The Middle East & North Africa</div>
                <div className="font-serif text-2xl text-navy">Eastern and Southern Africa</div>
                <div className="font-serif text-2xl text-navy">Central and Western Africa</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'about': return <AboutPage setPage={setActivePage} />;
      case 'services': return <ServicesPage />;
      case 'careers': return <CareersPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold/30">
      <Navbar activePage={activePage} setPage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setActivePage} />
    </div>
  );
}
