/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
        <p className="text-white/60 text-xs md:text-[14.67px] leading-relaxed font-light max-w-xs">
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
      <span className="text-white/50 text-[10px] md:text-[12.67px] tracking-wider">© 2026 Sage Global Links Ltd. All rights reserved.</span>
      <span className="text-white/50 text-[8px] md:text-[10.67px] tracking-[4px] uppercase hidden md:block">
        Capital · Governance · Institutional Alignment
      </span>
    </div>
  </footer>
);

// --- Page Sections ---
type City = { name: string; lon: number; lat: number; label?: boolean; lside?: 'left' };

const CITIES: City[] = [
  { name: 'CASABLANCA', lon: -7.6, lat: 33.6 },
  { name: 'DAKAR', lon: -17.4, lat: 14.7, label: true },
  { name: 'ACCRA', lon: -0.2, lat: 5.6 },
  { name: 'LAGOS', lon: 3.4, lat: 6.5, label: true },
  { name: 'CAIRO', lon: 31.2, lat: 30.0, label: true },
  { name: 'RIYADH', lon: 46.7, lat: 24.7, label: true, lside: 'left' },
  { name: 'DOHA', lon: 51.5, lat: 25.3, label: true },
  { name: 'ADDIS ABABA', lon: 38.7, lat: 9.0 },
  { name: 'NAIROBI', lon: 36.8, lat: -1.3, label: true },
  { name: 'KIGALI', lon: 30.1, lat: -1.9 },
  { name: 'JOHANNESBURG', lon: 28.0, lat: -26.2, label: true },
];

const CORRIDORS: [number, number][] = [
  [6, 8], [5, 4], [4, 3], [0, 1], [8, 10], [6, 7],
  [2, 3], [4, 8], [5, 7], [1, 2], [8, 9], [0, 4],
];

/* Real coastlines (world-atlas 110m, clipped to lon -26..68 / lat -38..47) */
const COAST: number[][][] = [[[50.1,-13.6],[50.2,-14.8],[50.5,-15.2],[50.4,-15.7],[50.2,-16],[49.9,-15.4],[49.7,-15.7],[49.9,-16.5],[49.8,-16.9],[49.5,-17.1],[49.4,-18],[49,-19.1],[48.5,-20.5],[47.9,-22.4],[47.5,-23.8],[47.1,-24.9],[46.3,-25.2],[45.4,-25.6],[44.8,-25.3],[44,-25],[43.8,-24.5],[43.7,-23.6],[43.3,-22.8],[43.3,-22.1],[43.4,-21.3],[43.9,-21.2],[43.9,-20.8],[44.4,-20.1],[44.5,-19.4],[44.2,-19],[44,-18.3],[44,-17.4],[44.3,-16.9],[44.4,-16.2],[44.9,-16.2],[45.5,-16],[45.9,-15.8],[46.3,-15.8],[46.9,-15.2],[47.7,-14.6],[48,-14.1],[47.9,-13.7],[48.3,-13.8],[48.8,-13.1],[48.9,-12.5],[49.2,-12],[49.5,-12.5],[49.8,-12.9],[50.1,-13.6]],[[34.6,35.7],[33.9,35.2],[34,35.1],[34,35],[33,34.6],[32.5,34.7],[32.3,35.1],[32.7,35.1],[32.8,35.1],[32.9,35.4],[33.7,35.4],[34.6,35.7]],[[23.7,35.7],[24.2,35.4],[25,35.4],[25.8,35.4],[25.7,35.2],[26.3,35.3],[26.2,35],[24.7,34.9],[24.7,35.1],[23.5,35.3],[23.7,35.7]],[[15.5,38.2],[15.2,37.4],[15.3,37.1],[15.1,36.6],[14.3,37],[13.8,37.1],[12.4,37.6],[12.6,38.1],[13.7,38],[14.8,38.1],[15.5,38.2]],[[9.2,41.2],[9.8,40.5],[9.7,39.2],[9.2,39.2],[8.8,38.9],[8.4,39.2],[8.4,40.4],[8.2,41],[8.7,40.9],[9.2,41.2]],[[9.6,42.2],[9.2,41.4],[8.8,41.6],[8.5,42.3],[8.7,42.6],[9.4,43],[9.6,42.2]],[[67.4,23.9],[67.1,24.7],[66.4,25.4],[64.5,25.2],[62.9,25.2],[61.5,25.1],[59.6,25.4],[58.5,25.6],[57.4,25.7],[57,27],[56.5,27.1],[55.7,27],[54.7,26.5],[53.5,26.8],[52.5,27.6],[51.5,27.9],[50.9,28.8],[50.1,30.1],[49.6,30],[48.9,30.3],[48.6,29.9],[48,30],[48.2,29.5],[48.1,29.3],[48.4,28.6],[48.8,27.7],[49.3,27.5],[49.5,27.1],[50.2,26.7],[50.2,26.3],[50.1,25.9],[50.2,25.6],[50.5,25.3],[50.7,25],[50.8,24.8],[50.7,25.5],[51,26],[51.3,26.1],[51.6,25.8],[51.6,25.2],[51.4,24.6],[51.6,24.2],[51.8,24.3],[51.8,24],[52.6,24.2],[53.4,24.2],[54,24.1],[54.7,24.8],[55.4,25.4],[56.1,26.1],[56.4,26.4],[56.5,26.3],[56.4,25.9],[56.3,25.7],[56.4,24.9],[56.8,24.2],[57.4,23.9],[58.1,23.7],[58.7,23.6],[59.2,23],[59.4,22.7],[59.8,22.5],[59.8,22.3],[59.4,21.7],[59.3,21.4],[58.9,21.1],[58.5,20.4],[58,20.5],[57.8,20.2],[57.7,19.7],[57.8,19.1],[57.7,18.9],[57.2,18.9],[56.6,18.6],[56.5,18.1],[56.3,17.9],[55.7,17.9],[55.3,17.6],[55.3,17.2],[54.8,16.9],[54.2,17],[53.6,16.7],[53.1,16.7],[52.4,16.4],[52.2,15.9],[52.2,15.6],[51.2,15.2],[49.6,14.7],[48.7,14],[48.2,13.9],[47.9,14],[47.4,13.6],[46.7,13.4],[45.9,13.3],[45.6,13.3],[45.4,13],[45.1,13],[45,12.7],[44.5,12.7],[44.2,12.6],[43.5,12.6],[43.2,13.2],[43.3,13.8],[43.1,14.1],[42.9,14.8],[42.6,15.2],[42.8,15.3],[42.7,15.7],[42.8,15.9],[42.8,16.3],[42.7,16.8],[42.3,17.1],[42.3,17.5],[41.8,17.8],[41.2,18.7],[40.9,19.5],[40.2,20.2],[39.8,20.3],[39.1,21.3],[39,22],[39.1,22.6],[38.5,23.7],[38,24.1],[37.5,24.3],[37.2,24.9],[37.2,25.1],[36.9,25.6],[36.6,25.8],[36.3,26.6],[35.6,27.4],[35.1,28.1],[34.6,28.1],[34.8,28.6],[34.8,29],[35,29.4],[34.9,29.5],[34.6,29.1],[34.4,28.3],[34.2,27.8],[33.9,27.6],[33.6,28],[33.1,28.4],[32.4,29.9],[32.3,29.8],[32.7,28.7],[33.3,27.7],[34.1,26.1],[34.5,25.6],[34.8,25],[35.7,23.9],[35.5,23.8],[35.5,23.1],[36.7,22.2],[36.9,22],[37.2,21],[37,20.8],[37.1,19.8],[37.5,18.6],[37.9,18.4],[38.4,18],[39,16.8],[39.3,15.9],[39.8,15.4],[41.2,14.5],[41.7,13.9],[42.3,13.3],[42.6,13],[43.1,12.7],[43.3,12.4],[43.3,12],[42.7,11.7],[43.1,11.5],[43.5,11.3],[43.7,10.9],[44.1,10.4],[44.6,10.4],[45.6,10.7],[46.6,10.8],[47.5,11.1],[48,11.2],[48.4,11.4],[48.9,11.4],[49.3,11.4],[49.7,11.6],[50.3,11.7],[50.7,12],[51.1,12],[51.1,11.7],[51,11.2],[51,10.6],[50.8,10.3],[50.6,9.2],[50.1,8.1],[49.5,6.8],[48.6,5.3],[47.7,4.2],[46.6,2.9],[45.6,2],[44.1,1.1],[43.1,0.3],[42,-0.9],[41.8,-1.4],[41.6,-1.7],[40.9,-2.1],[40.6,-2.5],[40.3,-2.6],[40.1,-3.3],[39.8,-3.7],[39.6,-4.3],[39.2,-4.7],[38.7,-5.9],[38.8,-6.5],[39.4,-6.8],[39.5,-7.1],[39.2,-7.7],[39.3,-8],[39.2,-8.5],[39.5,-9.1],[40,-10.1],[40.3,-10.3],[40.5,-10.8],[40.4,-11.8],[40.6,-12.6],[40.6,-14.2],[40.8,-14.7],[40.5,-15.4],[40.1,-16.1],[39.5,-16.7],[38.5,-17.1],[37.4,-17.6],[36.3,-18.7],[35.9,-18.8],[35.2,-19.6],[34.8,-19.8],[34.7,-20.5],[35.2,-21.3],[35.4,-21.8],[35.4,-22.1],[35.6,-22.1],[35.5,-23.1],[35.4,-23.5],[35.6,-23.7],[35.5,-24.1],[35,-24.5],[34.2,-24.8],[33,-25.4],[32.6,-25.7],[32.7,-26.1],[32.9,-26.2],[32.8,-26.7],[32.6,-27.5],[32.5,-28.3],[32.2,-28.8],[31.5,-29.3],[31.3,-29.4],[30.9,-29.9],[30.6,-30.4],[30.1,-31.1],[28.9,-32.2],[28.2,-32.8],[27.5,-33.2],[26.4,-33.6],[25.9,-33.7],[25.8,-33.9],[25.2,-33.8],[24.7,-34],[23.6,-33.8],[23,-33.9],[22.6,-33.9],[21.5,-34.3],[20.7,-34.4],[20.1,-34.8],[19.6,-34.8],[19.2,-34.5],[18.9,-34.4],[18.4,-34],[18.4,-34.1],[18.2,-33.9],[18.3,-33.3],[17.9,-32.6],[18.2,-32.4],[18.2,-31.7],[17.6,-30.7],[17.1,-29.9],[17.1,-29.9],[16.3,-28.6],[15.6,-27.8],[15.2,-27.1],[15,-26.1],[14.7,-25.4],[14.4,-23.9],[14.4,-22.7],[14.3,-22.1],[13.9,-21.7],[13.4,-20.9],[12.8,-19.7],[12.6,-19],[11.8,-18.1],[11.7,-17.3],[11.6,-16.7],[11.8,-15.8],[12.1,-14.9],[12.2,-14.4],[12.5,-13.5],[12.7,-13.1],[13.3,-12.5],[13.6,-12],[13.7,-11.3],[13.7,-10.7],[13.4,-10.4],[13.1,-9.8],[12.9,-9.2],[12.9,-9],[13.2,-8.6],[12.9,-7.6],[12.7,-6.9],[12.2,-6.3],[12.3,-6.1],[12.2,-5.8],[11.9,-5],[11.1,-4],[10.1,-3],[9.4,-2.1],[8.8,-1.1],[8.8,-0.8],[9,-0.5],[9.3,0.3],[9.5,1],[9.3,1.2],[9.6,2.3],[9.8,3.1],[9.4,3.7],[8.9,3.9],[8.7,4.4],[8.5,4.5],[8.5,4.8],[7.5,4.4],[7.1,4.5],[6.7,4.2],[5.9,4.3],[5.4,4.9],[5,5.6],[4.3,6.3],[3.6,6.3],[2.7,6.3],[1.9,6.1],[1.1,5.9],[-0.5,5.3],[-1.1,5],[-2,4.7],[-2.9,5],[-3.3,5],[-4,5.2],[-4.6,5.2],[-5.8,5],[-6.5,4.7],[-7.5,4.3],[-7.7,4.4],[-8,4.4],[-9,4.8],[-9.9,5.6],[-10.8,6.1],[-11.4,6.8],[-11.7,6.9],[-12.4,7.3],[-12.9,7.8],[-13.1,8.2],[-13.2,8.9],[-13.7,9.5],[-14.1,9.9],[-14.3,10],[-14.6,10.2],[-14.7,10.7],[-14.8,10.9],[-15.1,11],[-15.7,11.5],[-16.1,11.5],[-16.3,11.8],[-16.3,12],[-16.6,12.2],[-16.7,12.4],[-16.8,13.2],[-16.7,13.6],[-17.1,14.4],[-17.6,14.7],[-17.2,14.9],[-16.7,15.6],[-16.5,16.1],[-16.6,16.7],[-16.3,17.2],[-16.1,18.1],[-16.3,19.1],[-16.4,19.6],[-16.3,20.1],[-16.5,20.6],[-17.1,21],[-17,21.4],[-17,21.9],[-16.6,22.2],[-16.3,22.7],[-16.3,23],[-16,23.7],[-15.4,24.4],[-15.1,24.5],[-14.8,25.1],[-14.8,25.6],[-14.4,26.3],[-13.8,26.6],[-13.1,27.6],[-12.6,28],[-11.7,28.1],[-10.9,28.8],[-10.4,29.1],[-9.6,29.9],[-9.8,31.2],[-9.4,32],[-9.3,32.6],[-8.7,33.2],[-7.7,33.7],[-6.9,34.1],[-6.2,35.1],[-5.9,35.8],[-5.2,35.8],[-4.6,35.3],[-3.6,35.4],[-2.6,35.2],[-2.2,35.2],[-1.2,35.7],[-0.1,35.9],[0.5,36.3],[1.5,36.6],[3.2,36.8],[4.8,36.9],[5.3,36.7],[6.3,37.1],[7.3,37.1],[7.7,36.9],[8.4,36.9],[9.5,37.4],[10.2,37.2],[10.2,36.7],[11,37.1],[11.1,36.9],[10.6,36.4],[10.6,35.9],[10.9,35.7],[10.8,34.8],[10.2,34.3],[10.3,33.8],[10.9,33.8],[11.1,33.3],[11.5,33.1],[12.7,32.8],[13.1,32.9],[13.9,32.7],[15.2,32.3],[15.7,31.4],[16.6,31.2],[18,30.8],[19.1,30.3],[19.6,30.5],[20.1,31],[19.8,31.8],[20.1,32.2],[20.9,32.7],[21.5,32.8],[22.9,32.6],[23.2,32.2],[23.6,32.2],[23.9,32],[24.9,31.9],[25.2,31.6],[26.5,31.6],[27.5,31.3],[28.4,31],[28.9,30.9],[29.7,31.2],[30.1,31.5],[31,31.6],[31.7,31.4],[32,30.9],[32.2,31.3],[33,31],[33.8,31],[34.3,31.2],[34.6,31.5],[34.5,31.6],[34.8,32.1],[35,32.8],[35.1,33.1],[35.1,33.1],[35.5,33.9],[36,34.6],[36,34.6],[35.9,35.4],[36.1,35.8],[35.8,36.3],[36.2,36.7],[35.6,36.6],[34.7,36.8],[34,36.2],[32.5,36.1],[31.7,36.6],[30.6,36.7],[30.4,36.3],[29.7,36.1],[28.7,36.7],[27.6,36.7],[27,37.7],[26.3,38.2],[26.8,39],[26.2,39.5],[27.3,40.4],[28.8,40.5],[29.2,41.2],[31.1,41.1],[32.3,41.7],[33.5,42],[35.2,42],[36.9,41.3],[38.3,40.9],[39.5,41.1],[40.4,41],[41.6,41.5],[41.7,42],[41.5,42.6],[40.9,43],[40.3,43.1],[40,43.4],[38.7,44.3],[37.5,44.7],[36.7,45.2],[37.4,45.4],[38.2,46.2],[37.7,46.6]],[[36.8,46.7],[35.8,46.6],[35,46.3],[35,45.7],[35.5,45.4],[36.5,45.5],[36.3,45.1],[35.2,44.9],[33.9,44.4],[33.3,44.6],[33.5,45],[32.5,45.3],[32.6,45.5],[33.6,45.9],[33.3,46.1],[31.7,46.3],[31.7,46.7],[30.7,46.6],[30.4,46],[29.6,45.3],[29.6,45],[29.1,44.8],[28.8,44.9],[28.6,43.7],[28,43.3],[27.7,42.6],[28,42],[28.1,41.6],[29,41.3],[28.8,41.1],[27.6,41],[27.2,40.7],[26.4,40.2],[26,40.6],[26.1,40.8],[25.4,40.9],[24.9,40.9],[23.7,40.7],[24.4,40.1],[23.9,40],[23.3,40],[22.8,40.5],[22.6,40.3],[22.9,39.7],[23.4,39.2],[23,39],[23.5,38.5],[24,38.2],[24,37.7],[23.1,37.9],[23.4,37.4],[22.8,37.3],[23.2,36.4],[22.5,36.4],[21.7,36.8],[21.3,37.6],[21.1,38.3],[20.7,38.8],[20.2,39.3],[20.2,39.6],[20,39.7],[20,39.9],[19.4,40.3],[19.3,40.7],[19.4,41.4],[19.5,41.7],[19.4,41.9],[19.2,42],[18.9,42.3],[18.4,42.5],[17.5,42.8],[16.9,43.2],[16,43.5],[15.2,44.2],[15.4,44.3],[14.9,44.7],[14.9,45.1],[14.3,45.2],[14,44.8],[13.7,45.1],[13.7,45.5],[13.7,45.5],[13.9,45.6],[13.1,45.7],[12.3,45.4],[12.4,44.9],[12.3,44.6],[12.6,44.1],[13.5,43.6],[14,42.8],[15.1,42],[15.9,42],[16.2,41.7],[15.9,41.5],[16.8,41.2],[17.5,40.9],[18.4,40.4],[18.5,40.2],[18.3,39.8],[17.7,40.3],[16.9,40.4],[16.5,39.8],[17.2,39.4],[17.1,38.9],[16.6,38.8],[16.1,38],[15.7,37.9],[15.7,38.2],[15.9,38.8],[16.1,39],[15.7,39.5],[15.4,40],[15,40.2],[14.7,40.6],[14.1,40.8],[13.6,41.2],[12.9,41.3],[12.1,41.7],[11.2,42.4],[10.5,42.9],[10.2,43.9],[9.7,44],[8.9,44.4],[8.4,44.2],[7.8,43.8],[7.4,43.7],[6.5,43.1],[4.6,43.4],[3.1,43.1],[3,42.5],[3,41.9],[2.1,41.2],[0.8,41],[0.7,40.7],[0.1,40.1],[-0.3,39.3],[0.1,38.7],[-0.5,38.3],[-0.7,37.6],[-1.4,37.4],[-2.1,36.7],[-3.4,36.7],[-4.4,36.7],[-5,36.3],[-5.4,35.9],[-5.9,36],[-6.2,36.4],[-6.5,36.9],[-7.5,37.1],[-7.9,36.8],[-8.4,37],[-8.9,36.9],[-8.7,37.7],[-8.8,38.3],[-9.3,38.4],[-9.5,38.7],[-9.4,39.4],[-9,39.8],[-9,40.2],[-8.8,40.8],[-8.8,41.2],[-9,41.5],[-9,41.9],[-9,42.6],[-9.4,43],[-8,43.7],[-6.8,43.6],[-5.4,43.6],[-4.3,43.4],[-3.5,43.5],[-1.9,43.4],[-1.4,44],[-1.2,46]],[[49.1,41.3],[49.6,40.6],[50.1,40.5],[50.4,40.3],[49.6,40.2],[49.4,39.4],[49.2,39],[48.9,38.8],[48.9,38.3],[49.2,37.6],[50.1,37.4],[50.8,36.9],[52.3,36.7],[53.8,37],[53.9,37.2],[53.7,37.9],[53.9,39],[53.1,39.3],[53.4,40],[52.7,40],[52.9,40.9],[53.9,40.6],[54.7,41],[54,41.6],[53.7,42.1],[52.9,41.9],[52.8,41.1],[52.5,41.8],[52.4,42],[52.7,42.4],[52.5,42.8],[51.3,43.1],[50.9,44],[50.3,44.3],[50.3,44.6],[51.3,44.5],[51.3,45.2],[52.2,45.4],[53,45.3],[53.2,46.2],[53,46.9],[52,46.8]],[[50,46.6],[49.1,46.4],[48.6,45.8],[47.7,45.6],[46.7,44.6],[47.6,43.7],[47.5,43],[48.6,41.8],[49.1,41.3]]];

const GRAT_LON = [-15, 0, 15, 30, 45, 60];
const GRAT_LAT = [-30, -15, 0, 15, 30, 45];

function CorridorCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let base: HTMLCanvasElement | null = null;
    const off = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let hovered = -1;

    const proj = (lon: number, lat: number) => {
      const nx = (lon + 26) / 94;
      const ny = (47 - lat) / 85;
      const wide = w > 760;
      return {
        x: wide ? w * (0.3 + nx * 0.68) : w * (0.02 + nx * 0.96),
        y: h * (0.02 + ny * 0.96),
      };
    };
    const px = (c: City) => proj(c.lon, c.lat);

    const buildBase = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      base = document.createElement('canvas');
      base.width = w * dpr;
      base.height = h * dpr;
      const b = base.getContext('2d');
      if (!b) return;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);

      b.strokeStyle = 'rgba(210, 198, 172, 0.05)';
      b.lineWidth = 0.6;
      for (const lon of GRAT_LON) {
        b.beginPath();
        for (let lat = -38; lat <= 47; lat += 2) {
          const p = proj(lon, lat);
          lat === -38 ? b.moveTo(p.x, p.y) : b.lineTo(p.x, p.y);
        }
        b.stroke();
      }
      for (const lat of GRAT_LAT) {
        b.strokeStyle = lat === 0 ? 'rgba(210, 198, 172, 0.09)' : 'rgba(210, 198, 172, 0.05)';
        b.beginPath();
        for (let lon = -26; lon <= 68; lon += 2) {
          const p = proj(lon, lat);
          lon === -26 ? b.moveTo(p.x, p.y) : b.lineTo(p.x, p.y);
        }
        b.stroke();
      }
      if (w > 760) {
        const eq = proj(66.5, 0);
        b.font = '9px "Spline Sans Mono", monospace';
        b.fillStyle = 'rgba(180, 173, 156, 0.35)';
        b.fillText('0\u00B0', eq.x, eq.y - 5);
      }

      b.strokeStyle = 'rgba(210, 198, 172, 0.2)';
      b.lineWidth = 0.7;
      b.lineJoin = 'round';
      for (const line of COAST) {
        b.beginPath();
        line.forEach(([lon, lat], i) => {
          const p = proj(lon, lat);
          i === 0 ? b.moveTo(p.x, p.y) : b.lineTo(p.x, p.y);
        });
        b.stroke();
      }

      const pts = CITIES.map(px);
      b.strokeStyle = 'rgba(210, 198, 172, 0.16)';
      b.lineWidth = 0.8;
      for (const [ai, bi] of CORRIDORS) {
        const a = pts[ai];
        const c = pts[bi];
        const { cx, cy } = arcPoint(a, c, 0.5);
        b.beginPath();
        b.moveTo(a.x, a.y);
        b.quadraticCurveTo(cx, cy, c.x, c.y);
        b.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildBase();
    };

    const packets = CORRIDORS.map((_, i) => ({
      t: (i * 0.37) % 1,
      speed: 0.0009 + (i % 4) * 0.00035,
    }));

    function arcPoint(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const lift = Math.min(dist * 0.18, 46);
      const cx = mx - (dy / dist) * lift;
      const cy = my + (dx / dist) * lift;
      const u = 1 - t;
      return {
        x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
        y: u * u * a.y + 2 * u * t * cy + t * t * b.y,
        cx,
        cy,
      };
    }

    const draw = (time: number) => {
      off.x += (target.x - off.x) * 0.06;
      off.y += (target.y - off.y) * 0.06;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(off.x, off.y);

      if (base) ctx.drawImage(base, 0, 0, w, h);

      const pts = CITIES.map(px);

      if (hovered >= 0) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(176, 141, 87, 0.55)';
        for (const [ai, bi] of CORRIDORS) {
          if (ai !== hovered && bi !== hovered) continue;
          const a = pts[ai];
          const c = pts[bi];
          const { cx, cy } = arcPoint(a, c, 0.5);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.quadraticCurveTo(cx, cy, c.x, c.y);
          ctx.stroke();
        }
      }

      if (!reduced) {
        CORRIDORS.forEach(([ai, bi], i) => {
          const p = packets[i];
          p.t = (p.t + p.speed) % 1;
          const pos = arcPoint(pts[ai], pts[bi], p.t);
          const trail = arcPoint(pts[ai], pts[bi], Math.max(p.t - 0.05, 0));
          const grad = ctx.createLinearGradient(trail.x, trail.y, pos.x, pos.y);
          grad.addColorStop(0, 'rgba(176, 141, 87, 0)');
          grad.addColorStop(1, 'rgba(176, 141, 87, 0.75)');
          ctx.beginPath();
          ctx.moveTo(trail.x, trail.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(190, 155, 100, 0.95)';
          ctx.fill();
        });
      }

      CITIES.forEach((c, i) => {
        const { x, y } = pts[i];
        const isHover = i === hovered;
        const pulse = reduced ? 0 : Math.sin(time / 1400 + i * 1.7) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, (isHover ? 3.2 : 2.2) + pulse * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? 'rgba(190, 155, 100, 1)' : 'rgba(125, 156, 177, 0.95)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, (isHover ? 10 : 6.5) + pulse * 3.2, 0, Math.PI * 2);
        ctx.strokeStyle = isHover
          ? 'rgba(190, 155, 100, 0.5)'
          : `rgba(125, 156, 177, ${0.2 + pulse * 0.1})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        if ((c.label || isHover) && w > 640) {
          const left = c.lside === 'left';
          const lx = x + (left ? -11 : 11);
          ctx.textAlign = left ? 'right' : 'left';
          ctx.font = '9px "Spline Sans Mono", monospace';
          ctx.fillStyle = isHover ? 'rgba(220, 210, 188, 0.95)' : 'rgba(180, 173, 156, 0.8)';
          const latStr = `${Math.abs(c.lat).toFixed(1)}\u00B0${c.lat >= 0 ? 'N' : 'S'}`;
          ctx.fillText(c.name, lx, y + 1);
          ctx.fillStyle = isHover ? 'rgba(220, 210, 188, 0.6)' : 'rgba(180, 173, 156, 0.45)';
          ctx.fillText(latStr, lx, y + 12);
          ctx.textAlign = 'left';
        }
      });

      ctx.restore();
    };

    const loop = (time: number) => {
      draw(time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        target.x = 0;
        target.y = 0;
        if (hovered !== -1) hovered = -1;
        return;
      }
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      target.x = (mx / r.width - 0.5) * -18;
      target.y = (my / r.height - 0.5) * -12;

      let best = -1;
      let bestD = 55;
      CITIES.forEach((c, i) => {
        const p = px(c);
        const d = Math.hypot(p.x + off.x - mx, p.y + off.y - my);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      hovered = best;
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}
const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="flex flex-col">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-16 overflow-hidden bg-navy">
     {/* Interactive corridor map */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CorridorCanvas />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-0 bg-gradient-to-t from-navy to-transparent" />

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
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 800" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal layered bands */}
          <rect x="0" y="50" width="1200" height="120" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.08" />
          <rect x="0" y="200" width="1200" height="140" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.06" />
          <rect x="0" y="380" width="1200" height="100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.07" />
          <rect x="0" y="520" width="1200" height="130" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.05" />
          <rect x="0" y="680" width="1200" height="90" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.06" />
        </svg>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 mt-8">
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
